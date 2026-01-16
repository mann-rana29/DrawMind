"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "../../../public/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="relative">
      <nav className="flex  justify-between h-15 p-4 items-center">
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"}>
          <div className="flex gap-2 items-center cursor-pointer">

            <div>
              <Image src={logo} alt={"Logo"} className="object-cover size-12" />
            </div>

            <div>
              <span className="lg:text-4xl text-2xl font-bold">DrawMind</span>
            </div>
          </div></Link>

        {/* Desktop Navigation */}
        <div className="lg:flex gap-4 hidden">
          {user ? (
            <>
              <div>
                <Link href="/dashboard">
                  <Button
                    size={"lg"}
                    className="bg-cyan-500 hover:bg-white/90 font-semibold border-2 border-amber-100 cursor-pointer transition duration-300 ease-in-out"
                  >
                    Dashboard
                  </Button>
                </Link>
              </div>
              <div>
                <Button
                  size={"lg"}
                  onClick={handleLogout}
                  className="bg-white/90 hover:bg-cyan-500 font-semibold cursor-pointer transition duration-300 ease-in-out text-black"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Link href="/login">
                  <Button
                    size={"lg"}
                    className="bg-cyan-500 hover:bg-white/90 font-semibold border-2 border-amber-100 cursor-pointer transition duration-300 ease-in-out"
                  >
                    Login
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/register">
                  <Button
                    size={"lg"}
                    className="bg-cyan-500 hover:bg-white/90 font-semibold cursor-pointer transition duration-300 ease-in-out border-2 border-amber-100"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Hamburger Menu Button (Mobile/Tablet) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            // Close Icon (X)
            <svg
              className="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger Icon
            <svg
              className="w-7 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden md:w-[25%] w-[30%] absolute top-[30px] right-[50px] rounded-4xl bg-transparent backdrop-blur-sm border-2 shadow-lg border-t z-50">
          <div className="flex flex-col gap-3 p-4">
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    size={"lg"}
                    className="w-full bg-cyan-500 hover:bg-white/90 font-semibold  cursor-pointer transition duration-300 ease-in-out"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Button
                  size={"lg"}
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full bg-white/90 hover:bg-cyan-500 font-semibold cursor-pointer transition duration-300 ease-in-out text-black"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    size={"lg"}
                    className="w-full bg-cyan-500 hover:bg-white/90 font-semibold  cursor-pointer transition duration-300 ease-in-out border-2 border-amber-100"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    size={"lg"}
                    className="w-full bg-cyan-500 hover:bg-white/90 font-semibold cursor-pointer transition duration-300 ease-in-out border-2 border-amber-100"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
