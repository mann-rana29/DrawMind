import MainHeading from "./MainHeading"

const Hero = () => {
  return (
    <div className="flex flex-col  items-center justify-center ">
      <MainHeading/>
      <div className="video-section w-[90%] h-[600px] bg-neutral-400 mb-10  p-5 shadow-2xl ">
            Hi, I am hero
      </div>
    </div>
  )
}

export default Hero
