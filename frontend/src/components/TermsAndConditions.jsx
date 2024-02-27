import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

export function TermsAndConditions() {
    return (
        <div className="min-h-screen font-display w-full flex flex-col bg-red-50 justify-center items-center">
            <Link to="/signup" className="flex m-8 p-2 items-center hover:bg-jade-400 rounded-2xl hover:cursor-pointer">
                <FaArrowLeft className="text-gray-800 cursor-pointer" />
                <p className="px-4">Go back to the Sign Up page</p>
            </Link>
            <iframe
                className="p-12 border-2 border-gray-800 border-solid"
                src="https://giphy.com/embed/eIV8AvO3EC3xhscTIW"
                width="480"
                height="480"
                title="giphy-embed"
                allowFullScreen
            ></iframe>
            <p>
                <a href="https://giphy.com/gifs/cbc-comedy-schittscreek-514-eIV8AvO3EC3xhscTIW"></a>
            </p>
        </div>
    );
}
