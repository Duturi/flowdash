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
// 스티커 로컬 스토리지
function saveSticker() {
  localStorage.setItem("flowdash-sticker", JSON.stringify(filterValue));
}
function loadSticker() {
  const saved = localStorage.getItem("flowdash-sticker");
  if (!saved) return;

  filterValue = JSON.parse(saved);
  renderSticker();
}
// 필터 스티커 생성
function createSticker(text) {
  const btn = document.createElement("button");
  btn.className = "filter-sticker display-flex";

  const span = document.createElement("span");
  span.textContent = text;

  btn.appendChild(span);
  stickerlist.appendChild(btn);
}
// 필터 스터커 렌더
function renderSticker() {
  stickerlist.innerHTML = "";
  if (filterValue.date) {
    createSticker(stickerDateText(filterValue.date));
  }

  if (filterValue.priority) {
    createSticker(stickerPriorityText(filterValue.priority));
  }
  if (filterValue.keyword) {
    createSticker(filterValue.keyword);
  }
}
// 스티커 한글로 나오게
function stickerDateText(value) {
  if (value === "today") return "오늘";
  else if (value === "sevendays") return "7일 전";
  else return "전체";
}
function stickerPriorityText(value) {
  if (value === "high") return "높음";
  else if (value === "mid") return "중간";
  else if (value === "low") return "낮음";
  else return "전체 : 우선순위";
}
// 기간필터
function dateFilter(todos, filterValue) {
  if (!filterValue || filterValue === "all") return todos;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStart = today.getTime();

  return todos.filter((todo) => {
    const todoDate = new Date(todo.createdAt).getTime();

    if (filterValue === "today") {
      return todoDate >= todayStart;
    } else if (filterValue === "sevendays") {
      const sevenDaysAgo = todayStart - 7 * 24 * 60 * 60 * 1000;
      return todoDate >= sevenDaysAgo;
    }
    return true;
  });
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
loadSticker();
