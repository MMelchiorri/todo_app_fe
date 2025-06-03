import { getTranslations } from 'next-intl/server';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default async function TodoCreatePage() {
    const t = await getTranslations('Todos');

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
                    slotProps={{ title: { sx: { textAlign: 'center' } } }}
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('create.name')}
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('create.description')}
                                variant="outlined"
                                required
                                multiline
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('create.category')}
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('create.assignedTo')}
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('create.dueDate')}
                                type="date"
                                variant="outlined"
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label={t('create.reminder')}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('create.reminderDate')}
                                type="date"
                                variant="outlined"
                                slotProps={{inputLabel: { shrink: true }}}

                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('create.priority')}
                                select
                                variant="outlined"
                            >
                                <option value="low">{t('create.priorityOptions.low')}</option>
                                <option value="medium">{t('create.priorityOptions.medium')}</option>
                                <option value="high">{t('create.priorityOptions.high')}</option>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('create.status')}
                                select
                                variant="outlined"
                            >
                                <option value="todo">{t('create.statusOptions.pending')}</option>
                                <option value="in-progress">{t('create.statusOptions.inProgress')}</option>
                                <option value="done">{t('create.statusOptions.completed')}</option>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={t('create.tags')}
                                variant="outlined"
                                placeholder="tag1, tag2, tag3"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}
