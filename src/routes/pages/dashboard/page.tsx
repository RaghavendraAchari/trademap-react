import { Route, Routes } from "react-router-dom";
import DashBoard from "./dashboard";
import DialyNote from "./dailyNote";

export default function Home() {
  return (
    <div className="md:flex md:flex-row md:grow md:max-h-full md:divide-x md:overflow-y-auto">
      <Routes>
        <Route path="/dashboard/note" element={<DialyNote />} />
        <Route path="/" element={<DashBoard />} />
      </Routes>
    </div>
  )
}

