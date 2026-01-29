const dateBtn = document.querySelector("#date");
const stickerlist = document.querySelector(".sticker-list");
const importance = document.querySelector("#importance");
const search = document.querySelector(".todo-search");
const sortFilterBtn = document.querySelector("#sort-asc-btn");

let filterValue = {
  date: null,
  status: null,
  priority: null,
  importance: null,
  keyword: "",
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

function createSticker(text) {
  const btn = document.createElement("button");
  btn.className = "filter-sticker display-flex";

  const span = document.createElement("span");
  span.textContent = text;

  btn.appendChild(span);
  stickerlist.appendChild(btn);
}

function renderSticker() {
  stickerlist.innerHTML = "";
  if (filterValue.date) {
    createSticker(filterValue.date);
  }

  if (filterValue.priority) {
    createSticker(filterValue.priority);
  }
  if (filterValue.keyword) {
    createSticker(filterValue.keyword);
  }
}
// 기간필터
function dateFilter(todos, filterValue) {
  if (!filterValue || filterValue === "all") return todos;
  const today = new Date();
  const todayStart = today.setHours(0, 0, 0, 0);

  if (filterValue === "today") {
    return todos.filter((todo) => todo.createdAt >= todayStart);
  } else if (filterValue === "sevendays") {
    const sevenDaysAgo = new Date(todayStart);
    return todos.filter((todo) => todo.createdAt >= sevenDaysAgo - 6);
  }
}

// 상태필터
function statusFilter(todos, filterValue) {
  if (!filterValue || filterValue === "all") return todos;
  if (filterValue === "todo") {
    return todos.filter((todo) => todo.status === "todo");
  } else if (filterValue === "doing") {
    return todos.filter((todo) => todo.status === "doing");
  } else if (filterValue === "done") {
    return todos.filter((todo) => todo.status === "done");
  }
}
// 우선순위필터
function periodFilter(todos, filterValue) {
  if (!filterValue || filterValue === "all") return todos;
  if (filterValue === "high") {
    return todos.filter((todo) => todo.priority === "high");
  } else if (filterValue === "mid") {
    return todos.filter((todo) => todo.priority === "mid");
  } else if (filterValue === "low") {
    return todos.filter((todo) => todo.priority === "low");
  }
}
// 정렬필터
function sortFilter(todos, filterValue) {
  if (filterValue) {
    [...todos].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    [...todos].sort((a, b) => b.title.localeCompare(a.title));
  }
  return todos;
  // 함수 내용물 받아서 넘겨주는 함수 자리
}
// 검색어필터;
function searchFilter(todos, keyword) {
  if (!keyword) return todos;
  return todos.filter(
    (todo) => todo.title.includes(keyword) || todo.content.includes(keyword),
  );
}

// 검색 인풋 클릭
search.addEventListener("input", (e) => {
  filterValue.keyword = e.target.value.trim() || null;

  saveSticker();
  renderSticker();
  applyFilter();
  render(filteredTodos);
});
// 기간 필터 클릭
dateBtn.addEventListener("change", (e) => {
  filterValue.date = e.target.value === "all" ? null : e.target.value;

  saveSticker();
  renderSticker();
  applyFilter();
  render(filteredTodos);
});
// 우선순위 필터 클릭
importance.addEventListener("change", (e) => {
  filterValue.priority = e.target.value === "all" ? null : e.target.value;

  saveSticker();
  renderSticker();
  applyFilter();
  render(filteredTodos);
});
// 정렬버튼 클릭
sortBtn.addEventListener("click", () => {
  applyFilter();
  render(filteredTodos);
});

function applyFilter() {
  let result = [...todos];
  result = dateFilter(result, filterValue.date);
  result = statusFilter(result, filterValue.status);
  result = periodFilter(result, filterValue.priority);
  result = sortFilter(result, filterValue.sort);
  result = searchFilter(result, filterValue.keyword);
  filteredTodos = result;
}
function updateView() {
  applyFilter();
  render(filteredTodos);
}
loadSticker();
