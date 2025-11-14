'use client'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
} from '@mui/material'
import dayjs from 'dayjs'
import { Todo } from '@/type/Todo'
import { useTranslations } from 'next-intl'

import {
  CheckCircle,
  Pending,
  CalendarMonth,
  Schedule,
} from '@mui/icons-material'

interface PropsTodo {
  todos: Todo[]
}

export default function TodoTable(props: PropsTodo) {
  const { todos } = props
  const excludeKeys = [
    'id',
    '_id',
    'tags',
    'reminder',
    'reminderDate',
    'createdAt',
    '__v',
  ]

  const keys = Object.keys(todos[0]).filter((key) => !excludeKeys.includes(key))

  const t = useTranslations('Todos')

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <TableContainer component={Paper} sx={{ width: '80%' }}>
        <Table>
          <TableHead>
            <TableRow>
              {keys.map((key) => (
                <TableCell
                  sx={{ backgroundColor: '#F8F1F6' }}
                  key={key}
                  align={'center'}
                >
                  {t(`columns.${key}`)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => {
              return (
                <TableRow key={todo._id}>
                  <TableCell>{todo.name}</TableCell>
                  <TableCell>{todo.description}</TableCell>
                  <TableCell align="center">
                    {todo.completed ? (
                      <CheckCircle color="success" />
                    ) : (
                      <Pending />
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip label={todo.category} />
                  </TableCell>
                  <TableCell>{todo.assignedTo}</TableCell>
                  <TableCell>
                    <Chip
                      label={todo.priority}
                      color={
                        todo.priority === 'alta'
                          ? 'error'
                          : todo.priority === 'media'
                          ? 'warning'
                          : 'success'
                      }
                      variant="outlined"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                      <Chip
                        icon={<CalendarMonth />}
                        label={dayjs(todo.dueDate).format('DD MMM YYYY')}
                        color={
                          dayjs(todo.dueDate).isBefore(dayjs())
                            ? 'error'
                            : 'primary'
                        }
                        size="small"
                      />
                      <Chip
                        icon={<Schedule />}
                        label={dayjs(todo.dueDate).format('HH:mm')}
                        color={
                          dayjs(todo.dueDate).isBefore(dayjs())
                            ? 'error'
                            : 'primary'
                        }
                        size="small"
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
