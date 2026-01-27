const addBtn = document.querySelector(".add-btn");
const todoModal = document.querySelector("#todo-modal");
const plusBtn = document.querySelector("#todo-btn-plus");
const closeBtn = document.querySelector("#todo-btn-close");

const titleInput = document.querySelector("#todo-modal-title");
const descInput = document.querySelector("#todo-modal-desc");
const todoListContainer = document.querySelectorAll(".todo-list-container");
const countTotalToDo = document.querySelector(".category-count-to-do");
const countTotalInProgress = document.querySelector(
  ".category-count-in-progress",
);
const countTotalDone = document.querySelector(".category-count-done");
const countTotlaTasks = document.querySelector(".category-count-total-tasks");
const countAchievement = document.querySelector(".category-count-achievement");
const deleteModal = document.querySelector("#delete-modal");
const deleteBtnClear = document.querySelector("#delete-btn-clear");
const deleteBtnClose = document.querySelector("#delete-btn-close");

const TODO_KEY = "flowdash-todos";
let todos = [];
let selectedPriority = "";

function loadTodos() {
  const savedTodos = localStorage.getItem(TODO_KEY);
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}
//우선 순위 버튼
const priorityBtns = document.querySelectorAll("#todo-modal .importance-btn");
priorityBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    priorityBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedPriority = btn.innerText.trim();
  });
});

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
  let totalTasksCountNum = 0;

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;
    li.dataset.status = todo.status;

    const priorityClass =
      todo.priority === "높음"
        ? "importance-first"
        : todo.priority === "중간"
          ? "importance-second"
          : "importance-third";

    li.innerHTML = `
    <div class="todo-info">
    <div class="todo-item-title">
    <button class="importance-btn ${priorityClass}">${todo.priority}</button>
    <button class="del-btn" data-id="${todo.id}">X</button> 
    </div>
    <h3 class="todo-title">${todo.title}</h3>
      <div class="todo-item-desc">${todo.desc}</div>
      <small style="color: #5f6f81; font-size: 0.8rem;">
      ${todo.updatedAt ? `${todo.updatedAt}` : todo.createdAt}
      </small>

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
  document.querySelector(".total-tasks .category-count").innerText =
    totalTasksCountNum;

  // 카테고리 박스의 To Do 카운트 숫자
  countTotalToDo.innerText = todoCountNum;
  // 카테고리 박스의 In Progress 카운트 숫자
  countTotalInProgress.innerText = doingCountNum;
  // 카테고리 박스의 Done 카운트 숫자
  countTotalDone.innerText = doneCountNum;

  // 카테고르 박스의 Total Tasks 카운트 숫자
  countTotlaTasks.innerText = todos.length;

  // 카테고리 박스의 achievement 카운트 숫자
  const countTotalTasks = todoCountNum + doingCountNum + doneCountNum;

  function achievementValue() {
    let percent = 0;

    if (countTotalTasks > 0) {
      percent = (doneCountNum / countTotalTasks) * 100;
    }
    countAchievement.textContent = Math.floor(percent) + "%";
  }

  achievementValue();

  console.log(`[Render] 현재 목록(${todos.length}개):`, todos);
}

function openModal() {
  todoModal.style.display = "flex";
  priorityValue = "";
  priorityBtns.forEach((btn) => btn.classList.remove("active"));
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
  // todo 객체
  const now = Date.now();
  const date = new Date();
  const statusValue = document.querySelector("#todo-status-modal").value;
  const priorityValue = document.querySelector(".importance-btn").value;
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
    priority: selectedPriority,
    createdAt: number,
    updatedAt: number,
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
// 초기화 버튼
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

// 오름차순, 내림차순 정렬
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

// 수정 모달
const boards = document.querySelector(".boards");
const todoItem = document.querySelector(".todo-item");
const changeModal = document.querySelector("#change-modal");
const changeModalTitle = document.querySelector("#change-modal-title");
const changeModalDesc = document.querySelector("#change-modal-desc");
const todoModalStatus = document.querySelector("#status-modal");
const changeModalCancle = document.querySelector(".change-modal-cancle");
const changeModalSave = document.querySelector(".change-modal-save");

let currentEditTodoId = null;
// let selectedPriority = null;

todoListContainer.forEach((todoList) => {
  todoList.addEventListener("click", (e) => {
    const item = e.target.closest(".todo-item");
    if (!item) return;

    if (e.target.classList.contains("del-btn")) return;

    const todoId = Number(item.dataset.id);
    currentEditTodoId = todoId;

    const todo = todos.find((t) => t.id === todoId);
    if (!todo) return;

    changeModalTitle.value = todo.title;
    changeModalDesc.value = todo.desc;
    todoModalStatus.value = todo.status;

    changeModal.style.display = "flex";
  });
});

changeModalSave.addEventListener("click", (e) => {
  e.preventDefault();

  const todo = todos.find((t) => t.id === currentEditTodoId);
  if (!todo) return;

  todo.title = changeModalTitle.value.trim();
  todo.desc = changeModalDesc.value.trim();
  todo.status = todoModalStatus.value;
  todo.updatedAt = new Date().toLocaleString("ko-KR");

  localStorage.setItem(TODO_KEY, JSON.stringify(todos));

  render();
  changeModal.style.display = "none";
  currentEditTodoId = null;
});
changeModalCancle.addEventListener("click", () => {
  changeModal.style.display = "none";
  currentEditTodoId = null;
});

// 삭제 모달
let deleteTodoId = null;

document.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".del-btn");
  if (!deleteBtn) return;
  const todoId = Number(e.target.dataset.id);
  deleteTodoId = todoId;
  deleteModal.style.display = "flex";
});

deleteBtnClear.addEventListener("click", () => {
  todos = todos.filter((t) => t.id !== deleteTodoId);
  saveTodos(TODO_KEY);
  render();
  deleteModal.style.display = "none";
});

deleteBtnClose.addEventListener("click", () => {
  deleteModal.style.display = "none";
});
