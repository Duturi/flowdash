// 기간, 상태, 우선순위, 검색
// 정렬
// 기간 > 상태 > 우선순위 > 정렬 > 검색
// function 기간을 필터하는 함수 (todos, 기간필터값) {
//   if(!기간필터 값) return todos;
//   return todos.filter(todo => todo.createAt기준으로 날짜조건을 필터)
// }
// function 상태를 필터하는 함수(todos, 상태필터값) {
//   if (!상태필터 값) return todos;
//   return todos.filter(todo => todo.status === 상태필터값)
// }
// 우선순위를 필터하는 함수, 정렬하는 함수, 검색어를 필터하는 함수
// function applyFilters(todos, filters) {
//   let result = todos;

//   result = 기간을 필터하는 함수(result, filters.date);
//   result = 상태를 필터하는 함수(result, filters.status);
//   result = 우선순위를 필터하는 함수(result, filters.priority);
//   result = 정렬하는 함수(result, filters.sort);
//   result = 검색어를 필터하는 함수(result, filters.keyword);

//   retusn result;
// }

// 새로고침 또는 처음 페이지 진입

// 2, 로컬스토리지에 값이 있는지 확인
// 2-1. 값이 없다면? 빈배열로 반환
// 2-2. 값이 있다면? 각 todo.status별로 나눠서 화면에 보여주기
