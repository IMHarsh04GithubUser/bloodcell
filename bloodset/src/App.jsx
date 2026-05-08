import { useState } from "react";
import axios from "axios";
import cellInfo from "./Cells";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Image Selection
  const handleImageChange = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  };

  // Upload Image
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/predict", formData);

      setResult(res.data.prediction.toLowerCase());
    } catch (err) {
      console.error(err);
      alert("Error predicting image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="bg-linear-to-r from-indigo-700 to-purple-700 py-6 text-center shadow-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-cyan-300 px-4 leading-snug hover:scale-105 transition-all duration-300">
          Blood Cell Classification using Transfer Learning
          <br className="hidden md:block" />
          and Stacking Ensemble
        </h1>


      </div>

      {/* MAIN SECTION */}
      <div className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-10 overflow-hidden">
        {/* FLEX CONTAINER */}
        <div className="flex flex-col xl:flex-row gap-8 items-start justify-center w-full max-w-7xl">
          {/* LEFT CARD */}
          <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-3xl p-6 sm:p-8 border border-white/20 hover:scale-[1.02] transition duration-500">
            {/* TITLE */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 text-center">
              🧬 AI Blood Cell Health Analyzer
            </h1>

            {/* Upload Area */}
            <label className="cursor-pointer block">
              <div className="border-2 border-dashed border-white/40 rounded-2xl p-8 hover:bg-white/10 transition duration-300">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="text-5xl">📤</div>

                  <p className="text-white text-sm sm:text-base font-medium">
                    Click to upload blood cell image
                  </p>

                  <p className="text-gray-300 text-xs">JPG, PNG supported</p>
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </label>

            {/* Image Preview */}
            {preview && (
              <div className="mt-6">
                <img
                  src={preview}
                  alt="preview"
                  className="rounded-2xl w-full h-60 object-cover border border-white/30 shadow-2xl"
                />
              </div>
            )}

            {/* Predict Button */}
            {!result && (
              <button
                onClick={handleUpload}
                className="mt-6 w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 sm:py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-cyan-500/40"
              >
                {loading ? "🔄 Predicting..." : "🚀 Analyze Cell"}
              </button>
            )}

            {/* Prediction Result */}
            {result && (
              <div className="mt-6 bg-white/10 rounded-2xl p-5 border border-white/20 shadow-xl text-left">
                <p className="text-gray-200 text-sm mb-2 uppercase tracking-wider">
                  Prediction Result
                </p>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-green-300 capitalize mb-5">
                  {cellInfo[result]?.name || result}
                </h2>

                <div className="space-y-4 text-white text-sm sm:text-base">
                  {/* Description */}
                  <div className="bg-white/10 rounded-xl p-3">
                    <strong className="text-cyan-300">Description:</strong>

                    <p className="mt-1">{cellInfo[result]?.description}</p>
                  </div>

                  {/* Function */}
                  <div className="bg-white/10 rounded-xl p-3">
                    <strong className="text-pink-300">Function:</strong>

                    <p className="mt-1">{cellInfo[result]?.function}</p>
                  </div>

                  {/* Problems */}
                  <div className="bg-red-500/20 border border-red-400 rounded-xl p-3 text-red-200">
                    <strong>Possible Problems:</strong>

                    <p className="mt-2">{cellInfo[result]?.problems}</p>
                  </div>

                  {/* Note */}
                  <div className="bg-yellow-500/20 border border-yellow-400 rounded-xl p-3 text-yellow-200">
                    ⚠️ {cellInfo[result]?.note}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT CARD */}
          {result && (
            <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-3xl p-6 sm:p-8 border border-white/20 hover:scale-[1.02] transition duration-500">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-cyan-300 mb-6 text-center">
                📊 Health Information
              </h2>

              {/* Normal Range */}
              <div className="bg-white/10 rounded-2xl p-5 mb-6 shadow-lg">
                <p className="text-white font-semibold text-lg">Normal Range</p>

                <p className="text-green-300 text-3xl font-bold mt-3">
                  {cellInfo[result]?.range}
                </p>
              </div>

              {/* Remedies */}
              {cellInfo[result]?.remedies && (
                <div className="bg-white/10 rounded-2xl p-5 shadow-lg">
                  <h3 className="text-pink-300 text-xl font-bold mb-4">
                    💡 Remedies & Health Tips
                  </h3>

                  <ul className="space-y-4 text-white text-sm sm:text-base">
                    {cellInfo[result]?.remedies.map((tip, index) => (
                      <li
                        key={index}
                        className="bg-white/10 rounded-xl p-3 border border-white/10"
                      >
                        ✅ {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-linear-to-r from-indigo-700 to-purple-700 backdrop-blur-lg border-t border-white/10 py-5 text-center">
        <h2 className="text-white text-lg md:text-xl font-semibold">
          Guided By
        </h2>

        <p className="text-cyan-300 text-xl md:text-2xl font-bold mt-2">
          Dr. Cosmena Mahapatra
        </p>

        <p className="text-gray-300 text-sm mt-2">
          Mentor of the Project and Professor <br /> VIVEKANANDA INSTITUTE OF PROFESSIONAL STUDIES - TC
        </p>

        <p className="text-gray-400 text-xs mt-3">
          © 2026 Blood Cell Analysis & Health Advisor
        </p>
      </footer>
    </>
  );
}

export default App;
