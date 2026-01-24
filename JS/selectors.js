const searchInput = document.querySelector(".todo-search");
const periodSelect = document.querySelector(".period");
const importanceSelect = document.querySelector(".importance");
const sortSelect = document.querySelector(".sorting");

function searchFilter() {
  if (todo-search의 value가 할 일 제목,내용과 맞다면) {
    board에 보여줘라
  } else {
    아니라면 숨겨라
  }
} 기간 필터가 적용되면 그 안에서만 값을 찾아야 한다..

function searchFilter() {
  if(searchInput.textContent = ) {
  } else {
  }
}

function periodFilter() {
  if (todo의 시간이 오늘 기준 오늘이면) {
    같은 시간인 todo를 보여줘라
  } esle if (시간이 7일전이면 ) {
    7일전인 목록을 보여줘라
  } else {
    전체 다 보여줘라
  }
}

function importanceFilter() {
  if(importanceSelect가 값이 1순위면 ) {
    다른 것은 숨기고
    목록에 1순위인 할일을 보여줘라
  } else if (2순위면) {
    다른것은 숨기고
    목록에 2순위인 할일을 보여줘라
  } else if (3순위면) {
    다른것은 숨기고
    목록에 3순위 할일을 보여줘라
  } else {
    전부 보여줘라
  }
}

function sortFilter() {
  if (sortSelect의 값이 오름차순이면) {
    목록들의 제목을 봐서 ㄱ ㄴ ㄷ 순으로 정렬
  } if(내림차순이면) {
    ㄷ ㄴ ㄱ 순으로 정렬
  } else {
    추가한 순으로 정렬
  }
}