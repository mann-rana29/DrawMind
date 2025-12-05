import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Faq{
  id : number,
  question: string,
  answer : string
}

export interface CardProps{
    id : number,
    image : string,
    type : string
    
}

export const cardData : CardProps[] = [
  {
    id : 1,
    image : "../../../public/class_dig.png",
    type : "Class Diagram"
  },
  {
    id : 2,
    image : "../../../public/activity_dig.png",
    type : "Activty Diagram"
  },
  {
    id : 3,
    image : "../../../public/sequence_dig.png",
    type : "Sequence Diagram"
  },
  {
    id : 4,
    image : "../../../public/usecase_dig.png",
    type : "Use Case Diagram"
  }
]

export const faqData: Faq[] = [
  {
    id: 1,
    question: "Can I generate UML or other diagrams from a single text description?",
    answer: "Yes. Provide a single text description and the system will generate a corresponding diagram.",
  },
  {
    id: 2,
    question: "Do I need prior prompt-engineering experience?",
    answer: "No. The system helps refine prompts automatically, so you can get good results without prior experience.",
  },
  {
    id: 3,
    question: "Which diagram types are supported?",
    answer: "Supported types include common UML diagrams (class, sequence, activity) and basic flowcharts.",
  },
  {
    id: 4,
    question: "How can I modify a generated diagram?",
    answer: "Describe the changes you want in natural language and the system will update the diagram accordingly.",
  }
]
