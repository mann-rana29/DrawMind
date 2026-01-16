import Link from "next/link";

export default function Footer() {
    return(
        <footer className="w-full py-6 transition-colors duration-300  dark:text-neutral-200">      
               <div className="container mx-auto text-center">
                <div className="mx-auto max-w-6xl border-t transition-colors duration-300 border-gray-500 pt-6">
                    <p className="text-sm font-medium transition-colors duration-300 ">© 2026 DrawMind. All rights reserved.</p>
                    <p className="mt-2 text-sm italic transition-colors duration-300 ">Crafting Beautiful Designs</p>
                </div>
                </div>
        </footer>
    )
}