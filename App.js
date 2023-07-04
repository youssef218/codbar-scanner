import React, { useEffect, useState } from 'react';
import Quagga from 'quagga'; // Assuming you have installed the 'quagga' library as a dependency

function App() {
  const [barcodeValue, setBarcodeValue] = useState('');

  useEffect(() => {
    // Configuration object for QuaggaJS
    var scannerConfig = {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#scanner-container"),
      },
      decoder: {
        readers: ["code_128_reader"]
      }
    };

    // Initialize the scanner
    Quagga.init(scannerConfig, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();

      return function cleanup() {
        Quagga.stop();
      };
    });

    // Register a callback for successful barcode detection
    Quagga.onDetected(function (result) {
      var scannedBarcodeValue = result.codeResult.code;
      if (scannedBarcodeValue) {
        setBarcodeValue(scannedBarcodeValue);
        Quagga.stop();
      }
    });
  }, []);

  return (
    <div>
      {barcodeValue ? (
        <h1 style={{ textAlign: 'center' }}>Scanned barcode value: {barcodeValue}</h1>
      ) : (
        <div id="scanner-container"></div>
      )}
    </div>
  );
}

export default App;
