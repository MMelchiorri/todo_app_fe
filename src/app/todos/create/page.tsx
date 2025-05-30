import { getTranslations } from 'next-intl/server';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
export default async function TodoCreatePage() {
    const t = await getTranslations('Todos');


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ minWidth: 600, minHeight: 600, p: 2, boxShadow: 3 }}>
                <CardHeader title={t('create.title')} slotProps={{title: { sx: { textAlign: 'center' } }}}/>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid>
                            <TextField
                                fullWidth
                                label={t('create.name')}
                                variant="outlined"
                                required
                            />
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}
