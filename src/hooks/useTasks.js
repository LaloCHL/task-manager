import { useState, useEffect } from 'react'

const INITIAL_TASKS = {
  todo: [
    { id: '1', title: 'Design landing page', tag: 'UI', date: '2026-06-20' },
    { id: '2', title: 'Write API docs', tag: 'Docs', date: '2026-06-22' },
  ],
  inprogress: [
    { id: '3', title: 'Build auth system', tag: 'Backend', date: '2026-06-18' },
  ],
  done: [
    { id: '4', title: 'Initialize repo', tag: 'Setup', date: '' },
  ]
}

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : INITIAL_TASKS
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask(column, task) {
    setTasks(prev => ({
      ...prev,
      [column]: [...prev[column], { ...task, id: Date.now().toString() }]
    }))
  }

  function deleteTask(column, id) {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(t => t.id !== id)
    }))
  }

  function moveTask(sourceCol, destCol, sourceIndex, destIndex) {
    setTasks(prev => {
      const source = [...prev[sourceCol]]
      const dest = sourceCol === destCol ? source : [...prev[destCol]]
      const [moved] = source.splice(sourceIndex, 1)
      dest.splice(destIndex, 0, moved)
      return {
        ...prev,
        [sourceCol]: source,
        [destCol]: dest,
      }
    })
  }

  const total = Object.values(tasks).flat().length
  const done = tasks.done.length
  const progress = total === 0 ? 0 : Math.round((done / total) * 100)

  return { tasks, addTask, deleteTask, moveTask, total, done, progress }
}