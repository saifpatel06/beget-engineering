import Header from "./Header";
import Footer from "./Footer";

// Wraps every page: skip link, header, main landmark, footer.
const Layout = ({ services = [], children }) => {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header services={services} />
      <main id="main">{children}</main>
      <Footer services={services} />
    </>
  );
};

export default Layout;
