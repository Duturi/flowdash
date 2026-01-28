// 기간필터
function createdAtFilter(todos, todosCreateAt) {
  const start = todos.creatdeAt;
  const store = localStorage.getItem(TODO_KEY);
  if (!todos.creatdeAt.value === todayValue && sevenDayValue) return allValue;
  const allValue = store.filter((a) => a.creatdeAt === "all");
  const todayValue = store.filter((t) => t.creatdeAt === "today");
  const sevenDayValue = store.filter((s) => s.creatdeAt === "7");
}
// 상태필터
function statusFilter(todos, todosStatus) {
  const store = localStorage.getItem(TODO_KEY);
  if (!todos.status.value === doingValue && doneValue) return todoValue;
  const todoValue = store.filter((todo) => todo.period === "todo");
  const doingValue = store.filter((doing) => doing.period === "doing");
  const doneValue = store.filter((done) => done.period === "done");
}
// 우선순위필터
function periodFilter(todos, todosPeriod) {
  const store = localStorage.getItem(TODO_KEY);
  if (!todos.period.value === midValue && lowValue) return highValue;
  const highValue = store.filter((high) => high.period === "high");
  const midValue = store.filter((mid) => mid.period === "mid");
  const lowValue = store.filter((low) => low.period === "low");
}
// 정렬필터
function sortFilter(todos, todosSort) {
  const store = localStorage.getItem(TODO_KEY);
  if (!todos.title((a, b) => a - b)) {
    // 오름차순 render()
  } else return;
  // 내림차순 render()
}
// 검색어필터
function searchFilter(todos, todosSearch) {
  const store = localStorage.getItem(TODO_KEY);
  const findTitle = todos.includes(title);
  if (!findTitle === searchValue) return;
  const searchValue = store.filter((search) => search.title);
}

// 검색 인풋 클릭
search.addEventListener("click", () => {
  applyFilter();
});
// 기간 필터 클릭
date.addEventListener("click", () => {
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

// function applyFilter(todos,filters) {
//   let result = todos;
//   // 기간을 필터하는 함수
//   result = createdAtFilter(result,filters.date) {

//   }
//   // 상태를 필터하는 함수
//   result = statusFilter(result,filters.status) {

//   }
//   // 우선순위를 필터하는 함수
//   result = periodFilter(result,filters.priority) {

//   }
//   // 정렬하는 함수
//   result = sortFilter(result,filters.sort) {

//   }
//   // 검색어를 필터하는 함수
//   result = searchFilter(result,filters.keyword) {

//   }
//   return result;
// }

const newFilterTodo = applyFilter();
