"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Formik } from "formik";
import { fetchUsers } from "@/services/usersFetch";
import { todoSchema } from "@/sections/users/userSchema";
import { useRouter } from "next/navigation";

type ValuesFormType = {
  name: string;
  description: string;
  completed: boolean;
  category: string;
  assignedTo: string;
  dueDate: string;
  reminder: boolean;
  reminderDate: string;
  createdAt: Date;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  tags: string;
};

const CreateUsersForm: React.FC = () => {
  const t = useTranslations("Users");
  const router = useRouter();

  const initialValues: ValuesFormType = {
    name: "",
    description: "",
    completed: false,
    category: "",
    assignedTo: "",
    dueDate: "",
    reminder: false,
    reminderDate: "",
    createdAt: new Date(),
    priority: "low",
    status: "todo",
    tags: "",
  };

  return <></>;
};

export default CreateUsersForm;
