"use client";

import React, { useEffect } from "react";
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
  Autocomplete,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useFormik } from "formik";
import { postUser } from "@/services/usersFetch";
import { userSchema } from "@/sections/users/userSchema";
import { useRouter } from "next/navigation";
import { Todo } from "@/type/Todo";
import { fetchTodos } from "@/services/todosFetch";

type ValuesFormType = {
  _id: string;
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

export const CreateUsersForm: React.FC = () => {
  const t = useTranslations("Users");
  const router = useRouter();
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const initialValues: ValuesFormType = {
    id: "",
    _id: "",
    username: "",
    password: "",
    email: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
    role: "user",
    jobAssigned: [],
  };
  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        await postUser(values);
        router.push("/users");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  useEffect(() => {
    const load = async () => {
      try {
        const todos = await fetchTodos();
        setTodos(todos);
        await formik.setFieldValue("jobAssigned", todos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    load();
  }, []);

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
                  label={t("create.username")}
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
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
              <Grid size={{ xs: 12, md: 6 }}>
                <Autocomplete
                  fullWidth
                  getOptionLabel={(option) => option.name || ""}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        label={t("create.jobAssigned")}
                        error={
                          formik.touched.jobAssigned &&
                          Boolean(formik.errors.jobAssigned)
                        }
                        helperText={
                          formik.touched.jobAssigned &&
                          formik.errors.jobAssigned
                        }
                      />
                    );
                  }}
                  options={todos}
                />
              </Grid>
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
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
