// pages/pdf-page.js
"use client";
// pages/pdf-preview.js
import React, { useState } from "react";
import PDFViewer from "@/components/PDFViewer.js";
import MultiFileUpload from "@/components/MultiFileUpload";

import { pdf } from "@react-pdf/renderer";
import Button from "@mui/material/Button";

const PDFPreviewPage = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const data = {
    title: "Example Title",
    content: "Here is some example content...",
    // ...其他数据
  };

  const generatePdfDocument = async () => {
    const blob = await pdf(<PDFViewer data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  return (
    <div>
      <Button variant="contained" onClick={generatePdfDocument}>
        Generate PDF Preview
      </Button>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          width="800"
          height="800"
          style={{ border: "none" }}
        />
      )}
      <div>
        <h1>Upload Multiple Photos</h1>
        <MultiFileUpload />
      </div>
    </div>
  );
};

export default PDFPreviewPage;
