const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });


app.post("/predict", upload.single("image"), (req, res) => {
  const imagePath = req.file.path;

  exec(
    `"C:/Users/Harsh/anaconda3/envs/minor_project_env/python.exe" "D:/Domain/ML-Project/predict.py" "${imagePath}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        return res.status(500).json({ error: stderr });
      }

      res.json({ prediction: stdout.trim() });
    },
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
