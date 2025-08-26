import { Grid, Paper, Typography, TextField, Box } from '@mui/material'
import { getTranslations } from 'next-intl/server'
import { getTodoById } from '@/services/todosFetch'

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = params
  const todo = await getTodoById(_id)

  const t = await getTranslations('Todos')

  return (
    <Grid container display={'flex'} justifyContent={'center'}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper elevation={6}>
          <Typography variant={'h3'}>{t('edit.title')}</Typography>
          {Object.keys(todo).map((key) => (
            <Box key={key} margin={2}>
              <TextField
                fullWidth
                label={key}
                defaultValue={(todo as never)[key]}
                variant="outlined"
              />
            </Box>
          ))}
        </Paper>
      </Grid>
    </Grid>
  )
}
