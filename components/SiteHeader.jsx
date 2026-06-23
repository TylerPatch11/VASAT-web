"use client";

import { useState } from "react";

const navItems = [
  ["Platform", "#platform"],
  ["Capabilities", "#capabilities"],
  ["Solutions", "#solutions"],
  ["Industries", "#industries"],
  ["Resources", "#resources"],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <img className="brand-logo" src="https://vasat.io/images/home/logo-vasat.png" alt="VASAT" />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`primary-nav ${open ? "open" : ""}`} aria-label="Primary">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href="https://vasat.io/docs/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Developers
          </a>
          <a className="button button-primary" href="#demo" onClick={() => setOpen(false)}>
            Book a demo
          </a>
        </nav>
      </div>
    </header>
  );
}
