'use client'

import { UserProvider } from '@/context/user/UserProvider'
import { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren<{ params: { _id: string } }>> = (props) => {
  const {
    children,
    params: { _id },
  } = props
  return (
    <div>
      <UserProvider id={_id}>{children}</UserProvider>
    </div>
  )
}

export default Layout
