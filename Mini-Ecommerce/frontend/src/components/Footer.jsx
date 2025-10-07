import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-start">
                
                {/* Logo + Description */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">Cart Me Up</h2>
                    <p className="text-sm leading-relaxed">
                        Your one-stop shop for gadgets, fashion, and daily essentials.  
                        Fast delivery. Trusted quality. 24/7 support.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">Shop</a></li>
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">FAQs</a></li>
                        <li><a href="#" className="hover:text-white">Return Policy</a></li>
                        <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
                        <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
                        <a href="#" className="hover:text-sky-400"><FaTwitter /></a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-5">
                © {new Date().getFullYear()} Cart Me Up. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
