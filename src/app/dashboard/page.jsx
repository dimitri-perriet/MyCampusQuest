"use client";
import {useEffect, useState} from 'react';
import QrReader from 'modern-react-qr-reader';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import {getDistance} from 'geolib';
import {useUser} from "@clerk/nextjs";
import localForage from "localforage";



export default function Home() {
    const [quests, setQuests] = useState([]);
    const [showQrReader, setShowQrReader] = useState(false);
    const [qrData, setQrData] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [userQuests, setUserQuests] = useState([]);
    const {user} = useUser();
    const [reloadUserQuests, setReloadUserQuests] = useState(false);


    async function saveQuest(userId, questId) {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    questId: questId,
                }),
            });

            if (!response.ok) {
                throw new Error('Error saving quest');
            }

            const jsonResponse = await response.json();
            return true;
        } catch (error) {
            if (!navigator.onLine) {

                let offlineQuests = await localForage.getItem('offlineQuests') || [];
                offlineQuests.push({
                    url: '/api/user',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        questId: questId,
                    }),
                });
                await localForage.setItem('offlineQuests', offlineQuests);
                Swal.fire(
                    'Mis en cache !',
                    'Vous avez validé la quête avec succès et elle a été mis en cache avec succès car vous êtes offline !',
                    'success'
                );
                return true;
            } else {
                throw error;
            }
        }
    }
    const handleScan = async (data) => {
        if (data) {
            setQrData(data);
            setShowQrReader(false);
            if (data === selectedQuest.validate_code) {
                const userPosition = {
                    latitude: parseFloat(selectedQuest.lat),
                    longitude: parseFloat(selectedQuest.lon),
                };
                if (navigator.onLine) {
                    const userPosition = {
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude,
                    };
                }
                const questPosition = {
                    latitude: parseFloat(selectedQuest.lat),
                    longitude: parseFloat(selectedQuest.lon),
                };
                const distance = getDistance(userPosition, questPosition);

                if (distance <= 1000) {
                    const saveSuccess = await saveQuest(user.id, selectedQuest._id);
                    if (saveSuccess) {
                        Swal.fire(
                            'Succès',
                            'Vous avez validé la quête avec succès !',
                            'success'
                        );
                        setReloadUserQuests(!reloadUserQuests);
                    } else {
                        Swal.fire(
                            'Erreur',
                            'Le QR code est valide, mais il y a eu une erreur lors de l\'enregistrement de la quête',
                            'error'
                        );
                    }
                } else {
                    Swal.fire(
                        'Erreur',
                        'Vous êtes trop loin du point de validation',
                        'error'
                    );
                }
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
        if (user && user.id) {
            fetch(`/api/user?userID=${user.id}`)
                .then(response => response.json())
                .then(data => {
                    setUserQuests(data);
                });
        }
    }, [user, reloadUserQuests]);

    useEffect( () => {
        fetch('/api/quest')
            .then(response => response.json())
            .then(data => setQuests(data));

        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });


        retryOfflineQuests();

    }, []);

    const handleCardClick = (quest) => {
        setSelectedQuest(quest);
        setShowQrReader(true);
    };

    async function retryOfflineQuests() {
    if (navigator.onLine) {
        let offlineQuests = await localForage.getItem('offlineQuests');
        if (offlineQuests) {
            for (const offlineQuest of offlineQuests) {
                try {
                    const response = await fetch(offlineQuest.url, {
                        method: offlineQuest.method,
                        headers: offlineQuest.headers,
                        body: offlineQuest.body,
                    });

                    if (!response.ok) {
                        throw new Error('Error retrying quest');
                    }

                    const jsonResponse = await response.json();
                    offlineQuests = offlineQuests.filter(quest => quest !== offlineQuest);
                    await localForage.setItem('offlineQuests', offlineQuests);
                } catch (error) {
                    console.error('Error retrying quest:', error);
                }
            }
        }
    }
}



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
                        {quests.map((quest, index) => {
                            const userQuest = userQuests.find(userQuest => userQuest.questId === quest._id);
                            const isCompleted = userQuest && userQuest.completed;
                            const completedAt = isCompleted ? new Date(userQuest.completed_at).toLocaleDateString() : null;

                            return (
                                <div
                                    key={index}
                                    onClick={isCompleted ? null : () => handleCardClick(quest)}
                                    className={`mb-4 max-w-xs p-6 rounded-md shadow-md ${isCompleted ? 'bg-gray-400 dark:bg-gray-700 opacity-50' : 'dark:bg-gray-900'}`}
                                >
                                    <div className="mt-6 mb-2">
                                        <span
                                            className="block text-xs font-medium tracki uppercase dark:text-violet-400">{quest.name}</span>
                                        <h2 className="text-xl font-semibold tracki">{quest.description}</h2>
                                        {isCompleted && (
                                            <div
                                                className="inset-0 top-0 left-0 right-0 flex items-center justify-center">
                                                <p className="text-green-800 text-xl font-semibold dark:text-green-500">Terminé
                                                    le {completedAt}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
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