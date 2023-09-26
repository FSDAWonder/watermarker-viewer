import { render, screen } from '@testing-library/react';
import App from './App';
import DocViewer from "@cyntler/react-doc-viewer";

test('component render or not', () => {
  render(<App />);
  const linkElement = screen.getByText(/Document Viewer/i);
  expect(linkElement).toBeInTheDocument();
});

test("component render with no documents", () => {
  render(<DocViewer documents={[]} />);
  const linkElement = screen.getByTestId("react-doc-viewer");
  expect(linkElement).toMatchSnapshot();
});
