import { Sidebar, SidebarContent,  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import Image from "next/image"
import Logobalck from "../../../../public/assets/images/logo-black.png"
import logowhite from '../../../../public/assets/images/logo-white.png'
import { Button } from "@/components/ui/button"
import {IoMdClose} from "react-icons/io"
import admindashboardSideMenu from "@/lib/Admindashboard"
import Link from "next/link"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { LuChevronDown } from "react-icons/lu"

export function AppSidebar() {
  return (
    <Sidebar className="border-red-900 z-50">
        <SidebarHeader className="border-b h-14 p-0 ">
            <div className="flex relative align-center ">
                <Image src={Logobalck} height={50} width={100} alt="logoblack" className="block dark:hidden"/>
                <Image src={logowhite} height={50} width={100} alt="logowhite" className="dark:block hidden"/>
                <Button type="button" size="icon" className="absolute  right-0 md:hidden">
                    <IoMdClose/>
                </Button>
            </div>
        </SidebarHeader>

      <SidebarContent className="px-1flex gap-3">
       <SidebarMenu>
        {
          admindashboardSideMenu.map((item,index)=>(
            <Collapsible key={index} className="group/collopsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                <SidebarMenuButton  asChild className="px-3 py-4 font-bold">
                 <Link href={item.route}>
                  <item.icon/>
                  {item.title}
                  {
                    item.subMenu && item.subMenu.length>0 &&
                    <LuChevronDown className="group-data-[state=open]:collopsible:rotate:90"/>
                  }
                 </Link>
                </SidebarMenuButton>
                </CollapsibleTrigger>
                {
                  item.subMenu &&item.subMenu.length>0 &&
                  <CollapsibleContent>
                  <SidebarMenuSub>
                    {
                      item.subMenu.map((subitem,index)=>(
                        <SidebarMenuSubItem key={index}>
                          <SidebarMenuSubButton className="px-3 py4 font-semibold">
                            <Link href={subitem.route}>
                            {subitem.title}
                            </Link>
                          </SidebarMenuSubButton>

                        </SidebarMenuSubItem>
                      ))
                    }
                  </SidebarMenuSub>
                  </CollapsibleContent>
                }
              </SidebarMenuItem>
            </Collapsible>
          ))
        }
       </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}