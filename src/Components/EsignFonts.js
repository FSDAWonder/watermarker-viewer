import React, { useState, useEffect } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import fontkit from "@pdf-lib/fontkit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import Done from "@mui/icons-material/Done";

import "@fontsource/pacifico";
import StyleScript from "./Fonts/StyleScript/StyleScript-Regular.ttf";
import Fasthand from "./Fonts/Fasthand/Fasthand-Regular.ttf";
import Pacifico from "./Fonts/Pacifico/Pacifico-Regular.ttf";
import Allison from "./Fonts/Allison/Allison-Regular.ttf";
import GreatVibes from "./Fonts/GreatVibes/GreatVibes-Regular.ttf";
import Monsieur from "./Fonts/MonsieurLaDoulaise/MonsieurLaDoulaise-Regular.ttf";
import PinyonScript from "./Fonts/PinyonScript/PinyonScript-Regular.ttf";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import _ from "lodash";

const EsignFonts = ({ docs, setPdfUrl }) => {
  const [font, setFont] = useState("");
  const [message, setMessage] = useState("");
  const [updated, setUpdated] = useState("");
  const [showManuItem, setMenuItem] = useState(true);
  const [fontColor, setFontColor] = useState(rgb(0, 0.53, 0.71));
  const [userSign, setUserSign] = useState("");
  const [userFont, setUserFont] = useState("");
  const [fontSign, setFontSign] = useState([]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
    setUpdated(message);
    setMessage("");
    if (message.length > 0) {
      setMenuItem(false);
    } else {
      setMenuItem(true);
    }
  };
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get("http://localhost:5000/api/fonts");
      setFontSign(response.data);
    };
    fetchContacts();
  }, []);

  const HandleStyleFont = async (fontName) => {
    const getPdfUrl = docs;
    const existingPdfBytes = await fetch(getPdfUrl).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    let GetCustomFont = "";
    if (fontName === "StyleScript") {
      GetCustomFont = StyleScript;
    } else if (fontName === "Fasthand") {
      GetCustomFont = Fasthand;
    } else if (fontName === "Allison") {
      GetCustomFont = Allison;
    } else if (fontName === "Monsieur") {
      GetCustomFont = Monsieur;
    } else if (fontName === "Pacifico") {
      GetCustomFont = Pacifico;
    } else if (fontName === "Pinyon") {
      GetCustomFont = PinyonScript;
    } else if (fontName === "GreatVibes") {
      GetCustomFont = GreatVibes;
    }
    const fontBytes = await fetch(GetCustomFont).then((res) =>
      res.arrayBuffer()
    );
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);
    const pages = pdfDoc.getPages();

    const text = updated;
    const textSize = 30;
    const textWidth = customFont.widthOfTextAtSize(text, textSize);
    const textHeight = customFont.heightAtSize(textSize);
    const textColor = fontColor;

    for (let i = 0; i < pages.length; i++) {
      pages[i].drawText(text, {
        x: pages[i].getWidth() / 2 - textWidth / 2,
        y: pages[i].getHeight() / 2 - textHeight + 150,
        font: customFont,
        size: textSize,
        color: textColor,
        opacity: 0.5,
      });
    }
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    const docUrl = URL.createObjectURL(blob);
    setPdfUrl(docUrl);
    setUserSign(updated);
    setUserFont(fontName);
  };

  const handleChange = (event) => {
    const targetValue = event.target.value;
    if (targetValue) {
      HandleStyleFont(targetValue);
    }
    setFont(event.target.value);
  };

  const colorPicker = (event) => {
    if (event.target.value === "primary") {
      setFontColor(rgb(0, 0.53, 0.71));
    } else {
      setFontColor(rgb(0.95, 0.1, 0.1));
    }
  };

  const saveFontSignHandler = async () => {
    if (userSign && userFont) {
      const res = await axios.post("http://localhost:5000/api/fonts", {
        userSign,
        userFont,
      });

      setFontSign((preValue) => {
        return [...preValue, res.data];
      });
    }
  };

  const deleteFont = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this Signature?"
    );

    if (userConfirmed) {
      await axios.delete(`http://localhost:5000/api/fonts/${id}`);
      const updatedFont = fontSign.filter((font) => font._id !== id);
      setFontSign(updatedFont);
    }
  };

  const putSignFont = async (id) => {
    if (id) {
      const getFontSign = _.filter(fontSign, { _id: id });
      const filteredData = getFontSign.length > 0 ? getFontSign[0] : {};
      const getPdfUrl = docs;
      const existingPdfBytes = await fetch(getPdfUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      let GetCustomFont = "";
      if (filteredData.userFont === "StyleScript") {
        GetCustomFont = StyleScript;
      } else if (filteredData.userFont === "Fasthand") {
        GetCustomFont = Fasthand;
      } else if (filteredData.userFont === "Allison") {
        GetCustomFont = Allison;
      } else if (filteredData.userFont === "Monsieur") {
        GetCustomFont = Monsieur;
      } else if (filteredData.userFont === "Pacifico") {
        GetCustomFont = Pacifico;
      } else if (filteredData.userFont === "Pinyon") {
        GetCustomFont = PinyonScript;
      } else if (filteredData.userFont === "GreatVibes") {
        GetCustomFont = GreatVibes;
      }
      const fontBytes = await fetch(GetCustomFont).then((res) =>
        res.arrayBuffer()
      );
      pdfDoc.registerFontkit(fontkit);
      const customFont = await pdfDoc.embedFont(fontBytes);
      const pages = pdfDoc.getPages();

      const text = filteredData.userSign;
      const textSize = 30;
      const textWidth = customFont.widthOfTextAtSize(text, textSize);
      const textHeight = customFont.heightAtSize(textSize);
      const textColor = fontColor;

      for (let i = 0; i < pages.length; i++) {
        pages[i].drawText(text, {
          x: pages[i].getWidth() / 2 - textWidth / 2,
          y: pages[i].getHeight() / 2 - textHeight + 150,
          font: customFont,
          size: textSize,
          color: textColor,
          opacity: 0.5,
        });
      }
      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      const docUrl = URL.createObjectURL(blob);
      setPdfUrl(docUrl);
    }
  };

  return (
    <Stack direction="row" justifyContent="center">
      <div>
        <p>Saved Signatures</p>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Signature</TableCell>
                <TableCell align="right">Font Family</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fontSign.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.userSign}
                  </TableCell>
                  <TableCell align="right">{row.userFont}</TableCell>
                  <TableCell align="left">
                    <span onClick={() => putSignFont(row._id)}>
                      <AddCircleOutlineIcon />
                    </span>
                    <span onClick={() => deleteFont(row._id)}>
                      <DeleteIcon />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              onChange={handleInputChange}
              value={message}
              size="small"
              id="outlined-required"
              label="Enter Text"
            />
          </div>

          <Button sx={{ width: 110 }} variant="contained" onClick={handleClick}>
            Add Text
          </Button>

          <div>
            <FormLabel
              id="product-color-attribute"
              sx={{
                mt: 1.5,
                mb: 1.5,
                fontWeight: "xl",
                textTransform: "uppercase",
                fontSize: "xs",
                letterSpacing: "0.1em",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              Pick a Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="product-color-attribute"
              defaultValue="primary"
              sx={{
                gap: 2,
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {["primary", "danger"].map((color) => (
                <Sheet
                  key={color}
                  sx={{
                    position: "relative",
                    width: 40,
                    height: 40,
                    flexShrink: 0,
                    bgcolor: `${color}.solidBg`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Radio
                    onClick={colorPicker}
                    overlay
                    variant="solid"
                    color={color}
                    checkedIcon={<Done fontSize="xl2" />}
                    value={color}
                    slotProps={{
                      input: { "aria-label": color },
                      radio: {
                        sx: {
                          display: "contents",
                          "--variant-borderWidth": "2px",
                        },
                      },
                    }}
                  />
                </Sheet>
              ))}
            </RadioGroup>
          </div>
        </Box>
      </div>
      <div>
        {updated && <h3>Added Esign Text: {updated}</h3>}
        <h3 className="font"> Choose Esign Font</h3>

        <FormControl sx={{ m: 0.5, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Font</InputLabel>
          <Select
            disabled={showManuItem}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={font}
            onChange={handleChange}
            autoWidth
            label="Font"
          >
            <MenuItem value={"Fasthand"}>Fasthand</MenuItem>
            <MenuItem value={"Pinyon"}>Pinyon</MenuItem>
            <MenuItem value={"StyleScript"}>Style Script</MenuItem>
            <MenuItem value={"Monsieur"}>Monsieur</MenuItem>
            <MenuItem value={"Allison"}>Allison</MenuItem>
            <MenuItem value={"GreatVibes"}>GreatVibes</MenuItem>
            <MenuItem value={"Pacifico"}>Pacifico</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        {updated && font && (
          <Button
            updated={updated}
            className="saveBtn"
            variant="contained"
            onClick={saveFontSignHandler}
          >
            Save this signature & Font
          </Button>
        )}
      </div>
    </Stack>
  );
};

export default EsignFonts;
