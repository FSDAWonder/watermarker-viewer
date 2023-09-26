import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "./App.css";
// eslint-disable-next-line no-unused-vars
import WaterMarker from "./Components/WaterMarker";
// eslint-disable-next-line no-unused-vars
// import EsignFonts from "./Components/EsignFonts";


const App = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  const docs = [
    // { uri: "https://xpropellerassets.s3.us-east-1.amazonaws.com/aa61b50c-91c0-4504-b79b-92816b10749a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA4KFTRSDJ2TEDWW57%2F20230923%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230923T045044Z&X-Amz-Expires=3600&X-Amz-Signature=2b4878fbf8ab2fef253bdcbd1404f1860263a7fb5a6db54b6c4e289f42fb9248&X-Amz-SignedHeaders=host&x-id=GetObject"}
    { uri: require("./sample/xpro.pdf"), fileName: "pdf", fileType: "pdf" },

  ];
  
  return (
    <div className="App">
      <h className="heading">Document Viewer</h>
      <WaterMarker docs={docs[0].uri} setPdfUrl={setPdfUrl} pdfUrl={pdfUrl} />
      {/* <EsignFonts docs={docs[0].uri} setPdfUrl={setPdfUrl} pdfUrl={pdfUrl}  /> */}
      {pdfUrl ? (
        <iframe className="iframe" src={pdfUrl} title="description"></iframe>
      ) : (
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
         
          style={{ width: 1350, height: 500 }}
          
          prefetchMethod="GET"
          config={{
            header: {
              disableHeader: false,
              disableFileName: false,
              retainURLParams: false,
            },
          }}
        />
      )}
    </div>
  );
};

export default App;
