import React,{useMemo,useState} from 'react'
import {createPortal} from 'react-dom'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {SortableContext,arrayMove} from '@dnd-kit/sortable'
import ColumnContainer from './ColumnContainer';
import { IconPlus } from '@tabler/icons-react';
import TaskCard from './TaskCard';

function KanbanBoards({state}){
  const defaultCols = state?.state?.columns?.map((col)=>({
    id:col?.id,
    title:col?.title,
  })) || []; 
  
  const defaultTasks  = state?.state?.tasks?.map((task)=>({
    id:task?.id,
    columnId:task?.columnId,
    content:task?.content,
  })) || [];

  const [columns,setColumns] = useState(defaultCols);
  const [tasks,setTasks]= useState(defaultTasks);
  const columnId = useMemo(()=> columns.map((col)=> col.id),[columns])
  const [activeColumn,setActiveColumn] = useState(null);
  const [activeTask,setActiveTask] = useState(null);

  const sensors=useSensors(
    useSensor(PointerSensor,{activationConstraint:{distance:10}})
  );

  return (
    <div className="mt-5 min-h-screen w-full text-white overflow-x-auto">
      <div className='mb-4 p-2 flex items-center'>
      <button
            onClick={() => createNewColumn()}
            className="flex h-[60px] min-w-[250px] md:min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 border-columnBackgroundColor bg-mainBackgroundColor p-4 ring-green-500 hover:ring-2"
          >
            <IconPlus />
            Add Column
          </button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
       <div className='flex flex-wrap gap-4 md:flex-nowrap md:overflow-x-auto pb-4'>
          <div className='flex flex-wrap gap-4 justify-start'>
            <SortableContext items={columnId}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
    </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function generateId(){ return Math.floor(Math.random()*10001); }
  function createTask(columnId){
    const newTask={ id:generateId(), columnId, content:`Task ${tasks.length+1}` };
    setTasks([...tasks,newTask]);
  }
  function deleteTask(id){
    setTasks(tasks.filter((task)=> task.id!==id));
  }
  function deleteColumn(id){
    setColumns(columns.filter((col) => col.id!== id ));
    setTasks(tasks.filter((task)=> task.columnId !== id));
  }
  function updateColumn(id,title){
    setColumns(columns.map((col)=>col.id === id ? { ...col, title } : col));
  }
  function updateTask(id,content){
    setTasks(tasks.map((task)=> task.id === id ? { ...task, content } : task));
  }
  function createNewColumn(){
    const newColumn={ id:generateId(), title:`Column ${columns.length+1}` };
    setColumns([...columns,newColumn]);
  }
  function onDragStart(event){
    if(event.active.data.current?.type === "Column") setActiveColumn(event.active.data.current.column);
    else if(event.active.data.current?.type === "Task") setActiveTask(event.active.data.current.task);
  }
  function onDragEnd(event){
    setActiveColumn(null); setActiveTask(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (isActiveAColumn) {
      setColumns((columns) => {
        const activeIndex = columns.findIndex((col) => col.id === active.id);
        const overIndex = columns.findIndex((col) => col.id === over.id);
        return arrayMove(columns, activeIndex, overIndex);
      });
    } else {
      const isActiveATask = active.data.current?.type === "Task";
      const isOverATask = over.data.current?.type === "Task";
      if (isActiveATask && isOverATask) {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === active.id);
          const overIndex = tasks.findIndex((t) => t.id === over.id);
          if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
            tasks[activeIndex].columnId = tasks[overIndex].columnId;
            return arrayMove(tasks, activeIndex, overIndex - 1);
          }
          return arrayMove(tasks, activeIndex, overIndex);
        });
      } else if (isActiveATask) {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t.id === active.id);
          tasks[activeIndex].columnId = over.id;
          return arrayMove(tasks, activeIndex, activeIndex);
        });
      }
    }
  }
  function onDragOver(event){
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        const overIndex = tasks.findIndex((t) => t.id === over.id);
        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }
        return arrayMove(tasks, activeIndex, overIndex);
      });
    } else if (isActiveATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === active.id);
        tasks[activeIndex].columnId = over.id;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

export default KanbanBoards;
