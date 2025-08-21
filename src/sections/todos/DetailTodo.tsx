import { Todo } from '@/type/Todo'
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material'
import { CheckCircle, HourglassEmpty } from '@mui/icons-material'

type DetailTodoProps = {
  todo: Todo
}

export const DetailTodo = ({ todo }: DetailTodoProps) => {
  const statusColor = todo.completed ? 'success' : 'warning'
  const StatusIcon = todo.completed ? CheckCircle : HourglassEmpty

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        mt: 4,
        transition: '0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-3px)',
        },
      }}
    >
      <CardContent>
        <Stack spacing={1.5}>
          {/* Titolo */}
          <Typography variant="h6" fontWeight="bold" color="primary">
            {todo.name}
          </Typography>

          {/* Descrizione */}
          <Typography variant="body1" color="text.secondary">
            {todo.description}
          </Typography>

          {/* Stato */}
          <Chip
            label={todo.completed ? 'Completed' : 'In Progress'}
            color={statusColor}
            icon={<StatusIcon />}
            sx={{ alignSelf: 'flex-start', mt: 1 }}
          />

          {/* Data */}
          <Typography variant="body2" color="text.disabled">
            Created at: {new Date(todo.createdAt).toLocaleDateString()}
          </Typography>

          {/* Priorità */}
          <Typography
            variant="body2"
            fontWeight="medium"
            sx={{
              color:
                todo.priority === 'High'
                  ? 'error.main'
                  : todo.priority === 'Medium'
                  ? 'warning.main'
                  : 'success.main',
            }}
          >
            Priority: {todo.priority}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
