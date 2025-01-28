"use client";

import React, { useState } from "react";
import  QrReader  from "react-qr-reader";

const QRScanner = () => {
  const [qrData, setQrData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to handle the result from the QR reader
  const handleScanResult = (result: any, error: any) => {
    if (result) {
      console.log("Scanned QR Code Data:", result?.getText());
      setQrData(result?.getText() || null);
    }
    
    if (error) {
      console.error("Error scanning QR Code:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      } else {
        console.error("Unknown error format:", error);
      }
      setError(`Error scanning QR code: ${error?.message || 'Unknown error'}`);
    }
  };

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [retailer, setRetailer] = useState<any>(null);

  const handleScan = async (data: any) => {
    if (data) {
      console.log('QR Code Scanned:', data); // Log the scanned QR code
      setQrCode(data);

      try {
        // Make the API request to fetch retailer data based on the scanned QR code
        const response = await fetch(`http://localhost:4000/api/retailer/scan/${data}`);
        const result = await response.json();

        if (response.ok) {
          console.log('Retailer data fetched:', result); // Log the response data
          setRetailer(result);
        } else {
          console.error('API Error:', result.message || 'An error occurred');
          setError(result.message || 'An error occurred');
        }
      } catch (err) {
        console.error('Request Failed:', err);
        setError('Failed to fetch retailer data');
      }
    }
  };
  
  const handleError = (err: any) => {
    console.error('Scanner Error:', err); // Log any scanner errors
    setError('Failed to scan QR code');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">Scan QR Code</h1>

      <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <QrReader
        onResult={(result:any, error:any) => {
          if (result) {
            handleScan(result.getText());
          }
          if (error) {
            handleError(error);
          }
        }}
      />
    </div>

      <div className="w-full max-w-md">
        <div className="w-full h-auto">
          {/* <QrReader
            onResult={handleScanResult}
            constraints={{ facingMode: "user" }} // Front camera for desktops/mobile
          /> */}
{/* 
<QrReader
        // delay={300}
        style={{ width: '20%' }}
        onScan={handleScan}
        onError={handleError}
      /> */}
      {qrCode && (
        <div>
          <p>Scanned QR Code: {qrCode}</p>
        </div>
      )}
        </div>
      </div>

      {qrData && (
        <p className="mt-4 text-green-600 font-medium">
          Scanned Data: {qrData}
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-medium">
          {error}
        </p>
      )}

      {!qrData && !error && (
        <p className="mt-4 text-gray-600">Please point the camera to a QR code.</p>
      )}
    </div>
  );
};

export default QRScanner;
