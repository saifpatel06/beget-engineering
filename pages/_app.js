import Head from "next/head";

// Bootstrap is used for the responsive grid / utilities only.
import "bootstrap/dist/css/bootstrap.min.css";

// Self-hosted fonts (no external requests): condensed display + readable body.
import "@fontsource/barlow-condensed/latin-500.css";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/public-sans/latin-400.css";
import "@fontsource/public-sans/latin-500.css";
import "@fontsource/public-sans/latin-600.css";
import "@fontsource/public-sans/latin-700.css";

// The one global stylesheet (must come after Bootstrap so it can override).
import "../styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1b2229" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo-256.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
