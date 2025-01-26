 'use client'

import { useEffect } from "react";

// import React, { useEffect, useState } from 'react'
// import Script from 'next/script'

// const LanguageSelector = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState('en')
//   const [isTranslateReady, setIsTranslateReady] = useState(false)

//   useEffect(() => {
//     const initializeTranslate = () => {
//       if (window.google && window.google.translate) {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'en,ta',
//             layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//           },
//           'google_translate_element'
//         )
//         setIsTranslateReady(true)
//       }
//     }

//     if (window.google && window.google.translate) {
//       initializeTranslate()
//     } else {
//       window.googleTranslateElementInit = initializeTranslate
//     }
//   }, [])

//   const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const language = event.target.value
//     setSelectedLanguage(language)

//     if (isTranslateReady) {
//       const googleFrame = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement
//       if (googleFrame) {
//         const dropdown = googleFrame.contentWindow?.document.querySelector('.goog-te-menu2-item div.text') as HTMLDivElement
//         if (dropdown) {
//           dropdown.click()
//           const items = googleFrame.contentWindow?.document.querySelectorAll('.goog-te-menu2-item') as NodeListOf<HTMLDivElement>
//           items.forEach((item) => {
//             if (item.textContent?.includes(language === 'en' ? 'English' : 'Tamil')) {
//               item.click()
//               return
//             }
//           })
//         }
//       }
//     }
//   }

//   return (
//     <>
//       <Script
//         src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//         strategy="lazyOnload"
//         onError={() => console.error('Failed to load Google Translate script')}
//       />
//       <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
//         <select
//           value={selectedLanguage}
//           onChange={handleLanguageChange}
//           style={{ padding: '5px', fontSize: '16px' }}
//         >
//           <option value="en">English</option>
//           <option value="ta">தமிழ் (Tamil)</option>
//         </select>
//         <div id="google_translate_element" style={{ display: 'none' }} />
//       </div>
//     </>
//   )
// }

// export default LanguageSelector

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google:any;
  }
}

const LanguageSelector = () => {

// function LanguageSelector() {
    useEffect(() => {
      const scriptId = "google-translate-script";
      const existingScript = document.getElementById(scriptId);
  
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.type = "text/javascript";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.onload = () => {
          if (window.google && window.google.translate) {
            window.googleTranslateElementInit = function () {
              new window.google.translate.TranslateElement(
                {
                  pageLanguage: "en",
                  includedLanguages: "en,ta",
                  layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: true,
                },
                "google_translate_element"
              );
            };
            window.googleTranslateElementInit();
          }
        };
        script.onerror = () => {
          console.error("Google Translate script failed to load.");
        };
        document.head.appendChild(script);
      }
    }, []);
  
    return <div id="google_translate_element"></div>;
  }

  export default LanguageSelector