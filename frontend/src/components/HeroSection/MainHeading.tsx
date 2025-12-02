import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

const MainHeading = () => {
  return (
    <div>
      <div className="flex flex-col  justify-center items-center ">
            <div className="mt-4 ">
              <HoverBorderGradient>
                Open Source Software
              </HoverBorderGradient>
            </div>

            <div className="p-5 text-center text-3xl sm:text-5xl h-40 font-bold   ">
              <LayoutTextFlip  text={""} words={["Create","Build","Generate"]}/>
               <span  className="text-cyan-500 hover:text-cyan-300 transition ease-in-out duration-400 delay-75 cursor-pointer">UML</span> Designs
              <br />
              with one line of text
            </div>
          </div>
    </div>
  )
}

export default MainHeading
