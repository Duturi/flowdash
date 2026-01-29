// 수정모달
let currentEditTodoId = null;

const changePriorityBtns = document.querySelectorAll(
  "#change-modal .importance-btn",
);
changePriorityBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    changePriorityBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");

    const text = btn.innerText.trim();
    if (text === "높음") selectedPriority = "high";
    else if (text === "중간") selectedPriority = "mid";
    else selectedPriority = "low";
  });
});

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
    changeModalDesc.value = todo.content;
    todoModalStatus.value = todo.status;
    selectedPriority = todo.priority;

    changeModal.style.display = "flex";
  });
});

changeModalSave.addEventListener("click", (e) => {
  e.preventDefault();

  const todo = todos.find((t) => t.id === currentEditTodoId);
  if (!todo) return;

  todo.title = changeModalTitle.value.trim();
  todo.content = changeModalDesc.value.trim();
  todo.status = todoModalStatus.value;
  todo.priority = selectedPriority;
  todo.updatedAt = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  // 완료 시간
  const nowTime = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const statusValue = todoModalStatus.value;
  todos = todos.map((todo) => {
    if (todo.id === currentEditTodoId) {
      return {
        ...todo,
        title: changeModalTitle.value,
        content: changeModalDesc.value,
        status: statusValue,
        priority: selectedPriority,
        completedAt: statusValue === "done" ? nowTime : null,
        updatedAt: nowTime,
      };
    }
    return todo;
  });

  saveTodos(TODO_KEY);

  if (typeof applyFilter === "function") applyFilter();

  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  applyFilter();
  render(filteredTodos);
  closeModal();
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
  applyFilter();
  render(filteredTodos);
  closeModal();
  deleteModal.style.display = "none";
});

deleteBtnClose.addEventListener("click", () => {
  deleteModal.style.display = "none";
});
