import { Home, Folder, MessageSquare, LogOut, FolderCheck, FolderX, BookPlus, FolderPlus, BookOpen, ShieldPlus } from "lucide-react"
import { Outlet } from "react-router-dom"
import { useContext} from "react";
import AuthContext from "@/context/AuthProvider";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import canopusLogo from "@/assets/CanopusBrand.svg"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


export function Sidebar() {

    const authContext = useContext(AuthContext)
    if (authContext === undefined) {
        return null
    }
    const { user, logoutUser } = authContext;

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex justify-center items-center p-4">
                        <img
                            alt="Canopus Logo"
                            src={canopusLogo}
                            style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: "contain",
                            }}
                                     
                        />
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        {user?.role === "VOLUNTARIO" && (
                            <Volunteer />
                        )}
                        {user?.role === "REP_ESCOLA" && (
                            <SchoolRep />
                        )}
                        {user?.role === "EMBAIXADOR"  && (
                            <Moderator />
                        )}
                        {user?.role === "ADMINISTRADOR" && (
                            <Admin />
                        )}
                    </div>
                    <div className="border-t mt-auto p-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="flex items-center gap-2 justify-items-start">
                                    <Avatar>
                                        <AvatarImage src={user?.avatar as string} />
                                        <AvatarFallback>{user?.fullName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {user?.fullName}
                                        <br />
                                        {user?.role.charAt(0) as string + user?.role.slice(1).toLowerCase() as string}
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logoutUser}>
                                    <LogOut />
                                    Sair
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                    </div>
                </div>
            </div>
            <Outlet />
            {/* <div className="flex flex-col">
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">Hello World</h1>
                </main>
            </div> */}
        </div>
    )
}

function Volunteer() {
    return (
        <nav className="grid items-start px-4 text-sm font-medium">
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/"
            >
                <Home className="h-4 w-4" />
                Início
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/projs/active' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href='/projs/active'
            >   
                <Folder className="h-4 w-4" />
                Projetos Ativos
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/chat' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/chat"
            >   
                <MessageSquare className="h-4 w-4" />
                Chat
            </a>
            
        </nav>
    )
}

function SchoolRep() {
    return (
        <nav className="grid items-start px-4 text-sm font-medium">
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/"
            >
                <Home className="h-4 w-4" />
                Início
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/projs/active' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href='/projs/active'
            >   
                <Folder className="h-4 w-4" />
                Projetos Ativos
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/TODO:MUDAR' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="#"
            >   
                <FolderCheck className="h-4 w-4" />
                Projetos Finalizados
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/TODO:MUDAR' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="#"
            >   
                <FolderX className="h-4 w-4" />
                Projetos Descartados
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/chat' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/chat"
            >   
                <MessageSquare className="h-4 w-4" />
                Chat
            </a>
            
        </nav>
    )
}

function Moderator() {
    return (
        <nav className="grid items-start px-4 text-sm font-medium">
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/"
            >
                <BookPlus className="h-4 w-4" />
                Cadastrar Escola
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/TODO:MUDAR' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="#"
            >   
                <FolderPlus className="h-4 w-4" />
                Cadastrar Projeto
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/projs/all' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/projs/all"
            >   
                <Folder className="h-4 w-4" />
                Projetos
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/school/all' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/school/all"
            >   
                <BookOpen className="h-4 w-4" />
                Escolas
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/chat' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/chat"
            >   
                <MessageSquare className="h-4 w-4" />
                Chat
            </a>
            
        </nav>
    )
}

function Admin() {
    return (
        <nav className="grid items-start px-4 text-sm font-medium">
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/"
            >
                <BookPlus className="h-4 w-4" />
                Cadastrar Escola
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/TODO:MUDAR' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="#"
            >   
                <FolderPlus className="h-4 w-4" />
                Cadastrar Projeto
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/projs/all' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/projs/all"
            >   
                <Folder className="h-4 w-4" />
                Projetos
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/school/all' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/school/all"
            >   
                <BookOpen className="h-4 w-4" />
                Escolas
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/chat' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/chat"
            >   
                <MessageSquare className="h-4 w-4" />
                Chat
            </a>
            <a
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${window.location.pathname === '/admin' ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'} hover:text-gray-900 dark:hover:text-gray-50`}
                href="/admin"
            >   
                <ShieldPlus className="h-4 w-4" />
                Painel Administrativo
            </a>
            
        </nav>
    )
}