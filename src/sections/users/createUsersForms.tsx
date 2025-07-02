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
  password: string;
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
    password: "",
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
      <Card>
        <CardHeader
          title={t("create.title")}
          sx={{
            p: 2,
            textAlign: "center",
          }}
        />

        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label={t("create.name")}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label={t("create.password")}
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label={t("create.email")}
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label={t("create.role.label")}
                  name="role"
                  select
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="user">
                    {t("create.role.options.user")}
                  </MenuItem>
                  <MenuItem value="admin">
                    {t("create.role.options.admin")}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.isActive}
                      onChange={(e) =>
                        formik.setFieldValue("isActive", e.target.checked)
                      }
                    />
                  }
                  label={t("create.isActive")}
                />
              </Grid>
              <Box sx={{ mt: 10 }} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={formik.isSubmitting}
                >
                  {t("create.submit")}
                </Button>
              </Box>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateUsersForm;
