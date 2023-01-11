import React, { useContext, useState } from "react";
import { context } from "../Context";
import "./landing1.scss";
import logo from "../images/landing1.jpg";
import jsPDF from "jspdf";
import certificate from "../images/an-logo.png";
function Landing1() {
  let { users, signedin,isSignedin,animateDownload,setAnimateDownload } = useContext(context);
  // ====================== Find the user =========================
  let findUser = users.find((user) => user.email === signedin.email);


  const pdf = new jsPDF();
  let text = `                     Thank you for visiting my Website \n
        Congratulation (${findUser?.username}) you completed the Course \n
           This Certificate is for fun, it is Fake and not Real \n
               only to remember that you could make it \n
                               What you achieved : \n
           A1 (Grammar, Vocabulary, Writting, Speaking) \n
           A2 (Grammar, Vocabulary, Writting, Speaking) \n
           B1 (Grammar, Vocabulary, Writting, Speaking) \n
           \n
           Best regards \n
           Anwar Takriti
      `;

  var imgWidth = 70;
  var imgHeight = 70;
  var x = (pdf.internal.pageSize.width - imgWidth) / 2;
  var y = 0.05 * pdf.internal.pageSize.height;
  pdf.addImage(certificate, "png", x, y, imgWidth, imgHeight);
  var textWidth = pdf.internal.pageSize.width * 0.8;

  // Determine the center position of the text
  var textX = (pdf.internal.pageSize.width - textWidth + 20) / 2;

  // Split the text into lines
  var textLines = pdf.splitTextToSize(text, textWidth);

  // Calculate the center position of the text
  var textY = y + imgHeight + 10;

  // Add the text to the PDF
  pdf.text(textX, textY, textLines);
  // pdf.text(text,30,125)
  let handleDownload = () => {
    if (isSignedin) {
      setAnimateDownload(true)
      setTimeout(() => setAnimateDownload(false), 4000)
      setTimeout(() => pdf.save("certificate.pdf"), 4000)
    } else {
      alert("Please sign in first, to download it")
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
        <button onClick={handleDownload}>Download Certificate</button>

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
