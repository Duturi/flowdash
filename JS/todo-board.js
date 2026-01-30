// 새 할 일 추가버튼
const addBtn = document.querySelector(".add-btn");
const todoModal = document.querySelector("#todo-modal");
const plusBtn = document.querySelector("#todo-btn-plus");
const closeBtn = document.querySelector("#todo-btn-close");
const titleInput = document.querySelector("#todo-modal-title");
const descInput = document.querySelector("#todo-modal-desc");
const todoListContainer = document.querySelectorAll(".todo-list-container");

// 카테고리 카운트 증가
const countTotalToDo = document.querySelector(".category-count-to-do");
const countTotalInProgress = document.querySelector(
  ".category-count-in-progress",
);
const countTotalDone = document.querySelector(".category-count-done");
const countTotlaTasks = document.querySelector(".category-count-total-tasks");
const countAchievement = document.querySelector(".category-count-achievement");

// 개별 삭제
const deleteModal = document.querySelector("#delete-modal");
const deleteBtnClear = document.querySelector("#delete-btn-clear");
const deleteBtnClose = document.querySelector("#delete-btn-close");

// board, todo
const boards = document.querySelector(".boards");
const todoItem = document.querySelector(".todo-item");

// 할 일 수정
const changeModal = document.querySelector("#change-modal");
const changeModalTitle = document.querySelector("#change-modal-title");
const changeModalDesc = document.querySelector("#change-modal-desc");
const changeModalCancle = document.querySelector(".change-modal-cancle");
const changeModalSave = document.querySelector(".change-modal-save");

// todo status(상태)
const todoModalStatus = document.querySelector("#status-modal");

// 초기화 버튼
const resetBtn = document.querySelector("#resetBtn");
const resetModal = document.querySelector("#reset-modal");
const clearBtn = document.querySelector("#reset-btn-clear");
const closeResetBtn = document.querySelector("#reset-btn-close");

// 정렬 버튼
const sortBtn = document.querySelector("#sort-asc-btn");
const sortText = document.querySelector(".sorting-btn");

const TODO_KEY = "flowdash-todos";
let todos = [];
let filteredTodos = [];

//우선 순위 버튼
const priorityBtns = document.querySelectorAll("#todo-modal .importance-btn");
priorityBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    priorityBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    const text = btn.innerText.trim();
    if (text === "높음") selectedPriority = "high";
    else if (text === "중간") selectedPriority = "mid";
    else selectedPriority = "low";
  });
});

function render(list) {
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

  list.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.dataset.id = todo.id;
    li.dataset.status = todo.status;

    const priorityClass =
      todo.priority === "high"
        ? "importance-first"
        : todo.priority === "mid"
          ? "importance-second"
          : "importance-third";
    const priorityName =
      todo.priority === "high"
        ? "높음"
        : todo.priority === "mid"
          ? "중간"
          : "낮음";

    li.innerHTML = `
    <div class="todo-info">
    <div class="todo-item-title">
    <button class="importance-btn ${priorityClass}">${priorityName}</button>
    <button class="del-btn" data-id="${todo.id}">X</button> 
    </div>
    <h3 class="todo-title">${todo.title}</h3>
      <div class="todo-item-desc">${todo.content}</div>
      
<small style="color: #5f6f81; font-size: 0.8rem; line-height: 1.4; display: block; text-align: right;">

  <div>생성 : ${todo.createdAt}</div>

  ${
    todo.completedAt
      ? `<div>완료 : ${todo.completedAt}</div>`
      : todo.updatedAt
        ? `<div>수정 : ${todo.updatedAt}</div>`
        : ""
  }
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
      li.classList.toggle("opacitiy");
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

  // 카테고리 박스의 Total Tasks 카운트 숫자
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

  console.log(`[Render] 현재 목록(${todos.length}개):`, list);
}
function openModal() {
  todoModal.style.display = "flex";
  priorityValue = "";
  selectedPriority = "mid";
  priorityBtns.forEach((btn) => {
    if (btn.innerText.trim() === "중간") {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function closeModal() {
  todoModal.style.display = "none";
  titleInput.value = "";
  descInput.value = "";
}
// 제목 미입력시
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
    content: desc,
    status: statusValue,
    priority: selectedPriority,
    createdAt: number,
    updatedAt: null,
    completedAt: statusValue === "done" ? number : null,
    keyword: "",
  };
  todos.push(newTodo);

  saveTodos();
  applyFilter();
  render(filteredTodos);
  closeModal();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  applyFilter();
  render(filteredTodos);
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
  applyFilter();
  render(filteredTodos);
});
// 초기화 버튼
function clearAllData() {
  todos = [];
  filteredTodos = [];
  filterValue = {
    date: null,
    priority: null,
    importance: null,
    keyword: "",
    sort: "asc",
  };
  localStorage.removeItem(TODO_KEY);
  renderSticker();
  render(filteredTodos);
  closeModal();
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

// 오름차순, 내림차순 정렬
let ascending = true;
sortBtn.addEventListener("click", () => {
  ascending = !ascending;
  filterValue.sort = ascending ? "ascending" : "descending";

  todos.sort((a, b) =>
    ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title),
  );
  sortText.textContent = ascending ? "정렬 : ↑ 오름차순" : "정렬 : ↓ 내림차순";

  renderSticker();

  applyFilter();
  render(filteredTodos);
  console.log(
    ascending ? "[Render] 목록 오름차순 정렬" : "[Render] 목록 내림차순 정렬",
  );
});
