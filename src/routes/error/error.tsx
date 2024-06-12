import { Link } from "react-router-dom";

export default function ErrorPage(){
    return <article className="prose w-full h-[500px] flex justify-center max-w-full">
        <div className="p-10 rounded-lg border m-10">
            <div className="bg-black rounded-lg p-1 mb-4 flex flex-row justify-start items-start w-12 h-12">
                <img className="h-12 w-12 m-0" src="/app-icon.svg" />
            </div>
            <h1 className="mb-0">404</h1>
            <p className="my-1">The page that you are looking for is not available...</p>
            <Link to={"/"} >Go to home</Link>
        </div>
    </article>
}