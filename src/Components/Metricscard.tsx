import React from 'react'
import {IconChevronRight} from '@tabler/icons-react'

//cards that will be displayed in the home page
const Metricscard = ({
    title,
    subtitle,
    value,
    icon:Icon,onClick}) => {
  return (
    <div className='flex flex-col rounded-xl border bg-white shadow-sm
    dark:border-neutral-800 dark:bg-[#13131a]'>
        {/**upper section of the card */}
        <div className='flex justify-between gap-x-5 p-6 md:p-5'>
            <div>
                <p className='text-xs uppercase tracking-wide text-neutral-500'>
                    {title}
                </p>
                {/**container for the value */}
                <div className='mt-9 flex items-center gap-x-6'>
                    <h3
                    className='text-xl font-medium text-neutral-200 sm:text-2xl'>
                        {value}
                    </h3>
                </div>
            </div>
        {/**Icon container */}
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1c1c24] shadow-inner shadow-green-500/10 dark:bg-[#1c1c24]">
  <Icon size={24} className="text-green-500" />
</div>

        </div> 
        <a href="#"
         onClick={onClick}
         className='inline-flex items-center justify-between rounded-b-xl border-t px-4 py-3 text-sm text-gray-600 md:px-5 border-neutral-800 hover:bg-neutral-800'>
            {subtitle}
            <IconChevronRight/>
        </a>
    </div>
  )
}

export default Metricscard