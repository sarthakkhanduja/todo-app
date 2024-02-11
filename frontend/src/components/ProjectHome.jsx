import Todo from "./Todo";

export function ProjectHome(props) {
    return(
        <div className="h-screen">
            <div className="w-full px-16 py-8 text-6xl font-bold">
                {props.projectName}
            </div>
            <div className="px-16">
                <div className="w-full bg-gray-200 rounded-full">
                    <div className="bg-blue-marguerite-400 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: props.projectProgress}}>{props.projectProgress}</div>
                </div>
            </div>
            <div className="px-16 mt-2 grid grid-cols-3 py-3 gap-4 h-5/6">
                <div className="col-span-1  bg-red-200 rounded-xl">
                    <div className="flex justify-center items-center h-8 border-b-2 border-blue-marguerite-300 font-bold">
                        Yet to Start
                    </div>
                    <div className="flex flex-col p-4 justify-center items-center">
                        <Todo title="Complete Cohort" description="Work on videos from week 8" />
                        <Todo title="Complete Cohort" description="Work on videos from week 8" />
                        <Todo title="Call parents" description="They're in Jaipur, so only call during the night. They're in Jaipur, so only call during the night. They're in Jaipur, so only call during the night. They're in Jaipur, so only call during the night." />
                    </div>
                </div>
                <div className="col-span-1 bg-yellow-100 rounded-xl">
                    <div className="flex justify-center items-center h-8 border-b-2 border-blue-marguerite-300 font-bold">
                        In Progress
                    </div>
                </div>
                <div className="col-span-1 bg-green-200 rounded-xl">
                    <div className="flex justify-center items-center h-8 border-b-2 border-blue-marguerite-300 font-bold">
                        Completed
                    </div>
                </div>
            </div>
        </div>
    )
}