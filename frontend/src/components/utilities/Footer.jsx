import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin,faGithub } from '@fortawesome/free-brands-svg-icons'
import { Container } from "react-bootstrap"; 
import './footer.css'
import { Link } from "react-router-dom";

const Footer = ({username}) => {

    return (
        <footer className="footer-distributed">
                <div className="footer-right">
                    <a href="https://www.linkedin.com/in/tmigli/">
                        <FontAwesomeIcon icon={faLinkedin}/>
                    </a>
                    <a href="https://github.com/ThiagoDe">
                        <FontAwesomeIcon icon={faGithub}/>
                    </a>
                </div>
                <div className="footer-left">
                    <p className="footer-links">
                        <a className="link-1" href="#">Home</a>
                    { username && <Link to="/dash">Dashboard</Link > }
                        <a  href="#">About</a>
                        <a  href="#">Contact</a>
                    </p>
                    <p>Built by Thiago © 2022</p>
                </div>
        </footer>
    )
}

export default Footer