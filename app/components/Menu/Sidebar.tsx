"use client"
import { Archive, Calendar, Clipboard, Heart, Layout, LucideIcon, Menu, SlidersHorizontal, Ticket, User } from 'lucide-react'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'


interface SidebarLinkProps {
    href: string, 
    icon: LucideIcon,
    label: string,
    isCollapsed: boolean,
}
const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed,
} : SidebarLinkProps) => {
    const pathName = usePathname();
    const isActive = pathName === href || (pathName === "/" && href === "/dashboard");
    return (
        <Link href={href}>
            <div className={`cursor-pointer flex items-center ${isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"}
            hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 text white": ""}
            `}>
                <Icon className="w-6 h-6 !text-gray-700" />  {/* ! <--- sets important tag */}
                <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}

const Sidebar = () => {
    
    const sidebarClassNames = ` flex flex-col ${false ? "w-0 md:w-16" : "w-72 md:w-64"} 
    bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`

    return (
    <div className={sidebarClassNames}>
        <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${false ? "px-5" : "px-8"}`}>
        <div className="w-9 h-9">
                  <Image 
                  alt="inventorylogo-image"
                  width={100}
                  height={100}
                  className="rounded"
                  src={"log"}
                />
              </div>
            <h1 className={`font-extrabold text-lg ${false ? "hidden" : "block"}`}> {/* Hides Logo at larger sides and specific lengths */}
                Company Name
            </h1>
            <button className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100" 
            onClick={()=> {}}>
                <Menu className='w-4 h-4'/>
            </button>
        </div>
        {/* LINKS */}
        <div className="flex-grow mt-8">
            {/* links here */}
            <SidebarLink 
                href="/dashboard" 
                icon={Layout} 
                label="Dashboard" 
                isCollapsed={false}
            />
            
        </div>
        {/* FOOTER */}
        <div className={`${false ? "hidden" : "block"} mb-10`}>
        <p>FOOTER</p>
        </div>

    </div>
  )
}

export default Sidebar