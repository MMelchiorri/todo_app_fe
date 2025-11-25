'use client'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material'
import dayjs from 'dayjs'
import { Todo } from '@/type/Todo'
import { useTranslations } from 'next-intl'
import { deleteTodo } from '@/services/todosFetch'

import {
  CheckCircle,
  Pending,
  CalendarMonth,
  Schedule,
  Delete,
  ArrowForward,
  FilterAlt,
} from '@mui/icons-material'
import Link from 'next/link'
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
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      flexDirection="column"
      alignItems="center"
      gap={4}
    >
      <Box display="flex" justifyContent="flex-end" p={2}></Box>
      <TableContainer component={Paper} sx={{ width: '80%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <Button
                sx={{ m: 3, borderColor: 'black' }}
                variant="outlined"
                startIcon={<FilterAlt sx={{ color: 'black' }} />}
              >
                <Typography sx={{ color: 'black' }}>
                  {t('columns.filterByStatus')}
                </Typography>
              </Button>
            </TableRow>
            <TableRow>
              {keys.map((key) => (
                <TableCell
                  sx={{ backgroundColor: '#F8F1F6' }}
                  key={key}
                  align="center"
                >
                  {t(`columns.${key}`)}
                </TableCell>
              ))}

              <TableCell sx={{ backgroundColor: '#F8F1F6' }} />
              <TableCell
                sx={{ backgroundColor: '#F8F1F6' }}
                key="detail"
                align="center"
              />
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
                      <CheckCircle sx={{ color: '#4A454F' }} />
                    ) : (
                      <Pending sx={{ color: '#4A454F' }} />
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
                        size="small"
                      />
                      <Chip
                        icon={<Schedule />}
                        label={dayjs(todo.dueDate).format('HH:mm')}
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Delete
                      onClick={async () => {
                        await deleteTodo(todo._id!)
                        window.location.reload()
                      }}
                      sx={{ color: '#4A454F' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/todos/${todo._id}`}
                      style={{ color: '#4A454F' }}
                    >
                      <ArrowForward />
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Link href={'/todos/create'} style={{ textDecoration: 'none' }}>
        <Button variant={'contained'} sx={{ backgroundColor: '#675496' }}>
          {t('actions.add')}
        </Button>
      </Link>
    </Box>
  )
}
