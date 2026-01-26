let filterState = {
  period: null,
  importance: null,
  sort: "asc",
};
function saveSticker() {
  localStorage.setItem("flowdash-sticker", JSON.stringify(filterState));
}
function loadSticker() {
  const saved = localStorage.getItem("flowdash-sticker");
  if (!saved) return;

  filterState = JSON.parse(saved);
  renderSticker();
  updateSortUi();
}

function renderSticker() {
  stickerlist.innerHTML = "";
  if (filterState.period) {
    createSticker(filterState.period);
  }

  if (filterState.importance) {
    createSticker(filterState.importance);
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

period.addEventListener("change", () => {
  filterState.period = period.value === "전체" ? null : period.value;

  saveSticker();
  renderSticker();
});

importance.addEventListener("change", () => {
  filterState.importance =
    importance.value === "전체 : 우선순" ? null : importance.value;

  saveSticker();
  renderSticker();
});

function updateSortUi() {
  const text = sortBtn.querySelector(".sort-text");
  text.textContent =
    filterState.sort === "asc" ? "정렬 : ↑ 오름차순" : "정렬 : ↓ 내림차순";
}
loadSticker();
