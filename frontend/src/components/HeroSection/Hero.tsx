import MainHeading from "./MainHeading"
import LoomEmbed from "../LoomEmbedded"


const Hero = () => {
  return (
    <div className="flex flex-col  items-center justify-center ">
      <MainHeading/>
      <div className="video-section w-[90%] h-[570px] mt-4 mb-10  ">
          <LoomEmbed  src="https://www.loom.com/embed/ca59f8d9ceca466e9f7e53162b1fd493?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true" />
      </div>
    </div>
  )
}

export default Hero
