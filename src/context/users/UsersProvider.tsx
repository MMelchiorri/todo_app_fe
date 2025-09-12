'use client'

import React, { useState, PropsWithChildren, FC, useEffect } from 'react'
import { UsersContext } from '@/context'
import { User } from '@/type/Users'
import { fetchUsers } from '@/services/usersFetch'

export const UsersProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props
  const [users, setUser] = useState<User[]>([])
  const fetchUser = async (): Promise<User[]> => {
    const fetchedUser = await fetchUsers()
    setUser(fetchedUser)
    return fetchedUser
  }
  useEffect(() => {
    fetchUser().catch(() => {
      console.error('Failed to fetch user')
    })
  }, [])

  return <UsersContext value={{ users }}>{children}</UsersContext>
}
