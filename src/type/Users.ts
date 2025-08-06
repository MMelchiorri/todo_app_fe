import { Todo } from "./Todo";

export type User = {
  _id: string;
  id: string;
  username: string;
  password: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  role: string;
  jobAssigned?: string[];
};
