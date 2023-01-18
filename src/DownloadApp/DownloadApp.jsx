import React, { useContext } from "react";
import "./downloadApp.scss";
import { DiAndroid } from "react-icons/di";
import { context } from "../Context";
import application from "../app.apk"
function DownloadApp() {
  let { languageValue } = useContext(context);
  return (
    <div className="downloadApp">
      <div className="baner1"></div>
      {languageValue === "en" && (
        <span>
          <p>Now you can get this website as an Application on your Android</p>
          <a href={application} download={application}>
            <DiAndroid />
            <h5>Download</h5>
          </a>
        </span>
          )}
            {languageValue === "عربي" && (
        <span>
          <p>وهلا صار فيك تحمل الموقع على موبايلك الاندرويد كتطبيق</p>
          <a href={application} download={application}>
            <DiAndroid />
            <h5>تحميل</h5>
          </a>
        </span>
      )}
    </div>
  );
}

export default DownloadApp;
