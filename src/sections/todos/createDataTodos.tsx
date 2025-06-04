'use client';

import React from 'react';
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
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { Formik } from 'formik';

type ValuesFormType = {
    name: string;
    description: string;
    category: string;
    assignedTo: string;
    dueDate: string;
    reminder: boolean;
    reminderDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'done';
    tags: string;
};

const CreateTodoForm: React.FC = () => {
    const initialValues: ValuesFormType = {
        name: '',
        description: '',
        category: '',
        assignedTo: '',
        dueDate: '',
        reminder: false,
        reminderDate: '',
        priority: 'low',
        status: 'todo',
        tags: '',
    };
    const onSubmit = (values: ValuesFormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log('Form submitted with values:', values);
        setSubmitting(false);
    };
    const t = useTranslations('Todos');
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 700,
                    minHeight: 600,
                    p: 2,
                    boxShadow: 3,
                }}
            >
                <CardHeader
                    title={t('create.title')}
                    sx={{ textAlign: 'center' }}
                />

                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({
                          values,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label={t('create.name')}
                                            variant="outlined"
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label={t('create.description')}
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
                                            label={t('create.category')}
                                            variant="outlined"
                                            name="category"
                                            value={values.category}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label={t('create.assignedTo')}
                                            variant="outlined"
                                            name="assignedTo"
                                            value={values.assignedTo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label={t('create.dueDate')}
                                            type="date"
                                            variant="outlined"
                                            name="dueDate"
                                            value={values.dueDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
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
                                            label={t('create.reminder')}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label={t('create.reminderDate')}
                                            type="date"
                                            variant="outlined"
                                            name="reminderDate"
                                            value={values.reminderDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label={t('create.priority')}
                                            select
                                            variant="outlined"
                                            name="priority"
                                            value={values.priority}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value="low">{t('create.priorityOptions.low')}</MenuItem>
                                            <MenuItem value="medium">{t('create.priorityOptions.medium')}</MenuItem>
                                            <MenuItem value="high">{t('create.priorityOptions.high')}</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label={t('create.status')}
                                            select
                                            variant="outlined"
                                            name="status"
                                            value={values.status}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <MenuItem value="todo">{t('create.statusOptions.pending')}</MenuItem>
                                            <MenuItem value="in-progress">{t('create.statusOptions.inProgress')}</MenuItem>
                                            <MenuItem value="done">{t('create.statusOptions.completed')}</MenuItem>
                                        </TextField>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            fullWidth
                                            label={t('create.tags')}
                                            variant="outlined"
                                            name="tags"
                                            value={values.tags}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="tag1, tag2, tag3"
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ mt: 10 }} textAlign="center">
                                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                                        {t('create.submit')}
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
