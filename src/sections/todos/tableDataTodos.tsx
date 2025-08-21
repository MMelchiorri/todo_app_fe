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
} from '@mui/material'
import dayjs from 'dayjs'
import { Todo } from '@/type/Todo'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import DeleteButton from '@/sections/todos/DeleteButton'
import DetailButton from '@/sections/todos/DetailButton'

interface PropsTodo {
  todos: Todo[]
}

export default async function TodoTable(props: PropsTodo) {
  const { todos } = props
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
  const t = await getTranslations('Todos')

  return (
    <>
      {/* Desktop Table */}
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

      {/* Mobile Cards */}
      <Stack spacing={2} sx={{ display: { xs: 'block', sm: 'none' }, my: 4 }}>
        {todos.map((todo) => (
          <Paper key={todo._id} sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
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
          </Paper>
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
