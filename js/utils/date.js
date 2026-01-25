export const getGreetingMessage = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "좋은 아침이에요";
  if (hour >= 11 && hour < 17) return "좋은 오후에요";
  if (hour >= 17 && hour < 22) return "좋은 저녁이에요";
  return "안녕하세요";
};

export const getFormatDate = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const format = `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`;
  return format;
};
