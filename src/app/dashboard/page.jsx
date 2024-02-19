"use client";
import { useState } from 'react';
import QrReader from 'modern-react-qr-reader';

export default function Home() {
    const [qrData, setQrData] = useState(null);

    const handleScan = (data) => {
        if (data) {
            setQrData(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div>
            <section className="dark:bg-gray-800 dark:text-gray-100">
                <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
                    <div>
                        <h2 className="text-3xl font-bold tracki text-center sm:text-5xl dark:text-gray-50">VOUS ETES </h2>
                        <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">CONNECTE</p>
                    </div>
                    <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                        {/* Ajoutez le scanner QR Code ici */}
                        <div>
                            <QrReader
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%' }}
                            />
                            <p className="mt-3 dark:text-gray-400">Scannez un QR Code pour obtenir des informations.</p>
                        </div>
                        {/* Affichez les données du QR Code */}
                        {qrData && (
                            <div>
                                <h3 className="text-2xl font-bold tracki sm:text-3xl dark:text-gray-50">Données du QR Code</h3>
                                <p className="mt-3 text-lg dark:text-gray-400">{qrData}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
