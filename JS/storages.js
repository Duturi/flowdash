const themeBtn = document.querySelector(".theme-btn");
const savedTheme = localStorage.getItem("flowdash-theme");

function loadTodos() {
  const savedTodos = localStorage.getItem(TODO_KEY);
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
} // todo 스토리지 저장
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "✨";
} else {
  document.body.classList.remove("dark");
  themeBtn.textContent = "💤";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const darkBody = document.body.classList.contains("dark");
  localStorage.setItem("flowdash-theme", darkBody ? "dark" : "light");

  themeBtn.textContent = darkBody ? "✨" : "💤";
}); // 다크모드 로컬 스토리지 저장.

function saveSticker() {
  localStorage.setItem("flowdash-sticker", JSON.stringify(filterValue));
}
function loadSticker() {
  const saved = localStorage.getItem("flowdash-sticker");
  if (!saved) return;

  filterValue = JSON.parse(saved);
  renderSticker();
} // 스티커 로컬 스토리지
