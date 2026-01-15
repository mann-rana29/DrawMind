import MainHeading from "./MainHeading"
import LoomEmbed from "../LoomEmbedded"


const Hero = () => {
  return (
    <div className="flex flex-col  items-center justify-center ">
      <MainHeading/>
      <div className="video-section w-[90%] mb-3 mt-5 sm:mb-10  ">
          <LoomEmbed  src="https://www.loom.com/embed/ca59f8d9ceca466e9f7e53162b1fd493?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true" />
      </div>
    </div>
  )
}

export default Hero
