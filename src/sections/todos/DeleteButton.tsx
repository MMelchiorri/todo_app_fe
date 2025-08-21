'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import { deleteUser } from '@/services/usersFetch'

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await deleteUser(id)
      window.location.reload()
    } catch (error) {
      console.error('Failed to delete:', error)
    }
  }

  return <DeleteIcon sx={{ cursor: 'pointer' }} onClick={handleDelete} />
}
