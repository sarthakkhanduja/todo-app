import { useState } from 'react';
import signUpPicture from '../assets/signUpPicture.png';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [tnc, setTnc] = useState(false);

    const signUpBackendCall = async (name, email, pwd) => {
        try {
            const response = await axios.post("http://localhost:3001/signup", {
            name: name,
            email: email,
            password: pwd
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            validateStatus: function (status) {
                return status >= 200 && status < 500; // Treat status codes 200-299 as success
            }
        });

        console.log(response);
        return(response);
        } catch(err) {
            console.log("There was some error in making the backend call to Sign Up");
            console.log(err);
        }
    }
    
    const navigate = useNavigate();

    const navigateToSignIn = () => {
        navigate('/signin');
    };

    const navigateToTnC = () => {
        navigate('/termsandconditions');
    };

    return(
        // <div className="min-h-screen w-full bg-gradient-to-bl from-transparent via-blue-marguerite-300 flex justify-center items-center">
        <div className="min-h-screen w-full bg-gradient-to-r from-yellow-100 to-orange-100 flex justify-center items-center">
            <div className="grid grid-cols-2 bg-white w-2/3 h-4/5 rounded-2xl shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
                <div className="px-9 py-9">
                    <div className="flex flex-row px-5">
                        <p className='text-xs pb-5 pt-4 pr-1'>Already have an account? <a className='text-xs underline decoration-{sky-500} text-sky-500 pl-1 cursor-pointer' onClick={navigateToSignIn}>Sign in</a></p>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 py-8 px-5">
                        <p>Sign Up 📝</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                        <Field label="Name" givenType="text" setFn={setName} />
                        <Field label="Email" givenType="text" setFn={setEmail} />
                    </div>
                    <Field label="Password" givenType="password" setFn={setPwd}/>
                    <TnC fn={navigateToTnC} setFn={setTnc}/>
                    <Button label="Sign Up" name={name} email={email} password={pwd} tnc={tnc} backendCall={signUpBackendCall}/>
                </div>
                <div className="flex items-center">
                    <img className="object-cover" src={signUpPicture} alt="picture" />
                </div>
            </div>
        </div>
    )
}

function Field(props) {
    return(
        <div className="py-2 px-5">
            <p className='text-xs pb-2'>{props.label}</p>
            <input className='px-2 py-2 border-solid border-2 text-xs border-gray-500/50 rounded-lg w-full' type={props.givenType} onChange={(e) => {
                props.setFn(e.target.value);
            }}></input>
        </div>
    )
}

function Button(props) {
    return(
        <div className='flex justify-center py-8 px-5'>
            <button className='w-full text-white bg-blue-marguerite-500 text-xs rounded-lg drop-shadow-xl hover:bg-blue-marguerite-700 py-2' onClick={async () => {
                if(!props.tnc) {
                    alert("You have not agreed to the terms and conditions");
                } else {
                    let res = await props.backendCall(props.name, props.email, props.password);
                    console.log(res.status);
                }
            }}>{props.label}</button>
        </div>
    )
}

function TnC(props) {
    return (
        <div className='py-4 px-5 flex flex-row items-center'>
            <input id='tncCheckbox' className='size-3 rounded-lg' type='checkbox' onChange={(e) => {
               props.setFn(e.target.checked);
            }} />
            <label htmlFor='tncCheckbox' className='text-xs pl-2 cursor-pointer'>
                I've read the <a className='text-xs underline text-sky-500 cursor-pointer' onClick={props.fn}>Terms and Conditions</a>
            </label>
        </div>
    );
}
