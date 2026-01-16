import Link from "next/link";

export default function GetStarted() {
    return(
        <div className="LastHeadlineSection my-10 flex gap-5 flex-col justify-center items-center">
                    <div>
                        <h1 className="lg:text-4xl sm:text-3xl text-xl font-bold">Uncover A New Approach To Design</h1>
                    </div>
                    <Link href="/register">
                        <button className="bg-cyan-500  sm:w-[200px] w-[150px] hover:bg-cyan-700 rounded-sm p-2 font-semibold cursor-pointer transition duration-300 ease-in-out">Get Started</button>
                    </Link>
        </div>
    )
}