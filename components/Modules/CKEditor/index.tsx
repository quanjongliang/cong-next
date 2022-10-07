import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  DialogActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        // {
        //   color: [
        //     "#000000",
        //     "#e60000",
        //     "#ff9900",
        //     "#ffff00",
        //     "#008a00",
        //     "#0066cc",
        //     "#9933ff",
        //     "#ffffff",
        //     "#facccc",
        //     "#ffebcc",
        //     "#ffffcc",
        //     "#cce8cc",
        //     "#cce0f5",
        //     "#ebd6ff",
        //     "#bbbbbb",
        //     "#f06666",
        //     "#ffc266",
        //     "#ffff66",
        //     "#66b966",
        //     "#66a3e0",
        //     "#c285ff",
        //     "#888888",
        //     "#a10000",
        //     "#b26b00",
        //     "#b2b200",
        //     "#006100",
        //     "#0047b2",
        //     "#6b24b2",
        //     "#444444",
        //     "#5c0000",
        //     "#663d00",
        //     "#666600",
        //     "#003700",
        //     "#002966",
        //     "#3d1466",
        //   ],
        // },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function Editor() {
  const [value, setValue] = useState("");
  const [openPreview, setOpenPreview] = useState(false);

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };
  return (
    <Grid>
      <Button onClick={handleOpenPreview}>Open Preview</Button>
      <Dialog fullWidth open={openPreview} onClose={handleClosePreview}>
        <Grid p={3} display="flex" justifyContent="space-between">
          <Typography variant="h4">Preview</Typography>
          <Button onClick={handleClosePreview}>Close</Button>
        </Grid>
        <DialogContent>
          <Grid>
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </Grid>
        </DialogContent>
      </Dialog>
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        onChange={setValue}
        style={{
          height: 300,
        }}
      />
    </Grid>
  );
}
