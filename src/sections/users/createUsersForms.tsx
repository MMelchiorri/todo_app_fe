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
import { useFormik } from "formik";
import { postUser } from "@/services/usersFetch";
import { userSchema } from "@/sections/users/userSchema";
import { useRouter } from "next/navigation";

type ValuesFormType = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  role: string;
};

const CreateUsersForm: React.FC = () => {
  const t = useTranslations("Users");
  const router = useRouter();

  const initialValues: ValuesFormType = {
    name: "",
    email: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    role: "user",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        await postUser(formik.values);
        console.log("Form submitted successfully:", values);
        router.push("/users"); // Redirect to users page after successful submission
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CardHeader
        title={t("create.title")}
        sx={{
          width: "100%",
          maxWidth: 700,
          minHeight: 600,
          p: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      />
      <CardContent></CardContent>
    </Box>
  );
};

export default CreateUsersForm;
