document.addEventListener("DOMContentLoaded", () => {
  const greetBox = document.querySelector(".greet-text");
  const [greetingEl, dateEl] = greetBox.querySelectorAll("span");

  // 시간대별 인사말 로직
  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return "좋은 아침이에요";
    if (hour >= 11 && hour < 17) return "좋은 오후에요";
    if (hour >= 17 && hour < 22) return "좋은 저녁이에요";
    return "안녕하세요";
  };

  // 날짜 로직
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
    let savedName = localStorage.getItem("flowdash-nickname") || "FlowDash";
    const nicknameEl = document.createElement("span");
    nicknameEl.className = "nickname-text";
    nicknameEl.textContent = `, ${savedName}님`;
    greetingEl.after(nicknameEl);

    // 인라인 수정
    nicknameEl.addEventListener("click", () => {
      const myName = localStorage.getItem("flowdash-nickname") || "FlowDash";
      const input = document.createElement("input");
      input.type = "text";
      input.value = myName;

      //스타일 설정
      input.style.fontSize = "30px";
      input.style.fontWeight = "bold";
      input.size = myName.length;
      input.style.padding = "0";
      input.addEventListener("input", () => {
        input.size = input.value.length;
      });

      const startText = document.createElement("span");
      startText.innerText = ", ";

      const endText = document.createElement("span");
      endText.innerText = "님";

      nicknameEl.textContent = "";
      nicknameEl.appendChild(startText);
      nicknameEl.appendChild(input);
      nicknameEl.appendChild(endText);

      input.focus();

      // 6. 저장 로직
      const save = () => {
        let newName = input.value.trim() || "FlowDash";
        localStorage.setItem("flowdash-nickname", newName);
        nicknameEl.textContent = `, ${newName}님`;
      };

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") save();
      });
      input.addEventListener("blur", save);
    });
  };

  setup();
});
