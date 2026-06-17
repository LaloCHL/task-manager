import { Draggable } from '@hello-pangea/dnd'

const TAG_COLORS = {
  UI:      'bg-blue-100 text-blue-700',
  Docs:    'bg-green-100 text-green-700',
  Backend: 'bg-purple-100 text-purple-700',
  Bug:     'bg-red-100 text-red-700',
  Setup:   'bg-green-100 text-green-700',
  DevOps:  'bg-amber-100 text-amber-700',
  Other:   'bg-gray-100 text-gray-600',
}

function TaskCard({ task, index, column, onDelete }) {
  const tagColor = TAG_COLORS[task.tag] || TAG_COLORS.Other

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white border border-gray-200 rounded-xl p-3 group transition
            ${snapshot.isDragging ? 'shadow-lg rotate-1 scale-105' : ''}
            ${column === 'done' ? 'opacity-60' : ''}
          `}
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className={`text-sm font-medium text-gray-800 ${column === 'done' ? 'line-through' : ''}`}>
              {task.title}
            </p>
            <button
              onClick={() => onDelete(task.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition text-xs flex-shrink-0"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor}`}>
              {task.tag}
            </span>
            {task.date && (
              <span className="text-xs text-gray-400">
                {new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard