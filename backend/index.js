const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const app = express();
app.use(cors());

const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "uploads");
const upload = multer({ dest: uploadDir });

app.post("/predict", upload.single("image"), (req, res) => {
  const imagePath = req.file.path;
  const pythonPath = process.env.PYTHON_PATH || "python";

  let predictionScript = process.env.PREDICT_SCRIPT;
  if (!predictionScript) {
    const localScript = path.join(__dirname, "predict.py");
    const externalScript = path.resolve("D:/Domain/ML-Project/predict.py");
    if (fs.existsSync(localScript)) {
      predictionScript = localScript;
    } else if (fs.existsSync(externalScript)) {
      predictionScript = externalScript;
    } else {
      predictionScript = localScript;
    }
  }

  exec(
    `"${pythonPath}" "${predictionScript}" "${imagePath}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error("Prediction error:", stderr || error.message);
        return res.status(500).json({ error: stderr || error.message });
      }

      res.json({ prediction: stdout.trim() });
    },
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
