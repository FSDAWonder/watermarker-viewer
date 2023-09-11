import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

const WaterMarker = ({docs, setPdfUrl}) => {


  async function handleWatermarkPdf(file, opacityValue) {

    const getPdfUrl = docs;
    const existingPdfBytes = await fetch(getPdfUrl).then((res) =>
      res.arrayBuffer()
    );

    const pngImageBytes = await fetch(docs).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const emblemUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKiM295NpkVb8jzMlWEcyfUf29CDhpQEVlpwQ1KweMavnhsC1oSaQWHYRedlssSuw43OY&usqp=CAU";
    const emblemImageBytes = await fetch(emblemUrl).then((res) =>
      res.arrayBuffer()
    );
    const pngImage = await pdfDoc.embedPng(emblemImageBytes);
    const pngDims = pngImage.scale(0.5);
    const pages = pdfDoc.getPages();

    for (let i = 0; i < pages.length; i++) {
      pages[i].drawImage(pngImage, {
        x: pages[i].getWidth() / 2 - pngDims.width / 2,
        y: pages[i].getHeight() / 2 - pngDims.height + 150,
        width: pngDims.width,
        height: pngDims.height,
        // opacity: opacityValue,
      });
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    console.log("blob", blob);
    
    
    const docUrl = URL.createObjectURL(blob);
    setPdfUrl(docUrl);
    localStorage.setItem("setInLocalBlob",docUrl);
    // console.log("blob:", docUrl);
  }

const unDoHandler = async ({pdfBytes}) =>{
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const docUrl = URL.revokeObjectURL(blob);
    setPdfUrl(docUrl);
    
}

// const reDoHandler = async ({pdfBytes}) =>{
    
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });
//     const fromPrevBlob = localStorage.getItem("setInLocalBlob");
//     console.log("fromPrev", fromPrevBlob);

//     const docUrl = URL.createObjectURL(fromPrevBlob);
//     console.log("doc", docUrl)
//     setPdfUrl(docUrl);
   
// }

  return (
    <div>
      <button onClick={handleWatermarkPdf}>Add WaterMark</button>
      <button onClick={unDoHandler}>Undo</button>
      {/* <button onClick={reDoHandler}>Redo</button> */}
    </div>
  );
};

export default WaterMarker;
