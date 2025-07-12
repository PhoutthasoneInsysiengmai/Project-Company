import React from "react";
import './Footer.css';
import { assets } from "../../assets/assets";

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" className="logo" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui facere quis blanditiis
                        eligendi? Minima ratione quas necessitatibus provident perspiciatis, quo repellat inventore ipsum iusto vel sunt quasi quos autem maiores.</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        {/* Please Enter Your Phone Company */}
                        <li>Phone Number Company</li>
                        {/* Please Enter your Email Company */}
                        <li>MTP@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Lorem ipsum dolor sit amet.</p>
        </div>
    )
}
export default Footer