"use client";
import {useEffect, useState} from 'react';
import QrReader from 'modern-react-qr-reader';

export default function Home() {
    const [qrData, setQrData] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    const handleScan = (data) => {
        if (data) {
            setQrData(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, []);

    const isUserNearLocation = (userLocation, targetLocation) => {
        const distanceInMeters = haversineDistance(userLocation, targetLocation);


        return distanceInMeters <= 2000;
    };

    const targetLocation = { latitude: 49.200834747727214, longitude: -0.35030825744906413};
    const canScan = userLocation && isUserNearLocation(userLocation, targetLocation);

    function haversineDistance(userLocation, targetLocation) {
        function toRad(x) {
            return x * Math.PI / 180;
        }

        var R = 6371;
        var x1 = targetLocation.latitude - userLocation.latitude;
        var dLat = toRad(x1);
        var x2 = targetLocation.longitude - userLocation.longitude;
        var dLon = toRad(x2)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(userLocation.latitude)) * Math.cos(toRad(targetLocation.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distanceInKm = R * c;

        return distanceInKm * 1000;
    }

    console.log(userLocation, targetLocation, canScan);
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
                            {canScan ? (
                                <QrReader
                                    delay={300}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{ width: '100%' }}
                                />
                            ) : (
                                <p>Vous devez être à une certaine localisation pour scanner le QR code.</p>
                            )}
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
