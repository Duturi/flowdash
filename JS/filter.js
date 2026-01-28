// 기간필터
function dateFilter(todos, filterValue) {
  if (!filterValue || filterValue === "all") return todos;
  const today = new Date();
  const todayStart = today.setHours(0, 0, 0, 0);

  if (filterValue === "today") {
    return todos.filter((todo) => todo.createdAt >= todayStart.getTime());
  } else if (filterValue === "sevendays") {
    const sevenDaysAgo = new Date(todayStart);
    return todos.filter((todo) => todo.createdAt >= sevenDaysAgo.getTime() - 6);
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
    // todos.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // todos.sort((a, b) => b.title.localeCompare(a.title));
  }
  return todos;
  // 함수 내용물 받아서 넘겨주는 함수 자리
}
// 검색어필터
function searchFilter(todos, keyword) {
  if (!keyword) return todos;
  return todos.filter(
    (todo) => todo.title.includes(keyword) || todo.content.includes(keyword),
  );
}

// 검색 인풋 클릭
search.addEventListener("click", () => {
  applyFilter();
});
// 기간 필터 클릭
dataBtn.addEventListener("click", () => {
  applyFilter();
});
// 우선순위 필터 클릭
importance.addEventListener("click", () => {
  applyFilter();
});
// 정렬버튼 클릭
sortBtn.addEventListener("click", () => {
  applyFilter();
});

function applyFilter(todos, filters) {
  let result = todos;
  result = dateFilter(result, filterValue);
  result = statusFilter(result, filterValue);
  result = periodFilter(result, filterValue);
  result = sortFilter(result, filterValue);
  result = searchFilter(result, keyword);
  return result;
}
