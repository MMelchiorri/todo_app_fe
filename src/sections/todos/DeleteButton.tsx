'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import { deleteTodo } from '@/services/todosFetch'

type DeleteButtonProps = {
  id: string
  lockedId?: Set<string>
}

export default function DeleteButton({ id, lockedId }: DeleteButtonProps) {
  if (lockedId && lockedId.has(id)) {
    return <span style={{ marginLeft: 6, color: 'orange' }}>🔒</span>
  }
  const handleDelete = async () => {
    try {
      await deleteTodo(id)
      window.location.reload()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  return <DeleteIcon sx={{ cursor: 'pointer' }} onClick={handleDelete} />
}
