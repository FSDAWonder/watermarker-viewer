import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "./App.css";
import WaterMarker from "./Components/WaterMarker";

const App = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  const docs = [
    { uri: require("./sample/xpro.pdf"), fileName: "pdf", fileType: "pdf" },
    // { uri: "https://docs.google.com/spreadsheets/d/1ylrv10lHZZRRqdLvo_5RTKFwYA8jsOtI_TkXGJxzeWI/edit#gid=0"},

    // { uri: require("./sample/xpro.docx"), fileName: "doc1", fileType: "docx" },
  ];

  return (
    <div className="App">
      <h1 className="heading">Document Viewer</h1>
      <WaterMarker docs={docs[0].uri} setPdfUrl={setPdfUrl} />
     
      {pdfUrl ? (
        <iframe className="iframe" src={pdfUrl} title="description">
         
        </iframe>
      ) : (
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
          className="my-doc-viewer-style"
          style={{width: 1350, height: 500}} 
          theme={{
            primary: "#5296d8",
            secondary: "#ffffff",
            tertiary: "#5296d899",
            textPrimary: "#ffffff",
            textSecondary: "#5296d8",
            textTertiary: "#00000099",
            disableThemeScrollbar: false,
          }}
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
