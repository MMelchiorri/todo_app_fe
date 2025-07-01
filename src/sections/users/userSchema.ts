import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),

  role: Yup.string()
    .oneOf(["admin", "user"], "Role must be either 'admin' or 'user'")
    .required("Role is required"),

  createdAt: Yup.date()
    .default(() => new Date())
    .required("Creation date is required"),
});
