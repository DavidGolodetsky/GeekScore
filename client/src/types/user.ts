export interface User {
  id: string;
  username: string;
}

export interface AuthForm {
  title: string;
  icon: string;
  redirectText: string;
  redirectLink: { name: string };
  redirectLinkText: string;
  signUp?: boolean;
}
