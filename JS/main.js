document.addEventListener("DOMContentLoaded", () => {
  // 설정 및 기본값
  const STORAGE_KEY = "flowdash-nickname";
  const DEFAULT_NAME = "FlowDash";

  const greetBox = document.querySelector(".greet-text");
  const spans = greetBox.querySelectorAll("span");
  const greetingEl = spans[0];
  const dateEl = spans[1];

  // 시간대별 인사말 로직
  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "좋은 아침이에요";
    if (hour >= 11 && hour < 17) return "좋은 오후에요";
    if (hour >= 17 && hour < 22) return "좋은 저녁이에요";
    return "안녕하세요";
  };

  // 날짜 포맷 로직
  const DateText = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    dateEl.textContent = `${year}.${month}.${day}`;
  };

  const setup = () => {
    greetingEl.textContent = getGreetingMessage();
    DateText();

    let savedName = localStorage.getItem(STORAGE_KEY) || DEFAULT_NAME;
    const nicknameEl = document.createElement("span");
    nicknameEl.className = "nickname-text";
    nicknameEl.textContent = `, ${savedName}님`;
    greetingEl.after(nicknameEl);

    // 인라인 수정
    nicknameEl.addEventListener("click", () => {
      if (nicknameEl.contentEditable === "true") return;

      const pureName = nicknameEl.textContent
        .replace(", ", "")
        .replace("님", "");
      nicknameEl.textContent = pureName;

      nicknameEl.contentEditable = "true";
      nicknameEl.focus();
    });

    // 저장 로직
    const save = () => {
      if (nicknameEl.contentEditable !== "true") return;

      let newName = nicknameEl.textContent.trim();

      if (!newName) {
        newName = localStorage.getItem(STORAGE_KEY) || DEFAULT_NAME;
      }

      localStorage.setItem(STORAGE_KEY, newName);
      nicknameEl.textContent = `, ${newName}님`;
      nicknameEl.contentEditable = "false";
    };

    nicknameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        save();
      }
    });
    nicknameEl.addEventListener("Enter", save);
  };

  // 5. 실행!
  setup();
});
