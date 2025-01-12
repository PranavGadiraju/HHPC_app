import React, { useRef } from "react";
import { WebView } from 'react-native-webview'; // Import WebView

const injectedJS = `
  (function() {
    try {
      const selectors = {
        header: 'header, #header, .header',
        footer: 'footer, #footer, .footer',
      };

      Object.entries(selectors).forEach(([key, selector]) => {
        const element = document.querySelector(selector);
        if (element) {
          element.style.display = 'none';
          window.ReactNativeWebView.postMessage(\`\${key.charAt(0).toUpperCase() + key.slice(1)} hidden successfully\`);
        } else {
          window.ReactNativeWebView.postMessage(\`\${key.charAt(0).toUpperCase() + key.slice(1)} not found\`);
        }
      });
    } catch (error) {
      window.ReactNativeWebView.postMessage(\`Error: \${error.message}\`);
    }
  })();
  true;
`;



const WebViewComponent = ({ uri }) => {
  const webviewRef = useRef(null);

  const handleLoadEnd = () => console.log(`WebView Loaded: ${uri}`);

  return (
    <WebView
      ref={webviewRef}
      source={{ uri }}
      style={{ flex: 1 }}
      scrollEnabled={true}
      onLoadEnd={handleLoadEnd}
      javaScriptEnabled={true}
      injectedJavaScript={injectedJS}
      onMessage={(event) => console.log("Message from WebView:", event.nativeEvent.data)}
    />
  );
};

export default WebViewComponent;

// Usage
//const ContactFragment = () => <WebViewComponent uri="http://hankehenryontime.com/html/contact.html" />;
//const MediaFragment = () => <WebViewComponent uri="http://hankehenryontime.com/html/media.html" />;
//const QAndAFragment = () => <WebViewComponent uri="http://hankehenryontime.com/html/qanda.html" />;
