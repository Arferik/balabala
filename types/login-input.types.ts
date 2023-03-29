export type LoginForm = {
  username: string;
  password: string;
  csrfToken: string;
};

export type RegisterForm = {
  "confirm-password": string;
  username: string;
  password: string;
};
