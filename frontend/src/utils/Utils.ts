export const validateInput = (input: string): boolean => input.trim().length > 0;

export const validateUsername = (username: string): boolean =>
  validateInput(username) && username.length >= 8;

export const validateEmail = (email: string): boolean =>
  validateInput(email) && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const validatePassword = (password: string): boolean =>
  validateInput(password) && /^[\x20-\x7E]+$/.test(password);
