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

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
        <Autocomplete
          options={filterStatus}
          value={filterStatus[0]} // seleziona solo uno
          onChange={(_, newValue) => {
            if (newValue) setFilterStatus([newValue])
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
                  '& fieldset': {
                    borderColor: 'grey.400',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          )}
          sx={{ width: 250 }}
        />
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          mx: 'auto',
          my: 6,
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          display: { xs: 'none', sm: 'block' },
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
            {todos.map((todo) => (
              <TableRow key={todo._id}>
                {keys.map((key) => (
                  <TableCell key={key}>
                    {typeof todo[key] === 'string' && dayjs(todo[key]).isValid()
                      ? dayjs(todo[key]).format('DD/MM/YYYY')
                      : todo[key]?.toString() ?? 'N/A'}
                  </TableCell>
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
        {todos.map((todo) => (
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
                    {typeof todo[key] === 'string' && dayjs(todo[key]).isValid()
                      ? dayjs(todo[key]).format('DD/MM/YYYY')
                      : todo[key]?.toString() ?? 'N/A'}
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

        <Button variant="contained" sx={{ mt: 2, width: '100%' }}>
          <Link
            href="/todos/create"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {t('actions.add')}
          </Link>
        </Button>
      </Stack>
    </>
  )
}
