import React from 'react'

function ProjectModal(props) {
    return (
      props.modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-80" onClick={props.toggle}></div>
          <div className="relative z-50 p-4 w-full max-w-md">
            <div className="bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Create a Project
                </h3>
                <button
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-blue-marguerite-500 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                  onClick={props.toggle}
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4">
                <form className="space-y-4" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Title
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-marguerite-500 hover:bg-blue-marguerite-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Confirm
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }


export default ProjectModal