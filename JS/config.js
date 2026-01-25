// 삭제버튼 클릭시
function loadTodos() {
  const savedTodos = localStorage.getItem("flowdash-todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
}
function saveTodos(todos) {
  localStorage.setItem("flowdash-todos", JSON.stringify(todos));
}

function render() {
  const todos = loadTodos();
}

resetBtn.addEventListener("click", () => {
  // 모달 나타남(모달에 있는 hidden 없애기)
  // 모달에 있는 삭제버튼에 클릭 이벤트 넣기
  // 삭제버튼 클릭시 전체 데이터 초기화
  function deleteTodo() {
    localStorage.removeItem("flowdash-todos");
    render();
  }
});
const resetBtn = document.querySelector(".reset");
