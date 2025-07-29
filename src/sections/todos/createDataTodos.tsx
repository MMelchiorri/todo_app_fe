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
  Autocomplete,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Formik } from "formik";
import { postTodo } from "@/services/todosFetch";
import { todoSchema } from "@/sections/todos/todoSchema";
import { useRouter } from "next/navigation";
import { fetchUsers } from "@/services/usersFetch";
import { useEffect, useState } from "react";
import { Users } from "@/type/Users";

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

const CreateTodoForm: React.FC = () => {
  const t = useTranslations("Todos");
  const router = useRouter();
  const [users, setUsers] = useState<Users[]>([]);
  const [user, setUser] = useState<string>("");
  const userOptions = users.map((user) => user.username);

  useEffect(() => {
    (async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    })();
  }, []);

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

  const onSubmit = async (
    values: ValuesFormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
      createdAt: values.createdAt,
      reminderDate: values.reminderDate
        ? new Date(values.reminderDate)
        : undefined,
      tags: values.tags.split(",").map((tag) => tag.trim()),
    };
    await postTodo(formattedValues);
    router.push("/todos");

    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 700,
          minHeight: 600,
          p: 2,
          boxShadow: 3,
        }}
      >
        <CardHeader title={t("create.title")} sx={{ textAlign: "center" }} />

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={todoSchema}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            touched,
            errors,
          }) => (
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t("create.name")}
                      variant="outlined"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      helperText={errors.name}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t("create.description")}
                      variant="outlined"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t("create.category")}
                      variant="outlined"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.category}
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                      value={user}
                      fullWidth
                      options={userOptions}
                      onChange={(event, newValue) => {
                        setUser(newValue || "");
                        setFieldValue("assignedTo", newValue || "");
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name="assignedTo"
                          label={t("create.assignedTo")}
                          error={Boolean(
                            errors.assignedTo && touched.assignedTo,
                          )}
                          helperText={
                            touched.assignedTo && errors.assignedTo
                              ? errors.assignedTo
                              : ""
                          }
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t("create.dueDate")}
                      type="date"
                      variant="outlined"
                      name="dueDate"
                      value={values.dueDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.dueDate}
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="reminder"
                          checked={values.reminder}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      }
                      label={t("create.reminder")}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t("create.reminderDate")}
                      type="date"
                      variant="outlined"
                      name="reminderDate"
                      value={values.reminderDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.reminderDate}
                      slotProps={{ inputLabel: { shrink: true } }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t("create.priority")}
                      select
                      variant="outlined"
                      name="priority"
                      value={values.priority}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.priority}
                    >
                      <MenuItem value="low">
                        {t("create.priorityOptions.low")}
                      </MenuItem>
                      <MenuItem value="medium">
                        {t("create.priorityOptions.medium")}
                      </MenuItem>
                      <MenuItem value="high">
                        {t("create.priorityOptions.high")}
                      </MenuItem>
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t("create.status")}
                      select
                      variant="outlined"
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.status}
                    >
                      <MenuItem value="todo">
                        {t("create.statusOptions.pending")}
                      </MenuItem>
                      <MenuItem value="in-progress">
                        {t("create.statusOptions.inProgress")}
                      </MenuItem>
                      <MenuItem value="done">
                        {t("create.statusOptions.completed")}
                      </MenuItem>
                    </TextField>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t("create.tags")}
                      variant="outlined"
                      name="tags"
                      value={values.tags}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.tags}
                      placeholder="tag1, tag2, tag3"
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 10 }} textAlign="center">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {t("create.submit")}
                  </Button>
                </Box>
              </CardContent>
            </form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};

export default CreateTodoForm;
