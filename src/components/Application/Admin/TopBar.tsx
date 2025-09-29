"use client"
import React, {  } from 'react'
import {ModeToggle}from './ThemeSwitch'
import Userdropdown from './Userdropdown'
import { Button } from '@/components/ui/button'
import { RiMenu2Fill } from 'react-icons/ri'
import { useSidebar } from '@/components/ui/sidebar'
const TopBar = () => {
    const {toggleSidebar} = useSidebar()
    return (
        <div className='absolute w-full bg-white h-14 dark:bg-card border-2 flex justify-between top-0 left-0 z-30 items-center '>
            <div className='px-4'>search component</div>
            <div className='flex items-center gap-4 pe-10'>
                <ModeToggle />
                <Userdropdown />
                <Button type='button' onClick={toggleSidebar} size="icon" className='md:hidden'>
                    <RiMenu2Fill/>
                </Button> 
            </div>
        </div>
    )
}

export default TopBar
