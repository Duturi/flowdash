const todoInput = document.querySelector("#todo-modal-desc");
const addBtn = document.querySelector(".add-btn");
const todoListContainer = document.querySelector(".todo-list-container");
const todoCount = document.querySelector(".todo-board-count");

const TODO_KEY = "flowdash-todos";
let todos = [];

// 1. 초기 데이터 로드 (JSON.parse)
function loadTodos() {
  const savedTodos = localStorage.getItem(TODO_KEY);
  return savedTodos ? JSON.parse(savedTodos) : [];
}

// 2. 데이터 저장 (JSON.stringify)
function saveTodo(newTodos) {
  localStorage.setItem(TODO_KEY, JSON.stringify(newTodos));
}

// 3. 화면 렌더링
function render() {
  todoListContainer.innerHTML = ""; // 기존 목록 초기화

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const span = document.createElement("span");
    li.textContent = todo;

    // 삭제 버튼 추가
    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.className = "del-btn";
    delBtn.onclick = () => deleteTodo(index);

    li.appendChild(delBtn);
    todoListContainer.appendChild(li);
  });

  todoCount.innerText = todos.length;
  console.log(`[Render] 현재 목록(${todos.length}개):`, todos);
}

// 4. 할 일 추가
function addTodo() {
  const text = todoInput.value.trim();

  // if (!text) {
  //   alert("할 일을 입력해주세요!");
  //   return;
  // }

  const todos = loadTodos();
  todos.push(text);
  saveTodos(todos);

  todoInput.value = "";
  render();
  console.log(`[Add] "${text}" 추가됨`);
}

function deleteTodo(index) {
  todos.splice(index, 1);

  saveTodo(todos);

  render();
}

addBtn.addEventListener("click", addTodo);

document.addEventListener("DOMContentLoaded", () => {
  todos = loadTodos();
  render();
});

const todoModal = document.querySelector("#todo-modal");
const plusBtn = document.querySelector("#todo-btn-plus");
const clsosBtn = document.querySelector("#todo-btn-close");

const titleInput = document.querySelector("#todo-modal-title");
const descInput = document.querySelector("#todo-modal-desc");

document.addEventListener("click", (e) => {
  if (e.target.closest(".add-btn")) {
    todoModal.style.display = "flex";
  }

  if (e.target.closest("#todo-btn-close")) {
    todoModal.style.display = "none";
  }
});

// const resetBtn = document.querySelector(".reset");

// function resetBtn() {
//   if (confirm("정말 모든 할 일을 삭제하시겠습니까?")) {
//     localStorage.removeItem(TODO_KEY);
//     render();
//     console.log("[Clear] 전체 삭제됨");
//   }
// }
// clearBtn.addEventListener("click", resetBtn);
