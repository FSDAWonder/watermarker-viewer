import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';

const WaterMarker = ({ docs, setPdfUrl }) => {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputFile, setInputFile] = useState(null);
  const fileRef = useRef();

  const inputHandler = async (event) => {
    const targetFile = event.target.files[0];
    let reader = new FileReader();
    if(targetFile){
      reader.readAsArrayBuffer(targetFile);
      reader.onload = function () {
        setInputFile(reader.result);
        const lengthHistory = history.length;
        setHistoryIndex(lengthHistory);
        setHistory((current) => [...current, reader.result]);
        HandleWaterMarker(reader.result);
      };
      reader.onerror = function () {
        console.log(reader.error);
      };
    }
   
  };

  const HandleWaterMarker = async (imgFile) => {
    const getPdfUrl = docs;
    const existingPdfBytes = await fetch(getPdfUrl).then((res) =>
      res.arrayBuffer()
    );

    const pngImageBytes = await fetch(docs).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const emblemImageBytes = imgFile;

    const pngImage = await pdfDoc.embedPng(emblemImageBytes);
    const pngDims = pngImage.scale(0.5);
    const pages = pdfDoc.getPages();

    for (let i = 0; i < pages.length; i++) {
      pages[i].drawImage(pngImage, {
        x: pages[i].getWidth() / 2 - pngDims.width / 2,
        y: pages[i].getHeight() / 2 - pngDims.height + 150,
        width: pngDims.width,
        height: pngDims.height,
        opacity:0.5,
      });
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const docUrl = URL.createObjectURL(blob);
    setPdfUrl(docUrl);
  };

  async function handleWatermarkPdf() {
    fileRef.current.click();
    return;
  }

  const unDoHandler = async (navBtn) => {
    const imageIndex = navBtn === "prev" ? historyIndex -1 : historyIndex +1 ;
    if(imageIndex >= 0 && imageIndex <= history.length-1){
      const imageFile = history[imageIndex]
      HandleWaterMarker(imageFile)
      setHistoryIndex(imageIndex);
    }
    else if(imageIndex === -1 ){
      setHistoryIndex(imageIndex);
      setPdfUrl("")
    }
  };
const onCancel =() => {
  setPdfUrl("")
}
  return (
    <Stack direction="column">
    <div>
      <Button sx={{ width: 180, padding: 1, margin: 1 }} startIcon={<CloudUploadIcon />} variant="contained" onClick={handleWatermarkPdf}>Add WaterMark</Button>
      <input
        onChange={inputHandler}
        ref={fileRef}
        style={{ display: "none" }}
        type="file"
        accept="image/png"
      ></input>
      <Button sx={{ width: 120, padding: 1, margin: 1 }} startIcon={<UndoIcon />} onClick={() =>unDoHandler("prev")} variant="outlined">Undo</Button>
      <Button sx={{ width: 120, padding: 1, margin: 1 }} startIcon={<RedoIcon />} onClick={() =>unDoHandler("next")} variant="outlined">Redo</Button>
      <CancelIcon className="cancel-icon" onClick={onCancel}/>
      
    </div>
    </Stack>
  );
};

export default WaterMarker;
