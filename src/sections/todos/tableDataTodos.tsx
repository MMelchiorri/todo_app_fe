import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import dayjs from 'dayjs'
import { Todo } from '@/type/Todo'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import DeleteButton from '@/sections/todos/DeleteButton'
import DetailButton from '@/sections/todos/DetailButton'

interface propsTodo {
  todos: Todo[]
}

export default async function TodoTable(props: propsTodo) {
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
    <TableContainer
      component={Paper}
      sx={{
        mx: 'auto',
        my: 6,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((key) => (
              <TableCell key={key}>{t(`columns.${key}`)}</TableCell>
            ))}
            {Array(2)
              .fill(null)
              .map((_, i) => (
                <TableCell key={`extra-${i}`} />
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
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
          <TableRow>
            <TableCell
              colSpan={keys.length + 2}
              sx={{
                textAlign: 'center',
                paddingTop: 24,
                paddingBottom: 24,
                py: 3,
              }}
            >
              <Button variant="contained">
                <Link
                  href="/todos/create"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {t('actions.add')}
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
