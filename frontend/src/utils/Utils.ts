export const validateInput = (input: string): boolean =>
  input.trim().length > 8;

export const validateUsername = (username: string): boolean =>
  validateInput(username) && username.length >= 8;

export const validateEmail = (email: string): boolean =>
  validateInput(email) &&
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const validatePassword = (password: string): boolean =>
  validateInput(password) && /^[\x20-\x7E]+$/.test(password);

export const validateNumericInput = (value: string) => {
  value = value.replace(/[^0-9.]/g, "");

  const parts = value.split(".");
  if (parts.length > 2) {
    value = parts[0] + "." + parts.slice(1).join("");
  }

  if (parts[1]) {
    parts[1] = parts[1].slice(0, 2);
    value = parts.join(".");
  }

  if (value === ".") value = "0.";

  return value;
};

export const formatDateTime = (date: Date) => {
  const _date = new Date(date);
  const formattedDate = _date.toLocaleDateString("en-GB");
  const formattedTime = _date.toLocaleTimeString("en-GB", { hour12: false });

  return `${formattedDate} ${formattedTime}`;
};
