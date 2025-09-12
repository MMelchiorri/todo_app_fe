'use client'

import React, { useContext } from 'react'
import { Card, CardHeader, CardContent, Grid, TextField } from '@mui/material'
import { useTranslations } from 'next-intl'
import { Formik } from 'formik'
import { postTodo } from '@/services/todosFetch'
import { useRouter } from 'next/navigation'

import { Todo } from '@/type/Todo'
import { todoSchema } from '@/sections/todos/todoSchema'
import { UserContext } from '@/context'

type ValuesFormType = {
  name: string
  description: string
  completed: boolean
  category: string
  assignedTo: string
  dueDate: Date
  reminder: boolean
  reminderDate: Date
  createdAt: Date
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'done'
  tags: string
}

type UpdateTodoFormProps = {
  todo: Todo
}

const UpdateTodoForm: React.FC<UpdateTodoFormProps> = ({
  todo,
}: UpdateTodoFormProps) => {
  const t = useTranslations('Todos')
  const router = useRouter()
  const user = useContext(UserContext)
  console.log(user)

  const initialValues: ValuesFormType = {
    name: todo.name,
    description: todo.description,
    completed: todo.completed,
    category: todo.category,
    assignedTo: todo.assignedTo,
    dueDate: todo.dueDate,
    reminder: todo.reminder,
    reminderDate: todo.reminderDate,
    createdAt: new Date(),
    priority: (todo.priority as 'low' | 'medium' | 'high') || 'low',
    status: 'done',
    tags: todo.tags.join(', '),
  }

  const onSubmit = async (
    values: ValuesFormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate ? new Date(values.dueDate) : undefined,
      createdAt: values.createdAt,
      reminderDate: values.reminderDate
        ? new Date(values.reminderDate)
        : undefined,
      tags: values.tags.split(',').map((tag) => tag.trim()),
    }
    await postTodo(formattedValues)
    router.push('/todos')

    setSubmitting(false)
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={todoSchema}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid
              container
              spacing={3}
              display={'flex'}
              justifyContent={'center'}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardHeader title={t('edit.title')} />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 4 }} justifyContent={'center'}>
                        <TextField
                          fullWidth
                          label={t('edit.name')}
                          name="name"
                          value={props.values.name}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          error={
                            props.touched.name && Boolean(props.errors.name)
                          }
                          helperText={props.touched.name && props.errors.name}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  )
}

export default UpdateTodoForm
