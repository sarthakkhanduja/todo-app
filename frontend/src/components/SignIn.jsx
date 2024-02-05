import signInPicture from "../assets/signin.png"

export function SignIn() {
    return(
        // <div className="min-h-screen w-full bg-gradient-to-bl from-transparent via-blue-marguerite-300 flex justify-center items-center">
        <div className="min-h-screen w-full bg-gradient-to-r from-red-100 to-cyan-50 flex justify-center items-center">
            <div className="grid grid-cols-2 bg-white w-2/3 h-4/5 rounded-2xl shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
                <div className="flex items-center">
                    <img className="object-cover" src={signInPicture} alt="picture" />
                </div>
                <div className="px-9 py-9">
                    <div className="text-4xl font-bold text-gray-900 py-8 px-5">
                        <p>Hello, again! 👋</p>
                    </div>
                    <Field label="Email" givenType="text"/>
                    <Field label="Password" givenType="password"/>
                    <RememberMe />
                    <Button label="Sign In" />
                </div>
            </div>
        </div>
    )
}


function Field(props) {
    return(
        <div className="py-2 px-5">
            <p className='text-xs pb-2'>{props.label}</p>
            <input className='px-2 py-2 border-solid border-2 text-xs border-gray-500/50 rounded-lg w-full' type={props.givenType}></input>
        </div>
    )
}

function Button(props) {
    return(
        <div className='flex justify-center py-8 px-5'>
            <button className='w-full text-white bg-jade-500 text-xs rounded-lg drop-shadow-xl hover:bg-jade-700 py-2'>{props.label}</button>
        </div>
    )
}

function RememberMe() {
    return(
        <div className='py-4 px-5 flex flex-row items-center'>
            <input id='rememberMeCheckbox' className='size-3 rounded-lg' type='checkbox' />
            <label htmlFor='rememberMeCheckbox' className='text-xs pl-2 cursor-pointer'>
                Remember Me
            </label>
        </div>
    )
}