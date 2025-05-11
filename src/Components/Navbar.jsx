import React, { useCallback, useState, useEffect } from "react";
import { search, menu } from "../assets";
import Custombutton from "./Custombutton";
import { usePrivy } from "@privy-io/react-auth";
import { IconHeartHandshake } from "@tabler/icons-react";
import { navLinks } from "../Constants";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/Index";

const Navbar = () => {
  const navigate = useNavigate();
  const { authenticated, login, user, logout } = usePrivy();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");
  const [isVerySmallScreen, setIsVerySmallScreen] = useState(false);
  const {searchTerm,setSearchTerm}=useStateContext();

  const handleLoginLogout = useCallback(() => {
    if (authenticated) {
      logout();
    } else {
      login().then(() => {
        if (user) console.log(user);
      });
    }
  }, [authenticated, login, logout, user]);

  useEffect(() => {
    const handleResize = () => {
      setIsVerySmallScreen(window.innerWidth < 425);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="w-full px-2 sm:px-6 md:px-10 mb-6 relative z-50">
      <div className="flex items-center justify-between sm:justify-center py-4 sm:py-6 min-h-[70px] relative w-full">
        {/* Left Icon */}
        <div className="flex sm:hidden ml-[-30px]">
          <div className="h-11 w-11 rounded-xl bg-[#2c2f32] flex items-center justify-center">
            <IconHeartHandshake size={24} color="#1dc071" />
          </div>
        </div>

        {/* Search Centered */}
        <div className="flex-1 flex justify-center px-2 sm:px-2">
          <div className="hidden xs:flex items-center w-full max-w-xl bg-[#1c1c24] rounded-full px-4 py-3">
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              type="text"
              placeholder="Search records..."
              className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder:text-[#4b5264] outline-none"
            />
            <div className="bg-[#4acd8d] cursor-pointer rounded-full px-4 py-3 min-w-[45px] ml-2.5 flex items-center justify-center">
              <img src={search} alt="search" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Right Menu */}
        <div className="flex sm:hidden">
          <div
            className="h-11 w-11 rounded-xl bg-[#2c2f32] flex items-center justify-center cursor-pointer ml-2"
            onClick={() => setToggleDrawer((prev) => !prev)}
          >
            <img src={menu} alt="menu" className="w-[24px] h-[24px]" />
          </div>
        </div>

        {/* Auth Button for Desktop */}
        <div className="hidden sm:block">
          <Custombutton
            btnType="button"
            title={authenticated ? "Logout" : "Login"}
            styles={`${
              authenticated ? "bg-[#1dc071]" : "bg-[#8c6dfd]"
            } text-sm px-6 py-2 rounded-lg`}
            handleClick={handleLoginLogout}
          />
        </div>
      </div>

      {/* Backdrop Blur */}
      {toggleDrawer && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setToggleDrawer(false)}
        />
      )}

      {/* Mobile Dropdown */}
      <div
        className={`sm:hidden absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${
          toggleDrawer ? "top-[80px] opacity-100" : "top-[-600px] opacity-0"
        } overflow-hidden rounded-xl px-4 pt-4 pb-3 w-[92%] mx-auto bg-[#1c1c24]/90 shadow-lg z-50`}
      >
        {isVerySmallScreen && (
          <div className="flex flex-col mb-5">
            <div className="flex items-center bg-[#2a2a2a] rounded-full px-3 py-2 w-full">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-[#4b5264] outline-none"
              />
              <div className="bg-[#4acd8d] rounded-full px-2.5 py-2 ml-2 min-w-[36px]">
                <img src={search} alt="search" className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <ul className="flex flex-col items-center justify-center gap-3 w-full">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={`flex items-center gap-3 w-full max-w-[270px] px-5 py-3 rounded-md text-white transition-all duration-300 ${
                isActive === link.name
                  ? "bg-[#3a3a43] text-[#1dc071]"
                  : "hover:bg-[#2a2a2a]"
              }`}
              onClick={() => {
                setIsActive(link.name);
                setToggleDrawer(false);
                navigate(link.link);
              }}
            >
              <img
                src={link.imageUrl}
                alt={link.name}
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-medium capitalize">
                {link.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Mobile Login/Logout */}
        <div className="mt-5 w-full flex justify-center">
          <button
            onClick={() => {
              handleLoginLogout();
              setToggleDrawer(false);
            }}
            className={`w-full max-w-[270px] py-2 text-center rounded-lg text-white font-medium transition-all duration-300 ${
              authenticated ? "bg-[#1dc071]" : "bg-[#8c6dfd]"
            }`}
          >
            {authenticated ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
