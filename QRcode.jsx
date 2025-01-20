import React, { useState } from "react";

export const QRcode = () => {
    const [img, setImg] = useState("");  
    const [loading, setLoading] = useState(false);
    const [qrData, setQRData] = useState("");
    const [imageSize, setImageSize] = useState("");

    async function generateQR() {
        if (!qrData.trim()) {
            alert("Please provide data for the QR code.");
            return;
        }
        if (!imageSize.trim() || isNaN(imageSize) || imageSize <= 0) {
            alert("Please provide a valid image size (e.g., 150).");
            return;
        }

        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${imageSize}x${imageSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        } catch (error) {
            console.error("Error generating the QR code", error);
        } finally {
            setLoading(false);
        }
    }

    function downloadQR() {
        if (!img) {
            alert("Please generate a QR code first!");
            return;
        }
        const link = document.createElement("a");
        link.href = img;
        link.download = "QRCode.png";
        link.click();
    }

    return (
        <div className="app-container">
            <h1>QR CODE GENERATOR</h1>
            {loading ? <p>Please Wait....</p> : null}
            {img && <img src={img} alt="Generated QR Code" className="qr-code-img" />}
            <label htmlFor="dataInput" className="input-label">DATA FOR QR CODE:</label>
            <input
                type="text"
                id="dataInput"
                value={qrData}
                onChange={(e) => setQRData(e.target.value)}
                placeholder="Enter data for QR Code"
            />
            <label htmlFor="sizeInput" className="input-label">IMAGE SIZE (e.g., 150):</label>
            <input
                type="text"
                id="sizeInput"
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value)}
                placeholder="Enter the Image Size"
            />
            <div className="button-container">
                <button onClick={generateQR}>GENERATE QR CODE</button>
                <button onClick={downloadQR}>DOWNLOAD QR CODE</button>
            </div>
        </div>
    );
};

export default QRcode;
