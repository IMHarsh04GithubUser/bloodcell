const formidable = require("formidable");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const uploadDir = path.join(__dirname, "..", "uploads");
    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 20 * 1024 * 1024,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      resolve({ fields, files });
    });
  });

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are supported." });
  }

  try {
    const { files } = await parseForm(req);
    const imageFile = files?.image || files?.file;
    const imagePath = imageFile?.filepath || imageFile?.path;

    if (!imagePath) {
      return res.status(400).json({ error: "Missing image file in the request." });
    }

    const predictionScript = process.env.PREDICT_SCRIPT || path.join(__dirname, "..", "predict.py");

    if (!fs.existsSync(predictionScript)) {
      return res.status(500).json({
        error:
          "Prediction script not found. Place your inference script at backend/predict.py or set PREDICT_SCRIPT.",
      });
    }

    const pythonCommand = process.env.PYTHON_PATH || "python";
    const command = `"${pythonCommand}" "${predictionScript}" "${imagePath}"`;

    exec(command, { timeout: 120000 }, (error, stdout, stderr) => {
      if (error) {
        console.error("Prediction error:", stderr || error.message);
        return res.status(500).json({ error: stderr || error.message });
      }

      return res.json({ prediction: stdout.trim() });
    });
  } catch (error) {
    console.error("Upload parse error:", error);
    return res.status(500).json({ error: error.message || "Failed to parse upload." });
  }
};
