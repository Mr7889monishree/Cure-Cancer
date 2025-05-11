import React, { useMemo, useState } from 'react';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';
import { IconPlus, IconTrash } from '@tabler/icons-react';

function ColumnContainer({ column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask }) {
  const [editMode, setEditMode] = useState(false);

  const taskId = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-green-500 bg-mainBackgroundColor p-3 text-left opacity-30"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col h-[500px] max-h-[500px] min-w-[300px] w-[300px] flex-shrink-0 rounded-xl bg-[#1c1c24] shadow-md"
    >
      {/* Column header with editable title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="text-md m-2 flex h-[60px] cursor-grab items-center justify-between rounded-xl bg-[#13131a] p-3 font-bold"
      >
        <div className="flex gap-2 w-full">
          {!editMode && <span className="truncate">{column.title}</span>}
          {editMode && (
            <input
              type="text"
              className="w-full rounded border bg-black px-2 outline-none focus:border-green-500"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteColumn(column.id);
          }}
          className="rounded stroke-gray-500 px-1 py-2 hover:bg-columnBackgroundColor hover:stroke-white"
        >
          <IconTrash />
        </button>
      </div>

      {/* Task card area */}
      <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
        <SortableContext items={taskId}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>

      {/* Add task button */}
      <button
        className="mt-2 flex items-center justify-center gap-2 rounded-md border-2 border-columnBackgroundColor p-3 hover:bg-mainBackgroundColor hover:text-green-500 active:bg-black"
        onClick={() => createTask(column.id)}
      >
        <IconPlus />
        Add Task
      </button>
    </div>
  );
}

export default ColumnContainer;
