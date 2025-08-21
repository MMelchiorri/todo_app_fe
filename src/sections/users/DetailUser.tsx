'use client'

import { Box, Grid, IconButton, Typography } from '@mui/material'
import BackButton from '@/sections/BackButton'
import EditIcon from '@mui/icons-material/Edit'
import UserJobs from '@/sections/users/SelectJob'
import { User } from '@/type/Users'
import { Todo } from '@/type/Todo'
import { DetailTodo } from '@/sections/todos/DetailTodo'
import { useState } from 'react'

type Props = {
  user: User
  todo: Todo[]
}

export const DetailUser = ({ user, todo }: Props) => {
  const [selectedTodo, setSelected] = useState<Todo | null>(
    todo.length > 0 ? todo[0] : null
  )

  return (
    <Grid
      container
      display={'flex'}
      justifyContent="space-evenly"
      sx={{ mt: 4 }}
    >
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{
          color: 'black',
          backgroundColor: 'white',
          borderRadius: 4,
          p: 3,
          mt: 4,
          '@media (max-width:769px)': {
            width: '80%',
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          justifyContent="space-between"
        >
          <BackButton />
          <IconButton size="small" sx={{ color: 'black' }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            {user.username}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {user.role}
          </Typography>
        </Box>

        {todo.length > 0 && (
          <UserJobs jobs={todo} selectJobAction={setSelected} />
        )}
      </Grid>
      {selectedTodo && (
        <Grid
          size={{ xs: 12, md: 6 }}
          display={'flex'}
          justifyContent={'center'}
        >
          <DetailTodo todo={selectedTodo} />
        </Grid>
      )}
    </Grid>
  )
}
