// Use marked.js to parse Markdown and DOMPurify to sanitize the output.
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("file-input");
const viewer = document.getElementById("viewer");

dropzone.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", async (e) => {
  const f = e.target.files && e.target.files[0];
  if (f) {
    const txt = await f.text();
    renderWithMarked(txt);
  }
});

// Drag & drop
["dragenter", "dragover"].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "#58a6ff";
  })
);
["dragleave", "drop"].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "";
  })
);
dropzone.addEventListener("drop", async (e) => {
  const f = e.dataTransfer.files && e.dataTransfer.files[0];
  if (f) {
    const txt = await f.text();
    renderWithMarked(txt);
  }
});

// Try loading file from ?file=relative/path
(async function tryLoadQueryFile() {
  try {
    const params = new URLSearchParams(location.search);
    const file = params.get("file");
    if (file) {
      const res = await fetch(file);
      if (!res.ok) throw new Error("Fetch failed");
      const txt = await res.text();
      renderWithMarked(txt, file);
    }
  } catch (err) {
    viewer.innerHTML = `<p class="hint">Could not load file from query parameter: ${
      err.message || err
    }</p>`;
  }
})();

function renderWithMarked(md) {
  // Configure marked (simple, compatible defaults)
  marked.setOptions({
    gfm: true,
    breaks: false,
    sanitize: false, // we'll sanitize with DOMPurify
  });

  const raw = marked.parse(md || "");
  const clean = DOMPurify.sanitize(raw);
  viewer.innerHTML = clean || '<p class="hint">(empty)</p>';

  // If highlight.js is present, highlight code blocks
  if (window.hljs) {
    viewer.querySelectorAll("pre code").forEach((block) => {
      window.hljs.highlightElement(block);
    });
  }
}
