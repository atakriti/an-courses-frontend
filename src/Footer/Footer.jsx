import React from 'react'
import "./footer.scss"
import {BsFacebook,BsLinkedin,BsGithub} from "react-icons/bs"
function Footer() {
    const currentYear = new Date().getFullYear();
  return (
      <footer>
          <span>
              <h2> Developed by Anwar Takriti {currentYear}</h2>
              <div className="icons">
                 <a target={'_blank'} href="https://www.facebook.com/profile.php?id=100004043302646"> <BsFacebook /></a>
                  <a target={'_blank'} href="https://www.linkedin.com/in/anwar-takriti-232029248/"><BsLinkedin /></a>
                 <a target={'_blank'} href="https://github.com/atakriti"> <BsGithub/></a>
              </div>
            </span>
    </footer>
  )
}

export default Footer