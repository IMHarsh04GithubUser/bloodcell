const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const os = require("os");

const app = express();
app.use(cors());

const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "uploads");
const upload = multer({ dest: uploadDir });

app.post("/predict", upload.single("image"), (req, res) => {
  const imagePath = req.file.path;
  const pythonPath = process.env.PYTHON_PATH || "python";
  const predictionScript = process.env.PREDICT_SCRIPT || path.join(__dirname, "predict.py");

  exec(
    `"${pythonPath}" "${predictionScript}" "${imagePath}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(stderr || error.message);
        return res.status(500).json({ error: stderr || error.message });
      }

      res.json({ prediction: stdout.trim() });
    },
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
