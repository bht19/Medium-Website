import { SignupInput } from "@bharatdondeti/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios";
import { backendUrl } from "../config";

export const Auth = ( {type} : {type : "signup" | "signin"} ) => {
    const navigate = useNavigate();
    const [postInputs, setpostInputs] = useState<SignupInput>({
        name: "",
        password: "",
        username: ""
    })

    async function sendRequest() {
        try{
        const response = await Axios.post(`${backendUrl}/api/v1/user/$ {type === "signup" ? "signup" : "signin"}`, postInputs );
        const jwt = response.data;
        localStorage.setItem("token", jwt);
        navigate("/blogs");

    } catch(e){
        alert("Error while signup")
    }
}

    return <div className="h-screen flex justify-center flex-col">
        <div className=" flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create Account
                    </div>
                    <div className="text-slate-400">
                        { type === "signin" ? "Dont have an Account " : "Already have an account?" }
                        <Link className="pl-2 underline" to={ type === "signin" ? "/signup" : "/signin" }>
                            {type === "signin" ? "sign up" : "sign in"}
                        </Link>
                    </div>
                </div>
                <div className="pt-8">
                   {type === "signup" ? <LabelledInput label = "Name" placeHolder="Your Name..." onChange={(e) => {
                        setpostInputs(c => ({
                            ...postInputs,
                            name: e.target.value
                        }))
                    }} /> : null}
                    <LabelledInput label = "username" placeHolder="example@gmail.com" onChange={(e) => {
                        setpostInputs(c => ({
                            ...postInputs,
                            username: e.target.value
                        }))
                    }} />
                    <LabelledInput label = "Password" type = {"password"} placeHolder="Your Password..." onChange={(e) => {
                        setpostInputs(c => ({
                            ...postInputs,
                            password: e.target.value
                        }))
                    }} />
                    <button onClick={sendRequest} type="button" className=" mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                     focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
                      dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{ type === "signup" ? "sign up" : "sign in" }</button>

                </div>
            </div>
        </div>
    </div>
}


interface LabelledInputType {
    label : string;
    placeHolder : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type? : string
}



function LabelledInput ({label, placeHolder, onChange, type} : LabelledInputType ){
        return  <div>
        <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-black pt-4">{label}</label>
        <input onChange = {onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeHolder} required />
         
    </div>


}
