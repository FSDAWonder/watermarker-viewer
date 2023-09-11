import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "./App.css";
import WaterMarker from "./Components/WaterMarker";

const App = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  const docs = [
    { uri: require("./sample/sample.pdf"), fileName: "pdf1", fileType: "pdf" },
  ];

  return (
    <div className="App">
      <h1>Document Viewer</h1>
      <WaterMarker docs={docs[0].uri} setPdfUrl={setPdfUrl} />
      {pdfUrl ? (
        <iframe className="iframe" src={pdfUrl} title="description">
         
        </iframe>
      ) : (
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={docs}
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
