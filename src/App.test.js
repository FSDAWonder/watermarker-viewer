import { render, screen, waitFor, queryByTestId } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import DocViewer from "@cyntler/react-doc-viewer";
import samplePdf from './asserts/pdf/sample.pdf'
import WaterMarker from './Components/WaterMarker';
import userEvent from '@testing-library/user-event';
// import {
//   // getByLabelText,
//   // getByText,
//   // getByTestId,
//   queryByTestId,
//   // Tip: all queries are also exposed on an object
//   // called "queries" which you could import here as well
//   waitFor
// } from '@testing-library/dom'


// const mockPdfData = [{
//   'uri': samplePdf,
//   'name': 'sample',
//   'fileType': 'pdf'
// }]

test('component render or not', () => {
  render(<App />);
  const linkElement = screen.getByText(/Document Viewer/i);
  expect(linkElement).toBeInTheDocument();
});

test("component render with no documents", () => {
  render(<DocViewer documents={[]} />);
  const linkElement = screen.getByTestId("react-doc-viewer");
  expect(linkElement).toBeInTheDocument();
});

test("component render with pdf documents", () => {
  render(<App />);
  const linkElement = screen.getByTestId('docViewer');
  expect(linkElement).toBeInTheDocument();
});

test("add watermark button is there", () => {
  render(<App />);
  const linkElement = screen.getByText(/add watermark/i);
  expect(linkElement).toBeInTheDocument();
});

// test("click add watermark button and select image to show watermark pdf", async () => {
//   render(<WaterMarker />);
//   userEvent.click(screen.getByTestId('input-handler'));

//   await waitFor(() => {
//     expect(screen.getByTestId('watermark-added-pdfUrl')).toBeInTheDocument();
//   })

// });
