import { useRef, useState } from "react";
import Icon from "./Icons";
import { submitEnquiry } from "../lib/api";
import site from "../../data/site";
import styles from "./EnquiryForm.module.css";

// Reusable, accessible form driven by a `fields` config, so the Contact page and
// the Quote page share one implementation.
//
// field: { name, label, type: text|email|tel|select|textarea|file, required?, options?,
//          placeholder?, autoComplete?, hint?, half?, rows? }
// onSubmit(formData) defaults to submitEnquiry() from src/lib/api.js: connect the API there.

const MAX_FILE_MB = 5;
const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png", "dwg"];

const validateField = (field, value) => {
  const label = field.label.toLowerCase();
  const isEmpty = value === undefined || value === null || String(value).trim() === "";

  if (field.type === "file") {
    if (!value) return "";
    const extension = value.name.split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      return `Attach a ${ALLOWED_EXTENSIONS.join(", ").toUpperCase()} file.`;
    }
    if (value.size > MAX_FILE_MB * 1024 * 1024) {
      return `File is larger than ${MAX_FILE_MB} MB. Attach a smaller file.`;
    }
    return "";
  }

  if (field.required && isEmpty) {
    return field.type === "select" ? `Select a ${label}.` : `Enter your ${label}.`;
  }
  if (isEmpty) return "";

  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
    return "Enter a valid email address, like name@company.com.";
  }
  if (field.type === "tel") {
    const digits = value.replace(/\D/g, "");
    if (!/^[+\d\s()-]+$/.test(value) || digits.length < 7 || digits.length > 15) {
      return "Enter a valid phone number, using 7 to 15 digits.";
    }
  }
  if (field.name === "message" || field.name === "details") {
    if (value.trim().length < 10) return "Add a little more detail (at least 10 characters).";
  }
  return "";
};

const EnquiryForm = ({
  fields,
  initialValues = {},
  submitLabel,
  successTitle = "Thank you. We have your enquiry.",
  successText = "A member of the Beget Engineering team will get back to you shortly.",
  onSubmit = submitEnquiry,
  submissionMethod = "email",
}) => {
  const formRef = useRef(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [fileKey, setFileKey] = useState(0);

  const setValue = (name, value) => setValues((current) => ({ ...current, [name]: value }));

  const validateAll = () => {
    const next = {};
    fields.forEach((field) => {
      const message = validateField(field, values[field.name]);
      if (message) next[field.name] = message;
    });
    return next;
  };

  const handleBlur = (field) => {
    const message = validateField(field, values[field.name]);
    setErrors((current) => ({ ...current, [field.name]: message }));
  };

  const handleChange = (field, event) => {
    const value = field.type === "file" ? event.target.files[0] || null : event.target.value;
    setValue(field.name, value);
    if (errors[field.name]) {
      setErrors((current) => ({ ...current, [field.name]: validateField(field, value) }));
    }
  };

  
  const sendEnquiryToWhatsApp = () => {
    const clientWhatsApp = "919422004651";

    const message = [
      "New Website Enquiry - Beget Engineering",
      "",
      ...fields
        .filter((field) => field.type !== "file")
        .map((field) => {
          const rawValue = values[field.name];
          let displayValue = rawValue || "Not provided";

          if (field.type === "select" && rawValue) {
            const option = field.options?.find(
              (item) => item.value === rawValue
            );
            displayValue = option?.label || rawValue;
          }

          return `${field.label}: ${displayValue}`;
        }),
    ].join("\n");

    const url = `https://wa.me/${clientWhatsApp}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = validateAll();
    setErrors(found);

    const firstInvalid = fields.find((field) => found[field.name]);

    if (firstInvalid) {
      setStatus("idle");
      formRef.current
        ?.querySelector(`[name="${firstInvalid.name}"]`)
        ?.focus();
      return;
    }

    // Contact page: open WhatsApp, without pretending the message was sent.
    if (submissionMethod === "whatsapp") {
      sendEnquiryToWhatsApp();
      return;
    }

    // Quote page: submit details and attachments by email.
    setStatus("submitting");

    try {
      const formData = new FormData();

      fields.forEach((field) => {
        const value = values[field.name];

        if (value !== undefined && value !== null && value !== "") {
          formData.append(field.name, value);
        }
      });

      await onSubmit(formData);
      setStatus("success");
    } catch (error) {
      console.error("Enquiry submission failed:", error);
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
    setFileKey((key) => key + 1);
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <Icon name="check" size={40} />
        <h3>{successTitle}</h3>
        <p>{successText}</p>
        <button type="button" className="bt bt-outline-dark" onClick={reset}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      {errorCount > 0 && (
        <p className={styles.summary} role="alert">
          {errorCount === 1 ? "Fix 1 field to continue." : `Fix ${errorCount} fields to continue.`}
        </p>
      )}
      {status === "error" && (
        <p className={styles.summary} role="alert">
          We could not send your enquiry. Try again, or call us on {site.contact.phone}.
        </p>
      )}

      <div className="row g-3">
        {fields.map((field) => {
          const id = `field-${field.name}`;
          const error = errors[field.name];
          const describedBy = [field.hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
            .filter(Boolean)
            .join(" ");
          const common = {
            id,
            name: field.name,
            "aria-invalid": error ? "true" : undefined,
            "aria-describedby": describedBy || undefined,
            "aria-required": field.required ? "true" : undefined,
            className: `${styles.control} ${error ? styles.invalid : ""}`,
            onBlur: () => handleBlur(field),
          };

          return (
            <div key={field.name} className={field.half ? "col-12 col-md-6" : "col-12"}>
              <label htmlFor={id} className={styles.label}>
                {field.label}
                {field.required ? (
                  <span className={styles.required}> (required)</span>
                ) : (
                  <span className={styles.optional}> (optional)</span>
                )}
              </label>

              {field.type === "select" ? (
                <select {...common} value={values[field.name] || ""} onChange={(e) => handleChange(field, e)}>
                  <option value="">Select a service</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  {...common}
                  rows={field.rows || 5}
                  placeholder={field.placeholder}
                  value={values[field.name] || ""}
                  onChange={(e) => handleChange(field, e)}
                />
              ) : field.type === "file" ? (
                <input
                  key={fileKey}
                  {...common}
                  type="file"
                  accept={ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(",")}
                  onChange={(e) => handleChange(field, e)}
                />
              ) : (
                <input
                  {...common}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  value={values[field.name] || ""}
                  onChange={(e) => handleChange(field, e)}
                />
              )}

              {field.hint && (
                <p id={`${id}-hint`} className={styles.hint}>
                  {field.hint}
                </p>
              )}
              {error && (
                <p id={`${id}-error`} className={styles.error}>
                  <Icon name="close" size={16} />
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <button
        type="submit"
        className={`bt bt-primary ${styles.submit}`}
        disabled={status === "submitting"}
      >
        {status === "submitting"
          ? "Sending…"
          : submitLabel ||
            (submissionMethod === "whatsapp"
              ? "Send enquiry on WhatsApp"
              : "Request a quote")}
      </button>
    </form>
  );
};

export default EnquiryForm;
