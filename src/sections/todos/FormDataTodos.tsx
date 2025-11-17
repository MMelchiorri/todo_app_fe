'use client'

import React from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  Typography,
  Input,
  InputAdornment,
  TextField,
  Card,
  Divider,
  Button,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Person from '@mui/icons-material/Person'
import { Category, TaskAlt, Assignment } from '@mui/icons-material'

const TodoForm = () => {
  const t = useTranslations('Todos')

  return (
    <Box display="flex" flexDirection="column" width="40%" mx="auto" my={4}>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Assignment />
        <Typography variant="h5" fontWeight={600}>
          {t('create.title')}
        </Typography>
      </Box>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel htmlFor="input-with-icon-adornment">
          {t('create.name')}
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          }
        />
      </FormControl>

      {/* Assignee */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Typography variant="subtitle1" sx={{ minWidth: 100 }}>
          {t('create.assignee')}
        </Typography>
        <TextField
          select
          fullWidth
          sx={{
            '& fieldset': { border: '1px solid #ccc', borderRadius: 1 },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Typography variant="subtitle1" sx={{ minWidth: 100 }}>
          {t('create.dueDate')}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={['DatePicker']}
            sx={{
              '& fieldset': { border: '1px solid #ccc', borderRadius: 1 },
              '&:hover fieldset': { border: '1px solid #aaa' },
              '&.Mui-focused fieldset': { border: '1px solid #1976d2' },
              width: 200,
            }}
          >
            <DatePicker label={t('create.dueDate')} />
          </DemoContainer>
        </LocalizationProvider>
      </Box>

      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {[
          { icon: <Category />, label: t('create.category') },
          { icon: <TaskAlt />, label: t('create.status') },
          { icon: <Assignment />, label: t('create.priority') },
        ].map((item, index) => (
          <Box key={index} display="flex" alignItems="center" width="100%">
            <Box display="flex" alignItems="center" gap={1} flex={0.3}>
              {item.icon}
              <Typography variant="subtitle1">{item.label}</Typography>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: '#eee', margin: 1 }}
            />

            <Box flex={1}>
              <TextField
                select
                fullWidth
                sx={{ '& fieldset': { borderRadius: 1 } }}
              />
            </Box>
          </Box>
        ))}
      </Card>
      <Box display={'flex'} justifyContent="center" mt={3}>
        <Button variant={'contained'} sx={{ backgroundColor: '#675496' }}>
          {t('create.submit')}
        </Button>
      </Box>
    </Box>
  )
}

export default TodoForm
