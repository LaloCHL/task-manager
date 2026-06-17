import { useState } from 'react'

const TAGS = ['UI', 'Backend', 'Docs', 'Bug', 'Setup', 'DevOps', 'Other']
const COLUMNS = { todo: 'To do', inprogress: 'In progress', done: 'Done' }

function AddTaskModal({ defaultColumn, onAdd, onClose }) {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('UI')
  const [date, setDate] = useState('')
  const [column, setColumn] = useState(defaultColumn)

  function handleSubmit() {
    if (!title.trim()) return
    onAdd(column, { title: title.trim(), tag, date })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-gray-800">New task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">✕</button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Title</label>
            <input
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="What needs to be done?"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Column</label>
            <select
              value={column}
              onChange={e => setColumn(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
            >
              {Object.entries(COLUMNS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Tag</label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map(t => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`text-xs px-3 py-1 rounded-full border transition
                    ${tag === t
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-200 text-gray-600 hover:border-blue-300'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Due date (optional)</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 transition"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 hover:bg-blue-400 text-white py-2 rounded-lg text-sm font-medium transition"
          >
            Add task
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTaskModal