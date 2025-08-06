// src\app\layout.tsx
import { Sidebarnav } from '@/components/ui/sidebar-nav'
import './globals.css'
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar'

export const metadata = {

  title:  "Admin NutriPlan",
  description : " Panel de administración de NutriPlan App - Android"

}

export default function RootLayout  ({children} : { children: React.ReactNode})
{
  return (
    <html lang="es">
      <body className='flex h-screen bg-screen-100'>
        {/* Side Bar*/}
        <SidebarProvider>

          <Sidebar>
            <Sidebarnav/>
          </Sidebar>

          <main className='flex-1 p-6 overflow-auto'>
          {children}
          </main>
          
        </SidebarProvider>

        
      </body>
    </html>
  )


}
