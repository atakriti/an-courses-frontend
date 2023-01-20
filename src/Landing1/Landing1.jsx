import React, { useContext, useEffect, useState } from "react";
import { context } from "../Context";
import "./landing1.scss";
import logo from "../images/landing1.jpg";
import jsPDF from "jspdf";
import certificate from "../images/an-logo.png";
function Landing1() {
  let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
  let FullDate = year + "/" + month + "/" + day
  // ===========================================================
  let { users, signedin,isSignedin,animateDownload,setAnimateDownload,setAnimateIsSignin,languageValue } = useContext(context);
  // ====================== Find the user =========================
  let findUser = users.find((user) => user.email === signedin.email);
  let getKeysCertificate =  findUser  ? Object.keys(findUser?.done).filter(item => findUser?.done[item] === true) : [];
  let mappingKeysDE = getKeysCertificate?.map(item => item?.includes("de") && `\n ${item}`).filter(item => item !== false);
  let mappingKeysEN = getKeysCertificate?.map(item => item?.includes("en") && `\n ${item}`).filter(item => item !== false)
  const pdf = new jsPDF();
  pdf.setFont("helvetica", "bold");
pdf.setFontSize(24);
  pdf.text(50, 90, `${findUser?.username[0]?.toUpperCase() + findUser?.username?.slice(1)},`);
  pdf.setFont("helvetica", "normal");
pdf.setFontSize(16);
  pdf.text(50, 100, `Thank you for visiting my Website.`);
pdf.text(50, 110, `Congratulations, you completed the Course.`);
pdf.text(50, 120, `This Certificate is for fun, it is fake and not real.`);
pdf.text(50, 130, `Only to remember that you could make it.`);
  pdf.text(50, 140, `What you achieved :`);
  
  findUser?.done["de-b1-speaking"] && pdf.text(50, 150,"German:") 
  findUser?.done["de-b1-speaking"] && pdf.text(50, 155,  mappingKeysDE.join(""))  
  findUser?.done["en-b1-speaking"] && pdf.text(110, 150,"English:") 
  findUser?.done["en-b1-speaking"] && pdf.text(110, 155,  mappingKeysEN.join("")) 


pdf.text(50, 250, `Best regards,`);
pdf.text(50, 257, `Anwar Takriti`);
pdf.text(50, 267, `${FullDate}`);

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
        setTimeout(( )=>setAnimateIsSignin(false),1000 )
      }
    }
   
  };
  
  return (
    <div className="landing1">
      {/* ===================================== English =============== */}
      {languageValue === "en" && (
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
      )}
      {/* ===================================== Arabic =============== */}
       {languageValue === "عربي" && (
          <div>
          <h1>عنجد شهادة؟</h1>
          <p>
            اي نعم, بس تخلصوا كورس الالماني او الانكليزي <br /> 
            هية شهادة مزيفة وليست حقيقية, بس تقدير لجهودكم
          </p>
          {findUser?.done["de-b1-speaking"] || findUser?.done["en-b1-speaking"] ? (
  
          <button onClick={handleDownload}>تحميل الشهادة</button>
          ):<h2>زر التحميل بيطلع بس لما تكونو مخلصين الانكليزي او الالماني</h2>}
  
          {/* {findUser?.done['de-b1-speaking'] === true && findUser?.done['de-b1-grammar'] === true && findUser?.done['de-b1-writting'] === true && findUser?.done['de-b1-vocabs'] === true ? <button>Download Certificate</button> :  <h2>When you achieve the course the Download button will appear automatically</h2>}
           */}
        </div>
      )}
     
     
      <a>
        <img src={logo} alt="" />
      </a>
    </div>
  );
}

export default Landing1;
