// src\components\ui\sidebar-nav.tsx
'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarRoutes } from "@/config/sidebar-routes";

import{
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar"

export function Sidebarnav() {
    const pathname = usePathname()

    return (

        <SidebarContent>
            <SidebarGroup>
                <SidebarMenu>
                    {sidebarRoutes.map((route)=> (
                        <SidebarMenuItem key={route.href} >
                            <Link href={route.href} passHref>
                            <SidebarMenuButton 
                                asChild
                                isActive = {pathname === route.href}
                            >
                                <span>
                                    <route.icon className="mr-2"/>
                                    <span> {route.label} </span>
                                </span>
                            </SidebarMenuButton>

                            </Link>

                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
    )
}