import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqData } from "@/lib/utils"



const Faq = () => {
  return (
    <div className="flex my-5 flex-col justify-center items-center">
        <div className="bg-tranparent w-[90%] h-full ">
            <div className="heading text-center">
                <h1 className="text-3xl lg:text-5xl font-medium text-cyan-300">FAQ</h1>
                <p className="mt-4 text-gray-300 font-medium">Have a question? Find our most commonly <br/> asked questions below.</p>
            </div>
            <div className="questions my-6">
                <Accordion type="single" collapsible className="flex flex-col gap-6">
                {faqData.map(function(elem){
                    return(
                        <AccordionItem key={elem.id}  className=" p-3  border-3" value={elem.id.toString()} >
                            <AccordionTrigger>{elem.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-300 ">
                            {elem.answer}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })
                }
                </Accordion>
            </div>
        </div>
    </div>
  )
}

export default Faq
