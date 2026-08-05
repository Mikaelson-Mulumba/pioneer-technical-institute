// Shared header + footer, injected on every page so there's one
// source of truth for nav/contact links (edit here, not per-page).

const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "about.html", label: "Our Story" },
  { href: "courses.html", label: "Courses" },
  { href: "admissions.html", label: "Admissions" },
  { href: "staff.html", label: "Staff" },
  { href: "news.html", label: "News" },
  { href: "gallery.html", label: "Gallery" },
  { href: "contact.html", label: "Contact" },
];

function currentPage() {
  const p = location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
}

function renderHeader() {
  const cur = currentPage();
  const links = NAV_LINKS.map(
    (l) =>
      `<a href="${l.href}" class="${l.href === cur ? "active" : ""}">${l.label}</a>`
  ).join("");

  document.getElementById("site-header").innerHTML = `
    <div class="nav-row">
      <a href="index.html" class="brand">
        <span class="brand-mark">PTI</span>
        <span class="brand-text">Pioneer Technical Institute<span>Craft for Self Reliance</span></span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">☰ Menu</button>
      <nav class="main-nav" id="mainNav">${links}
        <a href="admissions.html#apply" class="btn btn-primary" style="margin:14px 24px; border-color: var(--amber); background: var(--amber); color: var(--charcoal);">Apply Now</a>
      </nav>
    </div>`;

  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function renderFooter() {
  document.getElementById("site-footer").innerHTML = `
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <h4>Pioneer Technical Institute</h4>
          <p>A private vocational training center registered by the Ministry of Education and Sports, equipping youth with hands-on skills for self reliance.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <a href="about.html">Our Story</a>
          <a href="courses.html">Courses</a>
          <a href="admissions.html">Admissions</a>
          <a href="staff.html">Staff</a>
        </div>
        <div>
          <h4>More</h4>
          <a href="news.html">News</a>
          <a href="gallery.html">Gallery</a>
          <a href="contact.html">Contact</a>
          <a href="/admin/">Staff Login</a>
        </div>
        <div id="footer-contact">
          <h4>Contact</h4>
          <p class="loading-note">Loading…</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span id="year"></span> Pioneer Technical Institute, Iganga</span>
        <span>PSS/P/34 &middot; UBTEB UBT125 / UBB093 &middot; DIT MAC127</span>
      </div>
    </div>`;
  document.getElementById("year").textContent = new Date().getFullYear();

  fetchJSON("content/site.json").then((site) => {
    if (!site) return;
    const el = document.getElementById("footer-contact");
    el.innerHTML = `
      <h4>Contact</h4>
      <p>${site.address || ""}</p>
      <p>${site.phone || ""}</p>
      <p>${site.email || ""}</p>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
