import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ProjectHome } from "./ProjectHome";
import { Sidebar } from "./Sidebar";
import bgImg from "../assets/ooorganize.svg";
import ProjectModal from "./ProjectModal";
import { useNavigate } from 'react-router-dom';
import { useCallback } from "react";


export function UserHome() {
    const [name, setName] = useState("User");
    const [loading, setLoading] = useState(true);
    const [numberOfProjects, setNumberOfProjects] = useState(0);
    const [projectArray, setProjectArray] = useState([]);
    const [modal, setModal] = useState(false); // Project Modal
    const [projectTitle, setProjectTitle] = useState(""); // This is for the Modal, NOT for the title at the top
    const [currentProject, setCurrentProject] = useState(null);

    // console.log("On mounting the component, value of projectTitle: " + projectTitle);

    const navigate = useNavigate();

    const toggleModal = () => {
        setModal(!modal);
    }

    const fetchName = useCallback(async () => {
        const safeToken = localStorage.getItem('token');
        if(safeToken) {
            const response = await axios.get('http://localhost:3001/name', {
                headers: {
                    "Authorization": `${safeToken}`,
                }
            });
            // console.log(response.data.name);
            let name = response.data.name.toString();
            let firstName = name.split(" ")[0];
            // console.log(firstName);
            setName(firstName);
        } else {
            navigate("/signin");
        }
    });

    const fetchProjects = useCallback(async () => {
        // console.log("On fetching projects, value of projectTitle: " + projectTitle);
        try {
            const safeToken = localStorage.getItem('token');
            if(safeToken) {
                const response = await axios.get('http://localhost:3001/projects', {
                    headers: {
                        "Authorization": `${safeToken}`,
                    }
                });
                console.log(response.data);
                setProjectArray(response.data["allProjects"]);
                setNumberOfProjects(response.data.allProjects.length);
                setLoading(false);
            } else {
                navigate("/signin");
            }
            
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }, [navigate]);

    useEffect(() => {
        fetchProjects();
        fetchName();
    }, []);

    const addProject = useCallback(async () => {
        console.log("Backend call for adding project...");
        console.log("Project Title: " + projectTitle);
        try {
            let safeToken = localStorage.getItem('token');
            const response = await axios.post("http://localhost:3001/project", {
                title: projectTitle,
            }, 
            {
                headers: {
                    "Authorization": `${safeToken}`
                }
            });
    
            console.log(response);
            alert("Project Created");
            setProjectTitle("");
            setModal(false);
    
            // Call fetchProjects to update the project list after adding a new project
            fetchProjects();
        } catch(e) {
            console.error("Error adding project:", e);
        }
    }, [projectTitle, fetchProjects, setProjectTitle, setModal]);
    
    
    
    return(
        <div className="w-full min-h-screen flex flex-col overflow-y-hidden">
            <div className="grid grid-cols-6 min-h-screen">
                <div className="col-span-1">
                    <Sidebar projectArray={projectArray} toggle={toggleModal} />
                </div>
                <div className="col-span-5 relative z-10">
                {loading ? (
                        <div>Loading...</div>
                    ) : numberOfProjects === 0 ? (
                        <div>
                            <BgImage opacity="0.05" />
                            <ProjectModal toggle={toggleModal} modal={modal} projectTitle={projectTitle} setProjectTitle={setProjectTitle} addProject={addProject}/>
                            <div className="z-10">
                                <Waves />
                                <div className="w-full px-16 py-8 text-6xl font-bold mb-16">
                                    Hi<span className="text-blue-marguerite-400">, </span> {name}
                                </div>
                                <div className="w-full flex flex-col items-center justify-center px-16 py-32">
                                    <p className="text-gray-700 my-8 font-semibold text-xl">You don't seem to have any projects running, yet!</p>
                                    <Button label="Create Project" toggle={toggleModal}/>
                                </div>
                            </div>
                        </div>
                        
                    ) : (
                        <div>
                            <BgImage opacity="0.1" />
                            <ProjectModal toggle={toggleModal} modal={modal} projectTitle={projectTitle} setProjectTitle={setProjectTitle} addProject={addProject}/>
                            <div className="z-10">
                                <Waves />
                                <div className="w-full px-16 py-8 text-6xl font-bold mb-16">
                                    Hi<span className="text-blue-marguerite-400">, </span> {name}
                                </div>
                                <div className="w-full flex flex-col items-center justify-center px-16 py-32">
                                    <p className="text-gray-700 my-8 font-semibold text-xl">To get started, choose a project from the sidebar!</p>
                                </div>
                                {currentProject && <ProjectHome projectName="Cohort 2.0" projectProgress="65%" />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function Waves() {
    return (
        <div className="absolute bottom-0 w-full -z-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#6c63ff" fillOpacity="1" d="M0,192L24,186.7C48,181,96,171,144,192C192,213,240,267,288,256C336,245,384,171,432,165.3C480,160,528,224,576,229.3C624,235,672,181,720,138.7C768,96,816,64,864,74.7C912,85,960,139,1008,149.3C1056,160,1104,128,1152,133.3C1200,139,1248,181,1296,202.7C1344,224,1392,224,1416,224L1440,224L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
            </svg>
        </div>
    )
}

function Button(props) {
    return (
        <button className="cursor-pointer relative inline-flex items-center pr-12 pl-10 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50" 
        onClick={props.toggle}
        >
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg className="w-5 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative">{props.label}</span>
        </button>
    );
}


function BgImage(props) {
    return (
        <div className="absolute inset-0 -z-10" style={{opacity: props.opacity}}>
            <img className="w-full h-full object-cover" src={bgImg} alt="Background" />
        </div>
    )
}