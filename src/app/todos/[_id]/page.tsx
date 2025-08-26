import { getTodoById } from '@/services/todosFetch'
import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import EditIcon from '@mui/icons-material/Edit'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { Stack } from '@mui/system'
import BackButton from '@/sections/BackButton'

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = params
  const todo = await getTodoById(_id)
  const t = await getTranslations('Todos')
  if (!todo) {
    return <Typography>Todo non trovato</Typography>
  }
  return (
    <Box
      sx={{
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 4,
        p: 3,
        width: '50%',
        mx: 'auto',
        mt: 4,
      }}
    >
      <Box display="flex" mb={2}>
        <Box display={'flex'} alignItems="center" flexGrow={1}>
          <BackButton />
          <Typography variant="subtitle1">{t('details.title')}</Typography>
        </Box>
        <IconButton size="small" sx={{ color: 'black' }}>
          <Link href={`/todos/${todo._id}/edit`}>
            <EditIcon fontSize="small" />
          </Link>
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight="bold">
          {todo?.name}
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={1} mt={1}>
        <CalendarTodayIcon fontSize="small" />
        <Typography variant="body2">
          {new Date(todo.dueDate).toLocaleDateString([], {})}
        </Typography>
        <AccessTimeIcon fontSize="small" sx={{ ml: 1 }} />
        <Typography variant="body2">
          {new Date(todo.dueDate).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </Box>

      <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

      <Typography variant="body2" sx={{ opacity: 0.85 }}>
        {todo?.description}
      </Typography>

      <Stack direction="row" spacing={2} mt={4} justifyContent={'flex-end'}>
        <Button
          variant="contained"
          startIcon={<CheckCircleIcon />}
          sx={{
            backgroundColor: '#1e293b',
            color: 'white',
            borderRadius: 3,
            '&:hover': { backgroundColor: '#334155' },

            '@media (max-width:769px)': {
              width: '100%',
              '&:hover': {
                backgroundColor: '#1e293b',
              },
            },
          }}
        >
          Done
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          sx={{
            backgroundColor: '#1e293b',
            color: 'red',
            borderRadius: 3,
            '&:hover': { backgroundColor: '#334155' },

            '@media (max-width:769px)': {
              width: '100%',
              flexDirection: 'column',
              alignItems: 'stretch',
              '&:hover': {
                backgroundColor: '#1e293b',
              },
            },
          }}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  )
}
