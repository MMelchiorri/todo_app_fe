import { Todo } from "./Todo";

export type Users = {
  id: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  role: string;
  jobAssigned?: Todo[];
};
