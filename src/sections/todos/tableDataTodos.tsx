'use client'

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
  TextField,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import dayjs from 'dayjs'
import { Todo } from '@/type/Todo'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import DeleteButton from '@/sections/todos/DeleteButton'
import DetailButton from '@/sections/todos/DetailButton'
import { useState } from 'react'

interface PropsTodo {
  todos: Todo[]
}

export default function TodoTable(props: PropsTodo) {
  const { todos } = props
  const [filterStatus, setFilterStatus] = useState<string[]>(
    Array.from(
      new Set(todos.map((todo) => (todo.completed ? 'completed' : 'pending')))
    )
  )
  const [filterAssigned, setFilterAssigned] = useState<string[]>(
    Array.from(new Set(todos.map((todo) => todo.assignedTo)))
  )

  const excludedKeys = [
    '_id',
    '__v',
    'properties',
    'reminder',
    'completed',
    'tags',
    'updatedAt',
    'id',
    'reminderDate',
  ]
  const keys = Object.keys(todos[0]).filter(
    (key) => !excludedKeys.includes(key)
  ) as (keyof Todo)[]
  const t = useTranslations('Todos')

  const isDate = (value: string) =>
    /^\d{4}-\d{2}-\d{2}T/.test(value) || /^\d{4}-\d{2}-\d{2}$/.test(value)

  const formatValue = (value: unknown) => {
    if (typeof value === 'string' && isDate(value)) {
      return dayjs(value).format('DD/MM/YYYY')
    }
    return value?.toString() ?? 'N/A'
  }

  const filteredTodos = todos.filter((todo) => {
    const statusMatch =
      filterStatus.length === 0 ||
      filterStatus.includes(todo.completed ? 'completed' : 'pending')
    const assignedMatch =
      filterAssigned.length === 0 || filterAssigned.includes(todo.assignedTo)
    return statusMatch && assignedMatch
  })

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'flex-end' },
          m: 2,
        }}
      >
        <Box display={{ xs: 'block', sm: 'flex' }} gap={2}>
          <Autocomplete
            options={filterAssigned}
            value={filterAssigned[0]}
            onChange={(_, newValue) => {
              if (newValue) setFilterAssigned([newValue])
              else setFilterAssigned([])
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select assigned"
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'grey.400' },
                    '&:hover fieldset': { borderColor: 'primary.main' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                }}
              />
            )}
            sx={{ width: 250 }}
          />
          <Autocomplete
            options={filterStatus}
            value={filterStatus[0]}
            onChange={(_, newValue) => {
              if (newValue) setFilterStatus([newValue])
              else setFilterStatus([])
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select status"
                variant="outlined"
                size="small"
                sx={{
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'grey.400' },
                    '&:hover fieldset': { borderColor: 'primary.main' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                }}
              />
            )}
            sx={{ width: 250 }}
          />
        </Box>
      </Box>

      {/* Tabella Desktop */}
      <TableContainer
        component={Paper}
        sx={{
          mx: 'auto',
          my: 6,
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          display: { xs: 'none', sm: 'block' },
          maxWidth: '80%',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {keys.map((key) => (
                <TableCell key={key}>{t(`columns.${key}`)}</TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTodos.map((todo) => (
              <TableRow key={todo._id}>
                {keys.map((key) => (
                  <TableCell key={key}>{formatValue(todo[key])}</TableCell>
                ))}
                <TableCell sx={{ textAlign: 'center' }}>
                  <DeleteButton id={todo._id} />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <DetailButton id={todo._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile Accordion */}
      <Stack spacing={2} sx={{ display: { xs: 'block', sm: 'none' }, my: 4 }}>
        {filteredTodos.map((todo) => (
          <Accordion key={todo._id} sx={{ boxShadow: 3, borderRadius: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{todo.name || 'Todo'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {keys.map((key) => (
                <Box key={key} sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {t(`columns.${key}`)}
                  </Typography>
                  <Typography variant="body1">
                    {formatValue(todo[key])}
                  </Typography>
                </Box>
              ))}
              <Box display="flex" gap={1} mt={1}>
                <DeleteButton id={todo._id} />
                <DetailButton id={todo._id} />
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>

      {/* Add Button */}
      <Box display={'flex'} justifyContent={'center'}>
        <Button variant="contained" sx={{ mt: 2 }}>
          <Link
            href="/todos/create"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {t('actions.add')}
          </Link>
        </Button>
      </Box>
    </>
  )
}
