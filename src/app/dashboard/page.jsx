"use client";
import {useEffect, useState} from 'react';
import QrReader from 'modern-react-qr-reader';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

export default function Home() {
    const [quests, setQuests] = useState([]);
    const [showQrReader, setShowQrReader] = useState(false);
    const [qrData, setQrData] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedQuest, setSelectedQuest] = useState(null);


    const handleScan = (data) => {
        if (data) {
            setQrData(data);
            setShowQrReader(false);
            if (data === selectedQuest.validate_code) {
                Swal.fire(
                    'Succès',
                    'Vous avez validé la quête avec succès !',
                    'success'
                );
            } else {
                Swal.fire(
                    'Erreur',
                    'Le code QR scanné est incorrect',
                    'error'
                );
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    useEffect(() => {
        fetch('/api/quest')
            .then(response => response.json())
            .then(data => setQuests(data));

        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, []);

    const handleCardClick = (quest) => {
        setSelectedQuest(quest);
        setShowQrReader(true);
        console.log(selectedQuest);
    };

    return (
        <div>
            <section className="dark:bg-gray-800 dark:text-gray-100">
                <div>
                    <h2 className="text-3xl font-bold tracki text-center sm:text-5xl dark:text-gray-50">Bienvenue </h2>
                    <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">dans votre espace
                        personnel</p>
                </div>
                <div
                    className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl flex justify-center items-center">
                    <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center justify-center items-center">
                        {quests.map((quest, index) => (
                            <div key={index} onClick={() => handleCardClick(quest)}                                  className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50">
                                <div className="mt-6 mb-2">
                                    <span
                                        className="block text-xs font-medium tracki uppercase dark:text-violet-400">{quest.name}</span>
                                    <h2 className="text-xl font-semibold tracki">{quest.description}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Modal
                isOpen={showQrReader}
                onRequestClose={() => setShowQrReader(false)}
                contentLabel="QR Code Reader"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}
                className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 dark:bg-gray-900 dark:text-gray-100 bg-white"
            >
                <button className="absolute top-2 right-2" onClick={() => setShowQrReader(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
                         className="flex-shrink-0 w-6 h-6">
                        <polygon
                            points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                    </svg>
                </button>
                <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{width: '100%'}}
                />
                <button type="button"
                        className="px-8 py-3 font-semibold rounded-full dark:bg-violet-400 dark:text-gray-900">Scannez
                    le QR Code pour valider la quête
                </button>
            </Modal>
        </div>
    );
}