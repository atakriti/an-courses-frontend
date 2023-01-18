import React, { useContext } from "react";
import "./downloadApp.scss";
import { DiAndroid } from "react-icons/di";
import { context } from "../Context";
function DownloadApp() {
  let { languageValue } = useContext(context);
  return (
    <div className="downloadApp">
      <div className="baner1"></div>
      {languageValue === "en" && (
        <span>
          <p>Now you can get this website as an Application on your Android</p>
          <button>
            <DiAndroid />
            <h5>Download</h5>
          </button>
        </span>
          )}
            {languageValue === "عربي" && (
        <span>
          <p>وهلا صار فيك تحمل الموقع على موبايلك الاندرويد كتطبيق</p>
          <button>
            <DiAndroid />
            <h5>تحميل</h5>
          </button>
        </span>
      )}
    </div>
  );
}

export default DownloadApp;
