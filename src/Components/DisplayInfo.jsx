import { IconCircleDashedCheck, IconHourglassHigh, IconUserScan } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import Metricscard from './Metricscard';
import { useStateContext } from '../context/Index';
import { usePrivy } from "@privy-io/react-auth";

//here only all the elements that are required to be displayed in the home page will be displayed
const DisplayInfo = () => {
  const Navigate = useNavigate();
  //this user object contains the email that we will be using for the fetchuserbyemail function from usecontext
  const {user}=usePrivy(); 
  const {fetchUserRecords,records,fetchUserByEmail}= useStateContext();
    const [metrics,setMetrics] = useState({
        totalFolders:0,
        aipersonalizedTreatment:0,
        totalScreenings:0,
        completedScreenings:0,
        PendingScreenings:0,
        OverdueScreenings:0 
    });
    useEffect(()=>{
      if(user){
        fetchUserByEmail(user.email.address).then(()=>{
          const totalFolders=records.length;
          let aipersonalizedTreatment=0;
          let totalScreenings=0;
          let completedScreenings=0;
          let PendingScreenings=0;
          let OverdueScreenings=0;

          records.forEach((record)=>{
            if(record.kanbanRecords){
              try {
                const kanban = JSON.parse(record.kanbanRecords);
                //if the result is coming from the kanban column means the result is set to 1 otherwise 0
                aipersonalizedTreatment += kanban.columns.some((column)=> column.title === "AI Personalized Treatment") ? 1:0;
                totalScreenings += kanban.tasks.length;
                completedScreenings += kanban.tasks.filter((task)=> task.columnId === "Done").length;
                PendingScreenings += kanban.tasks.filter((task)=> task.columnId === "doing").length;
                OverdueScreenings += kanban.tasks.filter((task)=> task.columnId === "overdue").length;

                
              } catch (error) {
                console.error('Failed to parse Kanban Records',error);
                
              }
            }
          });
          setMetrics({
            totalFolders,
            aipersonalizedTreatment,
            totalScreenings,
            completedScreenings,
            OverdueScreenings,
            PendingScreenings,
          });
        })
      }
    

  },[user,fetchUserRecords,records]) 
    //create data for each metric card and render them with the metriccard component
  const metricsData=[
    {
      title:'Specialist Appointments Pending',
      subtitle:'View',
      value:metrics.PendingScreenings,
      icon:IconHourglassHigh,
      onClick:()=> Navigate('appointments/pending')
    },
    {
      title:'Treatment Progress Update',
      subtitle:'View',
      value:`${metrics.completedScreenings} of ${metrics.totalScreenings}`,
      icon:IconCircleDashedCheck,
      onClick:()=> Navigate('appointments/progress')
    },
    {
      title:'Total Folders',
      subtitle:'View',
      value:metrics.totalFolders,
      icon:IconCircleDashedCheck,
      onClick:()=> Navigate('/folders')
    },
    {
      title:'Total Screenings',
      subtitle:'View',
      value:metrics.totalScreenings,
      icon:IconUserScan,
      onClick:()=> Navigate('/screenings')
    },
    {
      title:'Completed Screenings',
      subtitle:'View',
      value:metrics.completedScreenings,
      icon:IconUserScan,
      onClick:()=> Navigate('/screenings/completed')
    },
    {
      title:'Pending Screenings',
      subtitle:'View',
      value:metrics.PendingScreenings,
      icon:IconUserScan,
      onClick:()=> Navigate('/screenings/pending')
    },
    {
      title:'To Do Screenings',
      subtitle:'View',
      value:metrics.OverdueScreenings,
      icon:IconUserScan,
      onClick:()=> Navigate('/screenings/overdue')
    }



  ];
  return (
    //main div containing two divs as two sections
    <div className="p-7 space-y-8">
  <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] p-2">
    {metricsData.slice(0, 2).map((metric) => (
      <Metricscard key={metric.title} {...metric} />
    ))}
  </div>

  <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] p-2">
    {metricsData.slice(2).map((metric) => (
      <Metricscard key={metric.title} {...metric} />
    ))}
  </div>
</div>

  )
}

export default DisplayInfo