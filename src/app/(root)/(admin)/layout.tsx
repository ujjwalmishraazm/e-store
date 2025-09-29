import { AppSidebar } from "@/components/Application/Admin/AppsideBar";
import TopBar from "@/components/Application/Admin/TopBar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Adminlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen ">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange >
      <SidebarProvider>
        <AppSidebar />

        <main className="w-[calc(100vw-16rem)] ">
          <div className="min-h-[calc(100vh-40px)] relative border-2 border-green-800  ">
            <TopBar />
            <div className="mt-14 p-2">
              {children}
            </div>
          </div>
          <div className="h-[40px] flex justify-center items-center mx-auto w-full  bg-gray-500 dark:bg-background">
            <p> © 2025 Ujjwal Mishra. All Right Reserved</p>
          </div>
        </main>
      </SidebarProvider>
      </ThemeProvider>

    </div>
  );
}
