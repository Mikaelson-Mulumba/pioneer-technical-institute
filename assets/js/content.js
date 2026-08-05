// Small helper: fetch a JSON content file (edited via the /admin
// control panel) and hand back parsed data, or null on failure so
// pages can show an empty state instead of breaking.

async function fetchJSON(path) {
  try {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.error("Could not load", path, err);
    return null;
  }
}

function esc(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function emptyState(container, message) {
  container.innerHTML = `<div class="empty-state">${esc(message)}</div>`;
}
