
import Image from "next/image";
import logo from "../../public/logo.png"
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div style={{
        background: "#000000",
        backgroundImage: `
        linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
      `,
        backgroundSize: "40px 40px",
      }} className=" text-white h-screen  pt-6 px-50 ">
        <div className="borer border-accent w-full h-full">
          <nav className="flex justify-between h-15 p-4 items-center">
            <div className="flex gap-2 items-center cursor-pointer">
              <div>
                <Image src={logo} alt={"Logo"} className="  h-15 w-20"></Image>
              </div>
              <div>
                <span className="text-2xl font-bold ">DrawMind</span>
              </div>
            </div>
            <div className="flex gap-4 ">
              <div>
                <Button size={"lg"} className="bg-cyan-500 hover:bg-white/90 font-semibold border-2 border-amber-100 cursor-pointer transition duration-300 ease-in-out ">Login</Button></div>
              <div><Button size={"lg"} className="bg-white/90 hover:bg-cyan-500 font-semibold  cursor-pointer transition duration-300 ease-in-out">Register</Button></div>
            </div>
          </nav>

          <div className="flex flex-col  justify-center items-center ">
            <div className="">
              <HoverBorderGradient className="bg">
                Open Source Software
              </HoverBorderGradient>
            </div>

            <div className="p-5 text-center text-5xl h-40 font-bold   ">
              <LayoutTextFlip  text={""} words={["Create","Build","Generate"]}/>
               <span  className="text-cyan-500 hover:text-cyan-300 transition ease-in-out duration-400 delay-75 cursor-pointer">UML</span> Designs
              <br />
              with one line of text
            </div>
          </div>


        </div>

      </div>
    </>
  );
}
