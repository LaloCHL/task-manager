import { Droppable } from '@hello-pangea/dnd'
import TaskCard from './TaskCard'

const COLUMN_LABELS = {
  todo: 'To do',
  inprogress: 'In progress',
  done: 'Done',
}

const COLUMN_COLORS = {
  todo: 'bg-blue-500',
  inprogress: 'bg-amber-500',
  done: 'bg-green-500',
}

function Column({ id, tasks, onDelete, onAddClick }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${COLUMN_COLORS[id]}`}></span>
          <span className="text-sm font-semibold text-gray-700">{COLUMN_LABELS[id]}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
          <button
            onClick={() => onAddClick(id)}
            className="text-gray-400 hover:text-gray-700 transition text-lg leading-none"
          >
            +
          </button>
        </div>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2 min-h-24 rounded-xl transition
              ${snapshot.isDraggingOver ? 'bg-gray-200' : ''}
            `}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                column={id}
                onDelete={(taskId) => onDelete(id, taskId)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column