"use client";

import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const QRScanner = () => {
  const [qrResult, setQrResult] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleScan = async (data: string | null) => {
    if (data) {
      setQrResult(data); // This is the scanned QR code
      try {
        const qrData = JSON.parse(data); // Parse the QR code content
        setUserId(qrData.id); // Extract the user ID from the QR code

        // Send the scanned QR code to the backend
        const response = await axios.post('http://localhost:3000/api/retailer/login', { qrCode: qrData });
        setMessage('Login successful');
        console.log('Response:', response.data);
      } catch (error: any) {
        setMessage('Login failed');
        console.error('Error:', error.response?.data || error.message);
      }
    }
  };

  const handleError = (error: Error) => {
    console.error('QR Scanner Error:', error);
  };

  return (
    <div>
      <h1>Retailer Login</h1>
      <QrReader
        constraints={{ facingMode: 'user' }}
        onResult={(result, error) => {
          if (result) {
            handleScan(result?.text || null);
          }
          if (error) {
            handleError(error);
          }
        }}
      />
      <p>{qrResult ? `Scanned QR Code: ${qrResult}` : 'Scan a QR code to log in'}</p>
      <p>{userId ? `User ID: ${userId}` : 'Waiting for scan...'}</p>
      <p>{message}</p>
    </div>
  );
};

export default QRScanner;
