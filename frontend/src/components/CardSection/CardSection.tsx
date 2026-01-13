
import TiltedCard from "../ui/TiltedCard"

const CardSection = () => {
  return (
    <div>
      <div className="upper-section">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">UML Diagrams Supported</h1>
          <p className="text-gray-600">Hover over the cards to learn more about each diagram type.</p>
        </div>
      </div>
      <div className="lower-section flex flex-wrap justify-evenly items-center">
        <TiltedCard
          imageSrc="/class_dig.png"
          altText="Class Diagram"
          captionText="Class Diagram"
          containerHeight="400px"
          containerWidth="400px"
          imageHeight="350px"
          imageWidth="350px"
          rotateAmplitude={12}
          scaleOnHover={1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={false}
        />
        <TiltedCard
          imageSrc="/activity_dig.png"
          altText="Acivity Diagram"
          captionText="Activity Diagram"
          containerHeight="400px"
          containerWidth="400px"
          imageHeight="350px"
          imageWidth="350px"
          rotateAmplitude={12}
          scaleOnHover={1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={false}
        />
        <TiltedCard
          imageSrc="/sequence_dig.png"
          altText="Sequence Diagram"
          captionText="Sequence Diagram"
          containerHeight="400px"
          containerWidth="400px"
          imageHeight="350px"
          imageWidth="350px"
          rotateAmplitude={12}
          scaleOnHover={1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={false}
        />
        <TiltedCard
          imageSrc="/usecase_dig.png"
          altText="Use Case Diagram"
          captionText="Use Case Diagram"
          containerHeight="400px"
          containerWidth="400px"
          imageHeight="350px"
          imageWidth="350px"
          rotateAmplitude={12}
          scaleOnHover={1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={false}
        />
      </div>
    </div>
  )
}

export default CardSection
