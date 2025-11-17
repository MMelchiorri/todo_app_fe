import { getTodoById } from '@/services/todosFetch'
import {
  Box,
  Button,
  Card,
  Divider,
  Typography,
  Stack,
  Paper,
} from '@mui/material'
import { getTranslations } from 'next-intl/server'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import BackButton from '@/sections/BackButton'

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = params
  const todo = await getTodoById(_id)
  const t = await getTranslations('Todos')

  if (!todo) {
    return <Typography>Todo non trovato</Typography>
  }

  return (
    <Card
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 600,
        mx: 'auto',
        mt: 6,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <BackButton />
        <Typography variant="subtitle1" ml={1} flexGrow={1}>
          {t('details.title')}
        </Typography>
      </Box>

      {/* Title */}
      <Typography variant="h5" fontWeight="bold" color="primary" mb={1}>
        {todo?.name}
      </Typography>

      {/* Date & Time */}
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Paper variant="outlined" sx={{ px: 1.5, py: 0.5, borderRadius: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">
              {new Date(todo.dueDate).toLocaleDateString()}
            </Typography>
          </Stack>
        </Paper>
        <Paper variant="outlined" sx={{ px: 1.5, py: 0.5, borderRadius: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">
              {new Date(todo.dueDate).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
          </Stack>
        </Paper>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Description */}
      <Box
        sx={{
          borderLeft: 4,
          borderColor: 'primary.main',
          pl: 2,
          py: 1,
          mb: 3,
          bgcolor: 'grey.50',
          borderRadius: 1,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {todo?.description}
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckCircleIcon />}
          sx={{ borderRadius: 3, px: 3 }}
        >
          Done
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ borderRadius: 3, px: 3 }}
        >
          Delete
        </Button>
      </Stack>
    </Card>
  )
}
