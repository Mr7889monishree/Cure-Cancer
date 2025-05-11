import React from 'react'
import { useLocation } from 'react-router-dom'
import KanbanBoards from '../Components/KanbanBoards';
 
const ScreeningSchedule = () => {
  const state = useLocation();
  return (
    <div className='w-full'>
      <KanbanBoards state={state} />
    </div>
  )
}

export default ScreeningSchedule;
