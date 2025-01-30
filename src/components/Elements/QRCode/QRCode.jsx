import { useState } from "react";
import QRCode from "qrcode";

export default function QrCode({ data, alt, className, onFileContent }) {
  const [qrCode, setQrCode] = useState("");

  const generateQRCode = async () => {
    try {
      const base64Image = await QRCode.toDataURL(data, {
        errorCorrectionLevel: "H",
      });
      setQrCode(base64Image);
      if (onFileContent) {
        onFileContent(qrCode);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  useState(() => {
    generateQRCode();
  }, [data]);

  return (
    <>
      {qrCode && (
        <img src={qrCode} alt={alt} className={`object-cover ${className}`} />
      )}
    </>
  );
}
