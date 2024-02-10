import logo from "../assets/getToWork.png";
import React, { useState } from "react";
import Wave from 'react-wavify';
import { Link } from "react-router-dom";
import axios from 'axios';


export function UserHome() {
    return(
        <div className="w-full min-h-screen flex flex-col overflow-y-hidden">
            <div className="grid grid-cols-6 min-h-screen">
                <div className="col-span-1">
                    <Sidebar />
                </div>
                <div className="col-span-5 relative z-10">
                    <Waves />
                    <div className="w-full px-16 py-8 text-6xl font-bold mb-8">
                        Hi<span className="text-blue-marguerite-400">, </span> Sarthak
                    </div>
                    <div className="w-full flex flex-col items-center justify-center px-16 py-32">
                        <p className="text-gray-500 my-8 font-semibold text-xl">You don't seem to have any projects running, yet!</p>
                        <Button />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Waves() {
    return (
        <div className="absolute bottom-0 w-full z-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#6c63ff" fillOpacity="1" d="M0,192L24,186.7C48,181,96,171,144,192C192,213,240,267,288,256C336,245,384,171,432,165.3C480,160,528,224,576,229.3C624,235,672,181,720,138.7C768,96,816,64,864,74.7C912,85,960,139,1008,149.3C1056,160,1104,128,1152,133.3C1200,139,1248,181,1296,202.7C1344,224,1392,224,1416,224L1440,224L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
            </svg>
        </div>
    )
}

function Sidebar() {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const fetchProjectNum = async () => {
        axios
    }
    const projects = [{
        name: "Cohort"
    }, {
        name: "DSA"
    }, {
        name: "Football"
    }, {
        name: "Job Application"
    }, {
        name: "Cohort"
    }, {
        name: "DSA"
    }, {
        name: "Football"
    }, {
        name: "Job Application"
    }, {
        name: "Cohort"
    }, {
        name: "DSA"
    }, {
        name: "Football"
    }, {
        name: "Job Application"
    }, {
        name: "Cohort"
    }, {
        name: "DSA"
    }, {
        name: "Football"
    }, {
        name: "Job Application"
    }, {
        name: "Cohort"
    }, {
        name: "DSA"
    }, {
        name: "Football"
    }, {
        name: "Job Application"
    }]

    return (
        <aside
            id="sidebar-multi-level-sidebar"
            className="top-0 left-0 z-40 w-full h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
                <ul className="space-y-2 font-medium">
                    <li>
                        <button
                            type="button"
                            className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            aria-controls="dropdown-example"
                            onClick={toggleDropdown}>
                            <svg
                                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 21">
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                            </svg>
                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Projects</span>
                            <svg
                                className={`w-3 h-3 transform transition-transform ${
                                    showDropdown ? "rotate-180" : ""
                                }`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        <ul
                            id="dropdown-example"
                            className={`py-2 space-y-2 ${showDropdown ? "" : "hidden"}`}>
                            {projects.map((element) => {
                                return(
                                    <li>
                                        <a
                                            href="#"
                                            className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                            {element.name}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                </ul>
                <div className="Signout">
                    <button
                        type="button"
                        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        aria-controls="dropdown-example">
                        <svg
                            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 21">
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                        </svg>
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}

function Button() {
    return (
        <button className="cursor-pointer relative inline-flex items-center pr-12 pl-10 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50" 
        >
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg className="w-5 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative">Create Project</span>
        </button>
    );
}
