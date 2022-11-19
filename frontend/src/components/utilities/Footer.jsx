import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons'
import { Container } from "react-bootstrap"; 
import './footer.css'
import { Link } from "react-router-dom";
import HowItWorks from "./about/HowItWorks";

const Footer = ({username}) => {

    return (
        <footer className="footer-distributed">
                <div className="footer-right">
                    <a href="https://www.linkedin.com/in/tmigli/" target="_blank">
                        <FontAwesomeIcon icon={faLinkedin}/>
                    </a>
                    <a href="https://github.com/ThiagoDe" target="_blank">
                        <FontAwesomeIcon icon={faGithub}/>
                    </a>
                </div>
                <div className="footer-left">
                    <div className="footer-links">
                     {/* <a className="link-1" href="#">Home</a> */}
                        <a className="link-1" style={{marginRight: "15px", cursor: "pointer"}}><HowItWorks/></a>
                    { username && <Link to="/dash" style={{marginRight: "15px", cursor: "pointer"}}>Dashboard</Link > }
                        {/* <a  href="#">About</a> */}
                        <a  href="mailto:17tawi@gmail.com" target="_blank">Contact</a>
                    </div>
                    <p>Built by Thiago © 2022</p>
                </div>
        </footer>
    )
}

export default Footer