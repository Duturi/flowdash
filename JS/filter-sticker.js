const dataBtn = document.querySelector("#data");
const stickerlist = document.querySelector(".sticker-list");
const importance = document.querySelector("#importance");
const search = document.querySelector(".todo-search");
let filterValue = {
  date: null,
  importance: null,
  search: null,
  sort: "asc",
};
function saveSticker() {
  localStorage.setItem("flowdash-sticker", JSON.stringify(filterValue));
}
function loadSticker() {
  const saved = localStorage.getItem("flowdash-sticker");
  if (!saved) return;

  filterValue = JSON.parse(saved);
  renderSticker();
  // updateSortUi();
}

function renderSticker() {
  stickerlist.innerHTML = "";
  if (filterValue.date) {
    createSticker(filterValue.date);
  }

  if (filterValue.importance) {
    createSticker(filterValue.importance);
  }
  if (filterValue.search) {
    createSticker(filterValue.search);
  }
}

function createSticker(text) {
  const btn = document.createElement("button");
  btn.className = "filter-sticker display-flex";

  const span = document.createElement("span");
  span.textContent = text;

  btn.appendChild(span);
  stickerlist.appendChild(btn);
}

dataBtn.addEventListener("change", () => {
  filterValue.date = date.value === "전체" ? null : date.value;

  saveSticker();
  renderSticker();
});

importance.addEventListener("change", () => {
  filterValue.importance =
    importance.value === "전체 : 우선순" ? null : importance.value;

  saveSticker();
  renderSticker();
});

search.addEventListener("input", (e) => {
  filterValue.search = e.target.value.trim() || null;

  saveSticker();
  renderSticker();
});
sortBtn.addEventListener("click", () => {
  filterValue.sort === "asc" ? "정렬 : ↑ 오름차순" : "정렬 : ↓ 내림차순";
});

// function updateSortUi() {
//   const sortBtn = document.querySelector("#sort-asc-btn");
//   const text = sortBtn.querySelector(".sort-text");
//   text.textContent =
//     filterState.sort === "asc" ? "정렬 : ↑ 오름차순" : "정렬 : ↓ 내림차순";
// }
loadSticker();
