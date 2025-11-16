import { SignupForm } from "@/components/signup-form";

export default function Register(){
    return(
        <>
        <div className="bg-black w-full h-screen flex justify-center items-center">
            <div className="w-full">
                <SignupForm/>
            </div>
        </div>
        </>
    )
}