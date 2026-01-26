const addBtn = document.querySelector(".add-btn");
const todoModal = document.querySelector("#todo-modal");
const plusBtn = document.querySelector("#todo-btn-plus");
const closeBtn = document.querySelector("#todo-btn-close");

const titleInput = document.querySelector("#todo-modal-title");
const descInput = document.querySelector("#todo-modal-desc");
const todoListContainer = document.querySelector(".todo-list-container");

const todoCount = document.querySelector(".board-count");
const countTotalToDo = document.querySelector(".category-count-to-do");
const countTotalInProgress = document.querySelector(
  ".category-count-in-progress",
);
const countTotalDone = document.querySelector(".category-count-done");

const TODO_KEY = "flowdash-todos";
let todos = [];

function loadTodos() {
  const savedTodos = localStorage.getItem(TODO_KEY);
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function render() {
  const todoBoard = document.querySelector(".todo-board .todo-list-container");
  const doingBoard = document.querySelector(
    ".in-progress-board .todo-list-container",
  );
  const doneBoard = document.querySelector(".done-board .todo-list-container");

  if (todoBoard) todoBoard.innerHTML = "";
  if (doingBoard) doingBoard.innerHTML = "";
  if (doneBoard) doneBoard.innerHTML = "";

  let todoCountNum = 0;
  let doingCountNum = 0;
  let doneCountNum = 0;

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
    <div class="todo-info">
    <div class="todo-item-title">
    <button class="importance-btn">높음</button>
      <h3 class="todo-title">${todo.title}</h3>
      </div>
      <div class="todo-item-desc">${todo.desc}</div>
      <small style="color: #5f6f81; font-size: 0.8rem;">
      ${todo.createdAt}</small>
      <div class="del-btn-box">
      <button class="del-btn status" onclick="deleteTodo(${index})">X</button> 
      </div>
        </div>
        `;
    if (todo.status === "todo") {
      todoBoard?.appendChild(li);
      todoCountNum++;
    } else if (todo.status === "doing") {
      doingBoard?.appendChild(li);
      doingCountNum++;
    } else if (todo.status === "done") {
      doneBoard?.appendChild(li);
      doneCountNum++;
    }
  });

  // 각 보드 별 카운트 증가
  document.querySelector(".todo-board .board-count").innerText = todoCountNum;
  document.querySelector(".in-progress-board .board-count").innerText =
    doingCountNum;
  document.querySelector(".done-board .board-count").innerText = doneCountNum;

  // 카테고리 박스의 To Do 카운트 숫자
  countTotalToDo.innerText = todoCountNum;
  // 카테고리 박스의 In Progress 카운트 숫자
  countTotalInProgress.innerText = doingCountNum;
  // 카테고리 박스의 Done 카운트 숫자
  countTotalDone.innerText = doneCountNum;

  console.log(`[Render] 현재 목록(${todos.length}개):`, todos);
}

function openModal() {
  todoModal.style.display = "flex";
}

function closeModal() {
  todoModal.style.display = "none";
  titleInput.value = "";
  descInput.value = "";
}

function addTodo() {
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (title === "") {
    alert("제목을 입력해주세요!");
    return;
  }

  const now = Date.now();
  const date = new Date();
  const statusValue = document.querySelector("#status-modal").value;
  const priorityValue = document.querySelector(".importance-btn-box").value;
  const number = date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const newTodo = {
    id: now,
    title: title,
    desc: desc,
    status: statusValue,
    priority: priorityValue,
    createdAt: number,
    updatedAt: null,
    completedAt: null,
  };
  todos.push(newTodo);

  saveTodos();
  render();
  closeModal();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  render();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

plusBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

closeBtn.addEventListener("click", closeModal);

document.addEventListener("DOMContentLoaded", () => {
  todos = loadTodos();
  render();
});

const resetBtn = document.querySelector("#resetBtn");
const resetModal = document.querySelector("#reset-modal");
const clearBtn = document.querySelector("#reset-btn-clear");
const closeResetBtn = document.querySelector("#reset-btn-close");

function clearAllData() {
  todos = [];
  localStorage.removeItem(TODO_KEY);
  render();
  resetModal.style.display = "none";
  console.log("[Clear] 전체 삭제됨");
}

resetBtn.addEventListener("click", () => {
  resetModal.style.display = "flex";
});

closeResetBtn.addEventListener("click", () => {
  resetModal.style.display = "none";
});
clearBtn.addEventListener("click", clearAllData);
render();

const sortBtn = document.querySelector("#sort-asc-btn");
const sortText = document.querySelector(".sorting-btn");

let ascending = true;
sortBtn.onclick = () => {
  ascending = !ascending;

  todos.sort((a, b) =>
    ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
  );
  sortText.textContent = ascending ? "정렬 : ↑ 오름차순" : "정렬 : ↓ 내림차순";

  render();
  console.log(
    ascending ? "[Render] 목록 오름차순 정렬" : "[Render] 목록 내림차순 정렬",
  );
};
const todoItem = document.querySelector(".todo-item");
const changeModal = document.querySelector("#change-modal");
const changeModalCancle = document.querySelector(".change-modal-cancle");
todoListContainer.addEventListener("click", () => {
  changeModal.style.display = "flex";
});
changeModalCancle.addEventListener("click", () => {
  changeModal.style.display = "none";
});
