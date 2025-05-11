import React,{useState} from 'react'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities"
import { IconTrash } from '@tabler/icons-react'

function TaskCard({task,deleteTask,updateTask}){
    const [mouseIsOver,setMouseIsOver] = useState(false);
    const [editMode,setEditMode] = useState(true);

    const {
        setNodeRef,//reference the task card dom node
        attributes,
        listeners,//event listener for sortable element
        transform,//css property
        transition,//css property
        isDragging //if the task card is dragged or not
        }= 
        useSortable({id:task.id,data:{
        type:'Task',
        task,
    },
    disabled:editMode,
});
    //defining the styles for the task card once these are created in task card using useSortable
    const style={
        transition,
        transform:CSS.Transform.toString(transform),
    };
    const toggleEditMode=()=>{
        setEditMode((prev)=> !prev)
        setMouseIsOver(false);
    }
    //going to return a placeholder if the task card is been dragged
    if(isDragging){
        return (
            <div
            ref={setNodeRef} //stores the element without changing it even if any dependencies change or even if its rendered 
            style={style}
            className='relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl border-2 border-green-500 bg-mainBackgroundColor p-3 text-left opacity-30'
            />
        );
    }

    //render a task card in edit mode
    if(editMode){
        return(
            <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-mainBackgroundColor p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-green-500">
                <textarea
                className="h-[90%] w-full resize-none rounded border-none bg-transparent text-white focus:outline-none"
                value={task.content}
                autoFocus
                placeholder='Task Content Here'
                onBlur={toggleEditMode}//if they move out of thetext area then move the edit mode back to view mode by the toggleeditmode function
                onKeyDown={(e)=>{
                    if(e.key === 'Enter' && e.shiftKey){
                        toggleEditMode();
                    }
                }}//when pressing this key your content in task card will be saved
                onChange={(e)=>updateTask(task.id,e.target.value)} //any change in the task content will be updated in the task card using the update task function
                ></textarea>
            </div>
        )
    }
    return(
        <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEditMode}
        className='task relative flex h-[100px] min-h-[100px] cursor-grab items-center rounded-xl bg-[#13131a] p-2.5 text-left hover:ring-2 hover:ring-inset hover:ring-green-500'
        onMouseEnter={()=> setMouseIsOver(true)}
        onMouseLeave={()=> setMouseIsOver(false)}
        >
            <p className='my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap'>
                {task.content}
            </p>

            {mouseIsOver && (
                <button type='button'
                onClick={()=>{
                    deleteTask(task.id);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-columnBackgroundColor stroke-white p-2 opacity-60 hover:opacity-100"
                >
                    <IconTrash/>

                </button>
            )}

        </div>
    );
}

export default TaskCard