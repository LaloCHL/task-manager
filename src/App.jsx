import { useState } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import Column from './components/Column'
import AddTaskModal from './components/AddTaskModal'
import { useTasks } from './hooks/useTasks'

function App() {
  const { tasks, addTask, deleteTask, moveTask, total, done, progress } = useTasks()
  const [modal, setModal] = useState(null)

  function handleDragEnd(result) {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return
    moveTask(source.droppableId, destination.droppableId, source.index, destination.index)
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
            <p className="text-sm text-gray-400 mt-1">Drag cards between columns to update status</p>
          </div>
          <button
            onClick={() => setModal('todo')}
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            + Add task
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total tasks', value: total },
            { label: 'Completed', value: done },
            { label: 'In progress', value: tasks.inprogress.length },
            { label: 'Progress', value: `${progress}%` },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 text-center border border-gray-100">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Overall progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-3 gap-4">
            {['todo', 'inprogress', 'done'].map(col => (
              <Column
                key={col}
                id={col}
                tasks={tasks[col]}
                onDelete={deleteTask}
                onAddClick={setModal}
              />
            ))}
          </div>
        </DragDropContext>

      </div>

      {modal && (
        <AddTaskModal
          defaultColumn={modal}
          onAdd={addTask}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  )
}

export default App