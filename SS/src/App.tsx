// import { useState } from "react";
// import html2canvas from "html2canvas";

// const App: React.FC = () => {
//   const [buffer, setBuffer] = useState<string | null>(null);

//   const downloadImage = (image: string | null) => {
//     if (image) {
//       // Check if image is not null
//       const link = document.createElement("a");
//       link.href = image; // The screenshot Base64 data
//       link.download = `screenshot_${Date.now()}.png`; // Set the download filename
//       document.body.appendChild(link);
//       link.click(); // Trigger the download
//       document.body.removeChild(link); // Clean up
//     }
//   };

//   const sendToApi = async (dataUrl: string) => {
//     const apiUrl = "https://your-api-endpoint.com/upload"; // Replace with your API endpoint

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", // Specify content type
//         },
//         body: JSON.stringify({ image: dataUrl }), // Send the data URL in the body
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const result = await response.json(); // Parse the JSON response if needed
//       console.log("Success:", result); // Handle the success response
//     } catch (error) {
//       console.error("Error sending data to API:", error); // Handle errors
//     }
//   };

//   const handleCaptureScreenshot = async () => {
//     await document.fonts.ready; // Ensure fonts are loaded
//     const element = document.body; // Change this to the specific element if needed

//     const screenshot = await html2canvas(element, {
//       backgroundColor: null, // Capture background color
//       useCORS: true, // Enable CORS for images
//     });

//     if (screenshot) {
//       const dataUrl = screenshot.toDataURL("image/png");
//       console.log(dataUrl);
//       setBuffer(dataUrl); // Update the state with the screenshot buffer
//       downloadImage(dataUrl); // Call the function to download the image
//       await sendToApi(dataUrl); // Call the API function
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Your Final Cart and Click to confirm your Order!!! </h1>
//       <button onClick={handleCaptureScreenshot}>Capture Screenshot</button>
//       {buffer && (
//         <div
//           style={{
//             position: "absolute",
//             bottom: "20px",
//             left: "20px",
//             backgroundColor: "rgba(255, 255, 255, 0.8)",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//             padding: "10px",
//             boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//             zIndex: 1000, // Ensures it appears above other elements
//           }}
//         >
//           <h2 style={{ fontSize: "14px", margin: "0" }}>Screenshot Buffer:</h2>
//           <pre style={{ fontSize: "12px", margin: "5px 0 0 0" }}>
//             Buffer length: {buffer.length} characters
//           </pre>
//           <img
//             src={buffer}
//             alt="Screenshot"
//             style={{ maxWidth: "100px", marginTop: "5px" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

//Second Code

import { useState } from "react";
import html2canvas from "html2canvas";

const App: React.FC = () => {
  const [buffer, setBuffer] = useState<string | null>(null);

  const downloadImage = (image: string | null) => {
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = `screenshot_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const sendToApi = async (dataUrl: string) => {
    const apiUrl = "https://your-api-endpoint.com/upload"; // Replace with your API endpoint

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: dataUrl }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  const handleCaptureScreenshot = async () => {
    await document.fonts.ready;
    const element = document.body;

    const screenshot = await html2canvas(element, {
      backgroundColor: null,
      useCORS: true,
    });

    if (screenshot) {
      const dataUrl = screenshot.toDataURL("image/png");
      console.log(dataUrl);
      setBuffer(dataUrl);
      downloadImage(dataUrl);
      await sendToApi(dataUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        Your Final Cart and Click to confirm your Order!!!
      </h1>
      <button
        onClick={handleCaptureScreenshot}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Capture Screenshot
      </button>
      {buffer && (
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 border border-gray-300 rounded p-4 shadow-lg z-50">
          <h2 className="text-sm font-semibold mb-1">Screenshot Buffer:</h2>
          <pre className="text-xs mb-1">
            Buffer length: {buffer.length} characters
          </pre>
          <img
            src={buffer}
            alt="Screenshot"
            className="max-w-xs mt-1 border border-gray-200 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default App;
