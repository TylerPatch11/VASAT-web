import "./globals.css";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "VASAT — Application Platform",
  description:
    "A modular application platform for secure, data-driven government and enterprise solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
