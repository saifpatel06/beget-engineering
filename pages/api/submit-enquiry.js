
import { Resend } from "resend";
import formidable from "formidable";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const config = {
  api: {
    bodyParser: false,
    responseLimit: "8mb",
  },
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".jpg",
  ".jpeg",
  ".png",
  ".dwg",
]);

const normalizeValue = (value) =>
  Array.isArray(value) ? value[0] || "" : value || "";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }

  try {
    // Check email service configuration.
    if (
      !process.env.RESEND_API_KEY ||
      !process.env.ENQUIRY_TO_EMAIL ||
      !process.env.ENQUIRY_FROM_EMAIL
    ) {
      throw new Error("Email service is not configured.");
    }

    // Parse multipart form data and optional attachment.
    const form = formidable({
      multiples: true,
      maxFileSize: MAX_FILE_SIZE,
      maxTotalFileSize: MAX_FILE_SIZE,
      maxFiles: 1,
      maxFields: 30,
      maxFieldsSize: 100 * 1024,
    });

    const [fields, files] = await form.parse(req);

    const data = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [
        key,
        normalizeValue(value),
      ])
    );

    // The quote form uses "details"; also support "message".
    const projectDetails = String(
      data.details || data.message || ""
    ).trim();

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();

    // Validate required fields.
    if (
      !name ||
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
      projectDetails.length < 10
    ) {
      return res.status(400).json({
        success: false,
        message: "Please check the required enquiry fields.",
      });
    }

    // Validate and read uploaded attachments.
    const uploadedFiles = Object.values(files)
      .flat()
      .filter(Boolean);

    const attachments = await Promise.all(
      uploadedFiles.map(async (file) => {
        const filename = file.originalFilename || "attachment";
        const extension = path.extname(filename).toLowerCase();

        if (!ALLOWED_EXTENSIONS.has(extension)) {
          throw new Error("Unsupported attachment type.");
        }

        if (file.size > MAX_FILE_SIZE) {
          throw new Error("Attachment exceeds the 5 MB limit.");
        }

        return {
          filename,
          content: await readFile(file.filepath),
          contentType: file.mimetype || undefined,
        };
      })
    );

    // Build a readable email body from all submitted fields.
    const emailDetails = Object.entries(data)
      .map(([key, value]) => {
        if (key === "details" || key === "message") {
          return null;
        }

        return `${key}: ${value}`;
      })
      .filter(Boolean)
      .join("\n");

    const emailBody = `New quote request received.

${emailDetails}

Project details: ${projectDetails}`;

    // Send the enquiry through Resend.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data: emailResult, error } = await resend.emails.send({
      from: process.env.ENQUIRY_FROM_EMAIL,
      to: [process.env.ENQUIRY_TO_EMAIL],
      replyTo: email,
      subject: "New Request a Quote — Beget Engineering",
      text: emailBody,
      attachments,
    });

    if (error || !emailResult?.id) {
      console.error("Resend error:", error);

      return res.status(502).json({
        success: false,
        message:
          "Unable to send your quote request. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your quote request has been sent successfully.",
    });
  } catch (error) {
    console.error("Quote submission failed:", error.message);

    // Return a client error for malformed or oversized uploads.
    if (
      error.code === 1009 ||
      error.httpCode === 413 ||
      error.code === "LIMIT_FILE_SIZE"
    ) {
      return res.status(413).json({
        success: false,
        message: "The attachment exceeds the allowed 5 MB limit.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        "Unable to send your quote request. Please try again.",
    });
  }
}
