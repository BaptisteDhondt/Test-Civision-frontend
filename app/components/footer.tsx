"use client";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 text-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h1 className="text-xl font-bold text-green-600">
              <span className="text-black">CIV</span>ISION
            </h1>
            <p className="mt-4">
              Maximisez vos opportunités d'investissement grâce à l'IA et aux données géolocalisées en temps réel!
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <FaFacebookF className="text-green-600 hover:text-green-800 cursor-pointer" />
              <FaInstagram className="text-green-600 hover:text-green-800 cursor-pointer" />
              <FaLinkedinIn className="text-green-600 hover:text-green-800 cursor-pointer" />
              <FaYoutube className="text-green-600 hover:text-green-800 cursor-pointer" />
              <FaTiktok className="text-green-600 hover:text-green-800 cursor-pointer" />
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg">Produit</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Tarification
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Cas d'utilisation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg">Ressources</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  À propos de nous
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg">Compagnie</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:elisa.groslier@civision.org" className="hover:underline">
                  elisa.groslier@civision.org
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps?q=5255+Av.+Decelles,+Montréal,+Québec,+H3T+2B1,+Canada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  5255 Av. Decelles, Montréal, Québec, H3T 2B1, Canada
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
          <p>© CIVISION INC</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:underline">
              Terms and Conditions
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
