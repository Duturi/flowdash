const themeBtn = document.querySelector(".theme-btn");
const savedTheme = localStorage.getItem("flowdash-theme");

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
}); // 다크모드 로컬 스토리지 저장
