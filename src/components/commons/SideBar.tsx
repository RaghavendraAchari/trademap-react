import tabs from '@/constants/tabNames';
import SettingsWindow from '../settingsWindow/SettingsWindow';
import { Link, useLocation } from 'react-router-dom';




export default function SideBar() {
    const pathname = useLocation().pathname;

    return <header className='mx-auto bg-main py-4 text-center flex flex-col justify-start text-white h-full space-y-2'>
        <div className='flex flex-col space-y-3 justify-start items-start'>
            <img className='h-12 pl-11' src="/app-icon.svg" alt="app-icon" />
            <h1 className='text-2xl font-medium text-start pl-11'>Trade Map</h1>
        </div>

        <nav className='text-left text-sm flex flex-col justify-between h-full' >
            <div>
                <h2 className='border-b font-light text-sm mt-10 opacity-80'>INTRADAY</h2>
            <ul className='mt-5'>
                {
                        tabs.filter(tab => tab.type === "INTRADAY").map(tab => {
                            return <Link to={tab.url} key={tab.url}>
                                <li className={"flex flex-row justify-start items-center space-x-2 p-3 border-l-2  hover:bg-main-fade " + (pathname === tab.url ? 'bg-main-fade border-white' : "border-main")} >
                                    <span>{tab.icon}</span>
                                    <span>{tab.tabName}</span></li>
                            </Link>
                        })
                    }
                </ul>
                <h2 className='border-b font-light text-sm mt-2 opacity-80'>SWING</h2>
                <ul className='mt-5'>
                    {
                        tabs.filter(tab => tab.type === "SWING").map(tab => {
                            return <Link to={tab.url} key={tab.url}>
                                <li className={"flex flex-row justify-start items-center space-x-2 p-3 border-l-2  hover:bg-main-fade " + (pathname === tab.url ? 'bg-main-fade border-white' : "border-main")} >
                                    <span>{tab.icon}</span>
                                    <span>{tab.tabName}</span></li>
                            </Link>
                        })
                    }
                </ul>
                <h2 className='border-b font-light text-sm mt-2 opacity-80'>STUDY</h2>
                <ul className='mt-5'>
                    {
                        tabs.filter(tab => tab.type === undefined).map(tab => {
                        return <Link to={tab.url} key={tab.url}>
                            <li className={"flex flex-row justify-start items-center space-x-2 p-3 border-l-2  hover:bg-main-fade " + (pathname === tab.url ? 'bg-main-fade border-white' : "border-main")} >
                                <span>{tab.icon}</span>
                                <span>{tab.tabName}</span></li>
                        </Link>
                    })
                }
            </ul>
            </div>
            <SettingsWindow />
        </nav>
    </header>
}

