import { Html, Head, Main, NextScript } from "next/document";

// Runs once per page load (server-rendered shell). next/head in _app/pages
// still controls per-page <title> and meta tags; this only sets document-level
// attributes that Next requires here, such as the page language for SEO and
// accessibility (screen readers, translation tools, search engines).
const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
