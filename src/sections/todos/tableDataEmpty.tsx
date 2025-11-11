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
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { AddTask } from '@mui/icons-material'

export default async function TableEmpty() {
  const t = await getTranslations('Todos')

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 800,
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
            <TableCell style={{ textAlign: 'center' }}>
              {t('generic.empty')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{ textAlign: 'center' }}>
              <Link href={'/todos/create'}>
                <Button
                  variant={'contained'}
                  startIcon={<AddTask />}
                  sx={{ backgroundColor: '#65558E' }}
                >
                  {t('actions.add')}
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
