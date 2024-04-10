import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './global.css'
import 'non.geist'

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Login from './routes/login/login.tsx';
import PublishArticle from './routes/publish/publishArticle.tsx';
import ErrorPage from './routes/error/error.tsx';
import Setup from './routes/setup/Setup.tsx'


const router = createBrowserRouter([
  {
    path: "/setup",
    element: <Setup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/publish/*",
    element: <PublishArticle />,
  },
  {
    path: "/home/*",
    element: <App />,
  },
  {
    path: "/",
    element: <Redirect />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home")
  })

  return null;
}
