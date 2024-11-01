import React from "react";
import indiaoil from "../assets/img/indianoillogo.png";
import amaravatitextile from "../assets/img/amaravathitextileslogo.png";
import iodlogo from "../assets/img/iodlogo.png";
import shemaroologo from "../assets/img/shemaroologo.png";

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export const Footer = () => {
  return (
    <footer className="bg-[#03002E] text-white">
      <div className="p-3">
        <h3 className="text-2xl lg:text-3xl text-center py-6">
          Trusted by the world’s leading organizations
        </h3>
        <div className="py-10 overflow-hidden">
          <marquee behavior="scroll" direction="left" className="flex gap-4">
            <div className="flex gap-12 lg:gap-48">
              <div>
                <img
                  src={indiaoil}
                  alt="brandlogo1"
                  className="w-auto max-w-[200px]"
                />
              </div>
              <div>
                <img
                  src={amaravatitextile}
                  alt="brandlogo2"
                  className="w-auto max-w-[200px]"
                />
              </div>
              <div>
                <img
                  src={iodlogo}
                  alt="brandlogo3"
                  className="w-auto max-w-[200px]"
                />
              </div>
              <div>
                <img
                  src={shemaroologo}
                  alt="brandlogo4"
                  className="w-auto max-w-[200px]"
                />
              </div>
            </div>
          </marquee>
        </div>
      </div>

      <div className="my-4 pb-8">
        <hr className="text-white opacity-100 p-2" />
      </div>

      <div className="grid sm:grid-cols-12 gap-4 px-8">
        <div className="col-span-12 md:col-span-12 lg:col-span-3">
          <h2 className="font-poppins font-bold text-2xl uppercase">
            Grow Infinity Realtors
          </h2>
          <p className="font-normal text-[16px] py-3 text-justify leading-8">
            Grow infinity realtors is an accomplished real estate agent firm.
            Drawing from their years of experience they brings a strategic yet
            personal approach to the home buying, selling, and renting process.
          </p>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <h2 className="font-poppins font-bold text-2xl uppercase">
            Areas of Operations
          </h2>
          <ul className="font-normal text-[16px] py-3 text-justify list-disc ms-10">
            <li className="my-2">Sector-150</li>
            <li className="my-2">Sector-150</li>
            <li className="my-2">Sector-150</li>
            <li className="my-2">Sector-150</li>
            <li className="my-2">Sector-150</li>
            <li className="my-2">Sector-150</li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <h2 className="font-poppins font-bold text-2xl uppercase">
            Social Accounts
          </h2>
          <ul className="font-normal text-[16px] py-3 text-justify">
            <li className="my-2">
              <a
                href="https://www.facebook.com/p/Grow-Infinity-Realtors-100092248133482/?_rdr"
                target="_blank"
              >
                <div className="flex gap-3">
                  <FacebookIcon />
                  Facebook
                </div>
              </a>
            </li>
            <li className="my-2">
              <a href="#" target="_blank">
                <div className="flex gap-3">
                  <XIcon />
                  Twitter
                </div>
              </a>
            </li>
            <li className="my-2">
              <a
                href="https://www.instagram.com/growinfinityrealtors_official/"
                target="_blank"
              >
                <div className="flex gap-3">
                  <InstagramIcon />
                  Instagram
                </div>
              </a>
            </li>
            <li className="my-2">
              <a href="#">
                <div className="flex gap-3">
                  <YouTubeIcon />
                  Youtube
                </div>
              </a>
            </li>
            <li className="my-2">
              <a href="#">
                <div className="flex gap-3">
                  <WhatsAppIcon />
                  Whatsapp
                </div>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-3">
          <h2 className="font-poppins font-bold text-2xl uppercase">
            Contact Us
          </h2>
          <ul className="font-normal text-[16px] py-3 text-justify">
            <li className="my-2">
              Plot No. BL-34, II Floor, Near Fitness Gym, Sector-116, Noida,
              Uttar Pradesh-201305
            </li>
            <li className="my-2">growinfinityrealtor1@gmail.com</li>
            <li className="my-2">+91-9990052554</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center mt-9">
        <hr className="text-white opacity-100 w-[80%]" />
      </div>

      <div className="grid sm:grid-cols-12 py-10 text-center">
        <div className="sm:col-span-6 col-span-12 flex justify-center sm:mb-0 mb-3">
          <p>
            © {new Date().getFullYear()} Grow Infinity Realtors. All Rights
            Reserved.
          </p>
        </div>
        <div className="sm:col-span-3 col-span-6 flex justify-center">
          <p>Privacy Policy</p>
        </div>
        <div className="sm:col-span-3 col-span-6 flex justify-center">
          <p>Terms & conditions</p>
        </div>
      </div>
    </footer>
  );
};
