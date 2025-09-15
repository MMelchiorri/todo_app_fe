export type Todo = {
  _id: string
  id: string
  name: string
  description: string
  completed: boolean
  category: string
  assignedTo: string
  dueDate: Date
  reminder: boolean
  reminderDate: Date
  createdAt: Date
  priority: string
  status: string
  tags: string[]
}
