import { Route, Routes } from "react-router-dom";
import DashBoard from "./dashboard";
import DialyNote from "./dailyNote";
import DisplayHeader from "@/components/commons/DisplayHeader";
import useCurrentDate from "@/hooks/useCurrentTime";

export default function Home() {
  const { dateAsString } = useCurrentDate()

  return (
    <>
      <DisplayHeader title="Dashboard" description={"Date and Time: " + dateAsString} className='flex-none bg-background p-3' />
      <div className="md:flex md:flex-row md:grow md:max-h-full md:divide-x md:overflow-y-auto">
        <Routes>
          <Route path="/dashboard/note" element={<DialyNote />} />
          <Route path="/" element={<DashBoard />} />
        </Routes>
      </div>
    </>

  )
}

