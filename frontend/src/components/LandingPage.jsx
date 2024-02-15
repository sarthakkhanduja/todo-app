// import logo from "../assets/getToWork.png";
// import heroImg from "../assets/heroImg.svg"
// import { Link, Navigate } from 'react-router-dom';
// import bgImg from "../assets/ooorganize.svg";
// import { useNavigate } from "react-router-dom";
// import { useCallback } from "react";
// import { useEffect } from "react";

// export function LandingPage() {

//     const navigate = useNavigate();

//     const isToken = useCallback(() => {
//         const safeToken = localStorage.getItem('token');
//         if(safeToken) {
//             navigate('/userhome');
//         }
//     }, [])

//     useEffect(() => {
//         isToken();
//     }, []);

//     return (
//         <div className="relative w-full min-h-screen">
//             <Navbar />
//             <BgImage />
//             <div className="z-10 flex flex-col">
//                 <div className="flex flex-row">
//                     <HeroImage />
//                     <Hero />
//                 </div>
//                 <Wave />
//             </div>
//             <Footer />
//         </div>
//     )
// }

// function BgImage() {
//     return (
//         <div className="absolute inset-0 -z-10 opacity-10">
//             <img className="w-full h-full object-cover" src={bgImg} alt="Background" />
//         </div>
//     )
// }


// function Navbar() {
//     return(
//         <div className="w-full h-24 justify-around flex flex-row">
//             <div className="flex justify-start px-4 py-4">
//                 <img className="w-75" src={logo} alt="logo" />
//             </div>
//             <div className="flex justify-center items-center px-4">
//                 <Button label="Sign Up" route="/signup" />
//             </div>
//         </div>
//     )
// }

// function Wave() {
//     return (
//         <div>
//             <svg viewBox="0 700 1920 400" xmlns="http://www.w3.org/2000/svg">
//                 <rect fill="#3d1053" />
//                 <path
//                     d="M1920,1080C1654.3333333333333,1110.6666666666667,267.6666666666667,1098.3333333333333,0,1080C-267.6666666666667,1061.6666666666667,207.83333333333331,980.5,314,970C420.1666666666667,959.5,530.3333333333334,1046.5,637,1017C743.6666666666666,987.5,849.3333333333334,789.6666666666666,954,793C1058.6666666666667,796.3333333333334,1158.3333333333333,1019.8333333333334,1265,1037C1371.6666666666667,1054.1666666666667,1484.8333333333333,888.8333333333334,1594,896C1703.1666666666667,903.1666666666666,2185.6666666666665,1049.3333333333333,1920,1080C1654.3333333333333,1110.6666666666667,267.6666666666667,1098.3333333333333,0,1080"
//                     fill="#6C63FF" />
//             </svg>
//         </div>
//     )
// }

// function Footer() {
//     return (
//         <div className="w-full flex justify-center items-center">
//             Made by{' '}
//             <a className="text-blue-marguerite-400 pl-1 font-semibold" href="https://linkedin.com/in/sarthakkhanduja" target="_blank" rel="noopener noreferrer">
//                 Sarthak Khanduja
//             </a>
//         </div>
//     );
// }


// function HeroImage() {
//     return(
//         <div className="w-full px-48 pt-32">
//             <img className="" src={heroImg} alt="heroImage" />
//         </div>
//     )
// }

// function Hero() {
//     return(
//         <div className="w-full flex flex-col px-36 pt-48">
//             <div className="heading">
//                 <h2 className="text-7xl font-bold mb-10">Bring together all your tasks under one roof.</h2>
//             </div>
//             <div className="text-xl font-semibold mb-10">Struggling to organize tasks for different projects?<br /><span className="text-blue-marguerite-500 text-bold">Consolidate all your tasks in one place and track progress effortlessly.</span></div>
//             <div className="mt-4 flex">
//                 <Button label="Sign Up" route="/signup" />
//                 <ButtonGreen label="Sign In" route="/signin" />
//             </div>
//         </div>
//     )
// }

// function Button(props) {
//     return (
//         <Link
//             to={props.route}
//             className="cursor-pointer relative inline-flex items-center mx-2 pr-12 pl-10 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
//         >
//             <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
//             <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
//                 <svg className="w-5 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
//             </span>
//             <span className="relative">{props.label}</span>
//         </Link>
//     );
// }

// function ButtonGreen(props) {
//     return (
//         <Link
//             to={props.route}
//             className="cursor-pointer relative inline-flex items-center mx-2 pr-12 pl-10 py-3 overflow-hidden text-lg font-medium text-jade-600 border-2 border-jade-600 rounded-full hover:text-white group hover:bg-gray-50"
//         >
//             <span className="absolute left-0 block w-full h-0 transition-all bg-jade-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
//             <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
//                 <svg className="w-5 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
//             </span>
//             <span className="relative">{props.label}</span>
//         </Link>
//     );
// }

// --------------------------------------------------------------------------------

import logo from "../assets/getToWork.png";
import heroImg from "../assets/heroImg.svg"
import { Link, Navigate } from 'react-router-dom';
import bgImg from "../assets/ooorganize.svg";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useEffect } from "react";

export function LandingPage() {

    const navigate = useNavigate();

    const isToken = useCallback(() => {
        const safeToken = localStorage.getItem('token');
        if(safeToken) {
            navigate('/userhome');
        }
    }, [])

    useEffect(() => {
        isToken();
    }, []);

    return (
        <div className="md:relative md:w-full min-h-screen">
            <Navbar />
            <BgImage />
            <div className="z-10 flex flex-col">
                <div className="flex flex-col md:flex-row">
                    <HeroImage />
                    <Hero />
                </div>
                <Wave />
            </div>
            <Footer />
        </div>
    )
}

function BgImage() {
    return (
        <div className="absolute inset-0 -z-10 opacity-10">
            <img className="w-full h-full object-cover" src={bgImg} alt="Background" />
        </div>
    )
}


function Navbar() {
    return (
        <div className="w-full md:h-24 md:justify-around flex justify-center py-4 px-4 mb-4 md:py-0 md:px-0 md:mb-0">
            <div className="h-3/5 w-3/5 md:h-full flex justify-center md:justify-start items-center md:px-4 md:py-4">
                <img className="w-2/3 h-2/3 md:w-80 md:h-20" src={logo} alt="logo" />
            </div>
            <div className="hidden md:flex justify-center items-center md:px-4">
                <Button label="Sign Up" route="/signup" />
            </div>
        </div>
    );
}


function Wave() {
    return (
        <div>
            <svg viewBox="0 700 1920 400" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#3d1053" />
                <path
                    d="M1920,1080C1654.3333333333333,1110.6666666666667,267.6666666666667,1098.3333333333333,0,1080C-267.6666666666667,1061.6666666666667,207.83333333333331,980.5,314,970C420.1666666666667,959.5,530.3333333333334,1046.5,637,1017C743.6666666666666,987.5,849.3333333333334,789.6666666666666,954,793C1058.6666666666667,796.3333333333334,1158.3333333333333,1019.8333333333334,1265,1037C1371.6666666666667,1054.1666666666667,1484.8333333333333,888.8333333333334,1594,896C1703.1666666666667,903.1666666666666,2185.6666666666665,1049.3333333333333,1920,1080C1654.3333333333333,1110.6666666666667,267.6666666666667,1098.3333333333333,0,1080"
                    fill="#6C63FF"
                />
            </svg>
        </div>
    );
}


function Footer() {
    return (
        <div className="w-full flex justify-center items-end">
            Made by{' '}
            <a className="text-blue-marguerite-400 pl-1 font-semibold" href="https://linkedin.com/in/sarthakkhanduja" target="_blank" rel="noopener noreferrer">
                Sarthak Khanduja
            </a>
        </div>
    );
}


function HeroImage() {
    return (
        <div className="w-full px-16 flex justify-center items-center mb-1 md:mb-0 md:px-48 md:pt-32">
            <img className="size-2/3 md:size-full" src={heroImg} alt="heroImage" />
        </div>
    );
}

function Hero() {
    return (
        <div className="w-full flex flex-col px-16 md:px-32 md:pt-48 mt-4 md:mt-0">
            <div className="heading">
                <h2 className="text-3xl md:text-7xl text-center md:text-left font-bold mb-6 md:mb-10">Bring together all your tasks under one roof.</h2>
            </div>
            <div className="text-md md:text-xl font-semibold text-center md:text-left mb-8 md:mb-10">Struggling to organize tasks for different projects?<br /><span className="text-blue-marguerite-500 text-bold">Consolidate all your tasks in one place and track progress effortlessly.</span></div>
            <div className="md:mt-4 flex flex-row justify-center md:justify-normal">
                <Button label="Sign Up" route="/signup" />
                <ButtonGreen label="Sign In" route="/signin" />
            </div>
        </div>
    );
}


function Button(props) {
    return (
        <Link
            to={props.route}
            className="cursor-pointer relative inline-flex items-center mx-2 md:pr-12 md:pl-10 md:py-3 overflow-hidden px-4 py-2 text-md md:text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
        >
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg className="w-5 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative">{props.label}</span>
        </Link>
    );
}

function ButtonGreen(props) {
    return (
        <Link
            to={props.route}
            className="cursor-pointer relative inline-flex items-center mx-2 md:pr-12 md:pl-10 md:py-3 overflow-hidden px-4 py-2 text-md md:text-lg font-medium text-jade-600 border-2 border-jade-600 rounded-full hover:text-white group hover:bg-gray-50"
        >
            <span className="absolute left-0 block w-full h-0 transition-all bg-jade-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg className="w-5 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative">{props.label}</span>
        </Link>
    );
}
