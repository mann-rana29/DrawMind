import LoginFormDemo
 from "@/components/login-form-demo"
export default function login(){
    return(
        <>
        <div className="w-full h-screen bg-black flex justify-center items-center">
            <div className="w-full">
                <LoginFormDemo />
            </div>
        </div>
        </>
    )
}