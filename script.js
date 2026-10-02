// ---------- Mobile menu ----------
const links = document.getElementById("links");
document.getElementById("menu-btn").addEventListener("click", () => links.classList.toggle("open"));
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));

// ---------- Dark / light theme (remembers your choice) ----------
const themeBtn = document.getElementById("theme-btn");
function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeBtn.textContent = dark ? "☀️" : "🌙";
  try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
themeBtn.addEventListener("click", () => setTheme(!document.body.classList.contains("dark")));

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Scroll progress + back-to-top ----------
const progress = document.getElementById("progress");
const topBtn = document.getElementById("top-btn");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
  topBtn.classList.toggle("show", window.scrollY > 500);
});
topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ---------- Typing effect (edit the words below) ----------
const roles = ["student leader", "creative thinker", "problem solver", "future innovator"];
const typed = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 45 : 95);
}
type();

// ---------- Reveal on scroll (+ skill bars) ----------
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("show"); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

// ---------- Count-up numbers ----------
const countObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count;
    let n = 0;
    const t = setInterval(() => {
      n += Math.max(1, Math.round(end / 40));
      if (n >= end) { n = end; clearInterval(t); }
      el.textContent = n;
    }, 30);
    countObs.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => countObs.observe(el));
