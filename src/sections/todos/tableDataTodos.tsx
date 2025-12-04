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
  Popover,
  Select,
  MenuItem,
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
import { useFetchTodos } from '@/hooks/useFetchTodos'
import TableEmpty from '@/sections/todos/tableDataEmpty'
import React from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

interface PropsTodo {
  url: string
}

export default function TodoTable(props: PropsTodo) {
  const { url } = props
  const excludeKeys = [
    'id',
    '_id',
    'tags',
    'reminder',
    'reminderDate',
    'createdAt',
    '__v',
  ]

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)
  const [selectedStatuses, setSelectedStatuses] = React.useState<{
    key: string
    value: string
  }>({ key: 'status', value: '' })

  const todos: Todo[] = useFetchTodos(url)
  const router = useRouter()
  const searchParams = useSearchParams()
  const path = usePathname()

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const t = useTranslations('Todos')

  if (!todos || todos.length === 0) {
    return <TableEmpty />
  }

  const keys = Object.keys(todos[0]).filter((key) => !excludeKeys.includes(key))
  const statusOptions = new Set(todos.map((todo) => todo.status))

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
              <TableCell>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* BUTTON PER APRIRE IL POPOVER */}
                  <Button
                    sx={{ m: 3, borderColor: 'black' }}
                    variant="outlined"
                    onClick={handleFilterClick}
                    startIcon={<FilterAlt sx={{ color: 'black' }} />}
                  >
                    <Typography sx={{ color: 'black' }}>
                      {t('columns.filterByStatus')}
                    </Typography>
                  </Button>

                  {/* POPOVER CON SELECT */}
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleFilterClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <Select
                      fullWidth
                      value={selectedStatuses.value} // <-- solo stato locale
                      onChange={(event) => {
                        setSelectedStatuses({
                          key: 'status',
                          value: event.target.value,
                        })
                      }}
                    >
                      <MenuItem value="">All</MenuItem>
                      {Array.from(statusOptions).map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </Popover>

                  {/* BUTTON PER APPLICARE I FILTRI */}
                  <Button
                    onClick={(e) => {
                      e.preventDefault()

                      const params = new URLSearchParams(
                        searchParams.toString()
                      )

                      if (selectedStatuses.value) {
                        params.set(selectedStatuses.key, selectedStatuses.value)
                      } else {
                        params.delete(selectedStatuses.key)
                      }

                      const query = params.toString()
                      const newUrl = query ? `${path}?${query}` : path

                      router.push(newUrl)
                      handleFilterClose()
                    }}
                  >
                    Filter
                  </Button>
                </Box>
              </TableCell>
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
                    <Box display="flex" flexDirection="column" gap={2}>
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
