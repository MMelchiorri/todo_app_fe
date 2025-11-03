'use client'

import React from 'react'
import { FileSearch } from 'lucide-react'

interface DetailButtonProps {
  id?: string
  onEdit?: () => void
}

const DetailButton: React.FC<DetailButtonProps> = ({ id }) => {
  const handleClick = () => {
    if (id) {
      window.location.href = `/todos/${id}`
    } else {
      console.warn('No ID provided for DetailButton')
    }
  }
  return <FileSearch style={{ cursor: 'pointer' }} onClick={handleClick} />
}

export default DetailButton
