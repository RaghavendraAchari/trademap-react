import tabs from '@/constants/tabNames';
import SettingsWindow from '../settingsWindow/SettingsWindow';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { UserCircle2Icon } from 'lucide-react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



export default function SideBar() {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    return <header className='mx-auto bg-background divide-y text-center flex flex-col justify-start h-full space-y-2 '>
        <AppLogo />

        <nav className='text-left text-sm flex flex-col justify-between h-full px-2' >
            <div>
                <h2 className='border-b font-semibold text-sm mt-7 opacity-80 ml-12'>INTRADAY</h2>
                <ul className='mt-2'>
                {
                        tabs.filter(tab => tab.type === "INTRADAY").map(tab => {
                            return <Link to={tab.url} key={tab.url}>
                                <li className={"flex flex-row text-main font-semibold justify-start items-center space-x-2 p-3 border-l-2  hover:bg-main-fade group " + (pathname.includes(tab.url) ? 'bg-main-fade border-main selected' : "border-white")} >
                                    <span className='group-hover:bg-fuchsia-100 group-hover:rounded-full group-[.selected]:bg-fuchsia-100 group-[.selected]:rounded-full'>{tab.icon}</span>
                                    <span>{tab.tabName}</span></li>
                            </Link>
                        })
                    }
                </ul>
                <h2 className='border-b font-semibold text-sm mt-5 opacity-80 ml-12'>SWING</h2>
                <ul className='mt-2'>
                    {
                        tabs.filter(tab => tab.type === "SWING").map(tab => {
                            return <Link to={tab.url} key={tab.url}>
                                <li className={"flex flex-row text-main font-semibold justify-start items-center space-x-2 p-3 border-l-2  hover:bg-main-fade group " + (pathname.includes(tab.url) ? 'bg-main-fade border-main selected' : "border-white")} >
                                    <span className='group-hover:bg-fuchsia-100 group-hover:rounded-full group-[.selected]:bg-fuchsia-100 group-[.selected]:rounded-full'>{tab.icon}</span>
                                    <span>{tab.tabName}</span></li>
                            </Link>
                        })
                    }
                </ul>
                <h2 className='border-b font-semibold text-sm mt-5 opacity-80 ml-12'>STUDY</h2>
                <ul className='mt-2'>
                    {
                        tabs.filter(tab => tab.type === "STUDY").map(tab => {
                        return <Link to={tab.url} key={tab.url}>
                            <li className={"flex flex-row text-main font-semibold justify-start items-center space-x-2 p-3 border-l-2  hover:bg-main-fade group " + (pathname.includes(tab.url) ? 'bg-main-fade border-main selected' : "border-white")} >
                                <span className='group-hover:bg-fuchsia-100 group-hover:rounded-full group-[.selected]:bg-fuchsia-100 group-[.selected]:rounded-full'>{tab.icon}</span>
                                <span>{tab.tabName}</span></li>
                        </Link>
                    })
                }
            </ul>
            </div>
            <div >
                <SettingsWindow />
                <AlertDialog>
                    <AlertDialogTrigger asChild><Button className='space-x-2' variant={'ghost'} onClick={() => { }}><UserCircle2Icon /><span>Logout</span></Button></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure want to logout?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You will be logged out this app.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                sessionStorage.clear();
                                navigate("/login")
                            }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/*  */}
            </div>
        </nav>
    </header>
}

function AppLogo() {
    return <div className='flex flex-row space-x-3 justify-start items-center pb-6'>
        <img className='h-12 pl-14 m-0 pt-1' src="/app-icon-dark.svg" alt="app-icon" />
        <h1 className='text-3xl font-bold text-start m-0'>Trade Map</h1>
    </div>
}

