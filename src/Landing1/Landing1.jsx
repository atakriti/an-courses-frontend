import React, { useContext, useEffect, useState } from "react";
import { context } from "../Context";
import "./landing1.scss";
import logo from "../images/landing1.jpg";
import jsPDF from "jspdf";
import certificate from "../images/an-logo.png";
function Landing1() {
  let { users, signedin,isSignedin,animateDownload,setAnimateDownload,setAnimateIsSignin } = useContext(context);
  // ====================== Find the user =========================
  let findUser = users.find((user) => user.email === signedin.email);
  let getKeysCertificate =  findUser  ? Object.keys(findUser?.done).filter(item => findUser?.done[item] === true) : [];
  console.log("The find user", getKeysCertificate);
  let mappingKeysDE = getKeysCertificate?.map(item => item?.includes("de") && `\n ${item}`).filter(item => item !== false);
  let mappingKeysEN = getKeysCertificate?.map(item => item?.includes("en") && `\n ${item}`).filter(item => item !== false)
  const pdf = new jsPDF();
  pdf.text(65, 90, `Thank you for visiting my Website`);
pdf.text(47, 100, `Congratulation (${findUser?.username}) you completed the Course`);
pdf.text(45, 110, `This Certificate is for fun, it is Fake and not Real`);
pdf.text(55, 120, `only to remember that you could make it`);
  pdf.text(78, 130, `What you achieved :`);
  
  findUser?.done["de-b1-speaking"] && pdf.text(50, 140,"German:") 
  findUser?.done["de-b1-speaking"] && pdf.text(50, 145,  mappingKeysDE.join(""))  
  findUser?.done["en-b1-speaking"] && pdf.text(110, 140,"English:") 
  findUser?.done["en-b1-speaking"] && pdf.text(110, 145,  mappingKeysEN.join("")) 


pdf.text(50, 240, `Best regards`);
pdf.text(50, 247, `Anwar Takriti`);

  var imgWidth = 70;
  var imgHeight = 70;
  var x = (pdf.internal.pageSize.width - imgWidth) / 2;
  var y = 0.05 * pdf.internal.pageSize.height;
  pdf.addImage(certificate, "png", x, y, imgWidth, imgHeight);

  let handleDownload = () => {
    if (findUser?.done["de-b1-speaking"] || findUser?.done["en-b1-speaking"] ) {
      if (isSignedin) {
        setAnimateDownload(true)
        setTimeout(() => setAnimateDownload(false), 4000)
        setTimeout(() => pdf.save("certificate.pdf"), 4000)
      } else {
        setAnimateIsSignin(true)
        setTimeout(( )=>setAnimateIsSignin(false),2000 )
      }
    }
   
  };
  
  return (
    <div className="landing1">
     
      <div>
        <h1>Wow Certificate ?!</h1>
        <p>
          Yes after getting done your full course either English or German,{" "}
          <br /> You will get a Certificate but it is Fake only just for fun,
          that you achived it{" "}
        </p>
        {findUser?.done["de-b1-speaking"] || findUser?.done["en-b1-speaking"] ? (

        <button onClick={handleDownload}>Download Certificate</button>
        ):<h2>Download button will appear once you finished German or English</h2>}

        {/* {findUser?.done['de-b1-speaking'] === true && findUser?.done['de-b1-grammar'] === true && findUser?.done['de-b1-writting'] === true && findUser?.done['de-b1-vocabs'] === true ? <button>Download Certificate</button> :  <h2>When you achieve the course the Download button will appear automatically</h2>}
         */}
      </div>
      <a>
        <img src={logo} alt="" />
      </a>
    </div>
  );
}

export default Landing1;
