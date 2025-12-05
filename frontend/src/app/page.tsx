import Head from "next/head";
import Hero from "@/components/HeroSection/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Faq from "@/components/FAQ/Faq";

export default function Home() {
  return (
      <div style={{
        background: "#000000",
        backgroundImage: `
        linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
      `,
        backgroundSize: "40px 40px",
      }} className=" overflow-auto text-white min-h-screen  pt-6 xl:px-50  ">

        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="w-full h-full">
          <Navbar/>
          <Hero/>
          <Faq/>
        </div>

      </div>
  );
}
