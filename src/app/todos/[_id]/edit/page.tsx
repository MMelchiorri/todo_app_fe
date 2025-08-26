import { Grid, Paper, Typography, TextField, Box, Button } from '@mui/material'
import { getTranslations } from 'next-intl/server'
import { getTodoById } from '@/services/todosFetch'

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = params
  const todo = await getTodoById(_id)

  const t = await getTranslations('Todos')

  const excludedKeys = [
    '_id',
    'createdAt',
    'updatedAt',
    '__v',
    'id',
    'completed',
    'reminder',
  ]

  Object.keys(todo).forEach((key) => {
    if (excludedKeys.includes(key)) {
      delete (todo as never)[key]
    }
  })

  return (
    <Grid container display="flex" justifyContent="center" sx={{ mt: 6 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {t('edit.title')}
          </Typography>

          {Object.keys(todo).map((key) => (
            <Box key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                defaultValue={(todo as never)[key]}
                variant="outlined"
              />
            </Box>
          ))}

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}
