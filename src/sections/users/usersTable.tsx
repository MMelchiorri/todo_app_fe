import { User } from '@/type/Users'
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
  Box,
  Stack,
} from '@mui/material'
import { getTranslations } from 'next-intl/server'
import dayjs from 'dayjs'
import Link from 'next/link'
import DeleteButton from '@/sections/todos/DeleteButton'
import DetailButton from '@/sections/users/DetailButton'

type UsersTableProps = {
  users: User[]
}

const excludedKeys: (keyof User | string)[] = [
  'id',
  '__v',
  '_id',
  'createdAt',
  'updatedAt',
  'password',
  'isActive',
  'updatedAt',
  'jobAssigned',
]

const keysToDisplay = (user: User): (keyof User)[] => {
  return Object.keys(user).filter(
    (key) => !excludedKeys.includes(key)
  ) as (keyof User)[]
}

export default async function UsersTable(props: UsersTableProps) {
  const { users } = props
  const t = await getTranslations('Users')
  const keys = keysToDisplay(users[0])

  return (
    <>
      {/* Table for Desktop */}
      <TableContainer
        component={Paper}
        sx={{
          mx: 'auto',
          my: 6,
          p: 2,
          width: '60%',
          borderRadius: 2,
          boxShadow: 3,
          display: { xs: 'none', sm: 'block' }, // hide on mobile
          overflowX: 'auto',
        }}
      >
        <Table sx={{ minWidth: 650 }}>
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
            {users.map((user) => (
              <TableRow key={user.id}>
                {keys.map((key) => (
                  <TableCell key={key}>
                    {typeof user[key] === 'string' && dayjs(user[key]).isValid()
                      ? dayjs(user[key]).format('DD/MM/YYYY')
                      : user[key]?.toString()}
                  </TableCell>
                ))}
                <TableCell sx={{ textAlign: 'center' }}>
                  <DeleteButton id={user.id} />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <DetailButton id={user._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Card List for Mobile */}
      <Stack spacing={2} sx={{ display: { xs: 'block', sm: 'none' }, my: 4 }}>
        {users.map((user) => (
          <Paper key={user.id} sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            {keys.map((key) => (
              <Box key={key} sx={{ mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  {t(`columns.${key}`)}
                </Typography>
                <Typography variant="body1">
                  {typeof user[key] === 'string' && dayjs(user[key]).isValid()
                    ? dayjs(user[key]).format('DD/MM/YYYY')
                    : user[key]?.toString()}
                </Typography>
              </Box>
            ))}

            <Box display="flex" gap={1} mt={1}>
              <DeleteButton id={user.id} />
              <DetailButton id={user._id} />
            </Box>
          </Paper>
        ))}

        <Button variant="contained" sx={{ mt: 2, width: '100%' }}>
          <Link
            href="/users/create"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {t('actions.add')}
          </Link>
        </Button>
      </Stack>
      <Box display={'flex'} justifyContent={'center'}>
        <Button variant="contained" sx={{ mt: 2 }}>
          <Link
            href="/users/create"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {t('actions.add')}
          </Link>
        </Button>
      </Box>
    </>
  )
}
