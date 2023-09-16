import React from "react";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import fontkit from '@pdf-lib/fontkit';

// eslint-disable-next-line no-lone-blocks
{
  /* Courier = 'Courier',
  CourierBold = 'Courier-Bold',
  CourierOblique = 'Courier-Oblique',
  CourierBoldOblique = 'Courier-BoldOblique',
  Helvetica = 'Helvetica',
  HelveticaBold = 'Helvetica-Bold',
  HelveticaOblique = 'Helvetica-Oblique',
  HelveticaBoldOblique = 'Helvetica-BoldOblique',
  TimesRoman = 'Times-Roman',
  TimesRomanBold = 'Times-Bold',
  TimesRomanItalic = 'Times-Italic',
  TimesRomanBoldItalic = 'Times-BoldItalic',
  Symbol = 'Symbol',
  ZapfDingbats = 'ZapfDingbats',*/
}

const EsignFonts = ({ docs, setPdfUrl, pdfUrl }) => {
  const HandleEsignFonts = async () => {

    const getPdfUrl = docs;
    const existingPdfBytes = await fetch(getPdfUrl).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const fontBytes = require("./Fonts/Roboto-Black.ttf");
    const customFont = await pdfDoc.embedFont(fontBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    firstPage.drawText("This text was added with JavaScript!", {
      x: width / 3 - 200 / 2,
      y: height / 2 + 300,
      size: 30,
      font: customFont,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    });
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const docUrl = URL.createObjectURL(blob);
    setPdfUrl(docUrl);
  };

  return (
    <Stack direction="column">
      <div>
        <Button
          sx={{ width: 180, padding: 1, margin: 1 }}
          variant="contained"
          onClick={HandleEsignFonts}
        >
          Add EsignFonts
        </Button>
        {/* <input
          onChange={inputHandler}
          ref={fileRef}
          style={{ display: "none" }}
          type="file"
          accept="image/png"
        ></input>
        <Button
          disabled={!pdfUrl}
          sx={{ width: 120, padding: 1, margin: 1 }}
          startIcon={<UndoIcon />}
          onClick={() => unDoHandler("prev")}
          variant="outlined"
        >
          Undo
        </Button>
        <Button
          disabled={disableButton}
          sx={{ width: 120, padding: 1, margin: 1 }}
          startIcon={<RedoIcon />}
          onClick={() => unDoHandler("next")}
          variant="outlined"
        >
          Redo
        </Button>
        <CancelIcon className="cancel-icon" onClick={onCancel} /> */}
      </div>
    </Stack>
  );
};

export default EsignFonts;
