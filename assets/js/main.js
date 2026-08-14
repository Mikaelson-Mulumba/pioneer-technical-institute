// Shared header + footer, injected on every page so there's one
// source of truth for nav/contact links (edit here, not per-page).

const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { label: "About", children: [
      { href: "about.html", label: "About Us" },
      { href: "our-story.html", label: "Our Story" },
      { href: "staff.html", label: "Staff" },
      { href: "governance.html", label: "Governance" },
      { href: "collaboration-and-partnership.html", label: "Collaboration & Partnership" },
    ] },
  { label: "Admissions", children: [
      { href: "junior-certificate.html", label: "Junior Certificate Courses" },
      { href: "national-certificate.html", label: "National Certificate Courses" },
      { href: "short-courses.html", label: "Short Courses" },
      { href: "courses.html", label: "All Courses" },
      { href: "admissions.html", label: "How To Apply" },
    ] },
  { label: "Academic", children: [
      { href: "how-you-will-learn.html", label: "How You Will Learn" },
    ] },
  { label: "Students", children: [
      { href: "students.html", label: "Students" },
      { href: "students-charter.html", label: "Student's Charter" },
      { href: "life-at-pti.html", label: "Life at PTI" },
    ] },
  { label: "Get To Work", children: [
      { href: "about-wil.html", label: "About Work-Integrated Learning" },
      { href: "how-wil-works.html", label: "How WIL Works" },
      { href: "key-steps-in-wil.html", label: "Key Steps in WIL" },
      { href: "get-to-work.html", label: "Get to Work" },
      { href: "your-call.html", label: "Your Call" },
    ] },
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

  function linkHTML(l) {
    return `<a href="${l.href}" class="${l.href === cur ? "active" : ""}">${l.label}</a>`;
  }

  const links = NAV_LINKS.map((l) => {
    if (!l.children) return linkHTML(l);
    const isActiveGroup = l.children.some((c) => c.href === cur);
    return `
      <div class="nav-item has-dropdown ${isActiveGroup ? "active" : ""}">
        <button type="button" class="nav-dropdown-toggle">${l.label} <span class="caret">▾</span></button>
        <div class="nav-dropdown-menu">
          ${l.children.map(linkHTML).join("")}
        </div>
      </div>`;
  }).join("");

  document.getElementById("site-header").innerHTML = `
    <div class="nav-row">
      <a href="index.html" class="brand">
        <span class="brand-mark">PTI</span>
        <span class="brand-text">Pioneer Technical Institute<span>Craft for Self Reliance</span></span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">☰ Menu</button>
      <nav class="main-nav" id="mainNav">${links}
        <a href="apply.html" class="btn btn-primary" style="margin:14px 24px; border-color: var(--amber); background: var(--amber); color: var(--charcoal);">Apply Now</a>
      </nav>
    </div>`;

  // Dropdown toggle: click to open/close (works for touch and desktop alike)
  document.querySelectorAll(".nav-dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = btn.closest(".nav-item");
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".nav-item.open").forEach((i) => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
  document.addEventListener("click", () => {
    document.querySelectorAll(".nav-item.open").forEach((i) => i.classList.remove("open"));
  });

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
