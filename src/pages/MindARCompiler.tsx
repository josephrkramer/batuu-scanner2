import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MindARCompiler = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState<string>("Idle");
  const [progress, setProgress] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  // We need to wait for MindAR to be ready
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkReady = () => {
      if (
        window.MINDAR &&
        window.MINDAR.IMAGE &&
        window.MINDAR.IMAGE.Compiler
      ) {
        setIsReady(true);
      }
    };

    if (window.MINDAR?.IMAGE?.Compiler) {
      checkReady();
    } else {
      window.addEventListener("mindar-ready", checkReady);
    }

    return () => window.removeEventListener("mindar-ready", checkReady);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
      setDownloadUrl(null);
      setStatus("Ready to compile");
    }
  };

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
      // Clean up URL after load logic if needed, but here we keep it for compilation usage
    });
  };

  const startCompilation = async () => {
    if (!isReady || images.length === 0) return;

    setIsCompiling(true);
    setStatus("Loading images...");
    setProgress(0);
    setDownloadUrl(null);

    // Define outside try block for cleanup access
    const imageElements: HTMLImageElement[] = [];
    try {
      for (const file of images) {
        const img = await loadImage(file);
        imageElements.push(img);
      }

      const compiler = new window.MINDAR.IMAGE.Compiler();

      setStatus("Compiling... This may take a while.");
      const dataList = await compiler.compileImageTargets(
        imageElements,
        (p: number) => {
          setProgress(p);
          setStatus(`Compiling: ${p.toFixed(1)}%`);
        },
      );
      console.log("Compiled data info:", dataList);

      setStatus("Exporting data...");
      const exportedBuffer = await compiler.exportData();

      // Create Blob
      const blob = new Blob([exportedBuffer], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus("Compilation Complete!");
    } catch (error) {
      console.error("Compilation failed", error);
      setStatus("Error: " + (error as Error).message);
    } finally {
      setIsCompiling(false);
      // Clean up object URLs to avoid memory leaks
      imageElements.forEach((img) => {
        if (img.src.startsWith("blob:")) {
          URL.revokeObjectURL(img.src);
        }
      });
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#333",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      <h1>MindAR Image Compiler</h1>
      {!isReady && (
        <div style={{ color: "orange" }}>Loading MindAR library...</div>
      )}

      <div
        style={{
          background: "#222",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h3>1. Select Images</h3>
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          disabled={isCompiling}
          style={{ marginBottom: "10px" }}
        />
        <div style={{ fontSize: "0.9em", color: "#aaa" }}>
          Supported: PNG, JPG. First image is target 0, second is 1, etc.
        </div>

        {images.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <strong>Selected:</strong>
            <ul>
              {images.map((img, i) => (
                <li key={i}>{img.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div
        style={{
          background: "#222",
          padding: "20px",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <h3>2. Compile</h3>
        <button
          onClick={startCompilation}
          disabled={!isReady || isCompiling || images.length === 0}
          style={{
            background: isCompiling ? "#555" : "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {isCompiling ? "Compiling..." : "Start Compilation"}
        </button>

        <div style={{ marginTop: "15px" }}>
          <strong>Status:</strong> {status}
        </div>

        {progress > 0 && progress < 100 && (
          <div
            style={{
              width: "100%",
              height: "10px",
              background: "#444",
              marginTop: "10px",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "#00ff00",
                borderRadius: "5px",
                transition: "width 0.3s",
              }}
            ></div>
          </div>
        )}
      </div>

      {downloadUrl && (
        <div
          style={{
            background: "#1a1a1a",
            padding: "20px",
            borderRadius: "8px",
            marginTop: "20px",
            border: "1px solid #444",
          }}
        >
          <h3>3. Download</h3>
          <a
            href={downloadUrl}
            download="targets.mind"
            style={{
              display: "inline-block",
              background: "#28a745",
              color: "white",
              textDecoration: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Download targets.mind
          </a>
        </div>
      )}
    </div>
  );
};

export default MindARCompiler;
