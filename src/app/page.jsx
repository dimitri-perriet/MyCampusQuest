"use client";
import Image from 'next/image'
import {useEffect} from "react";
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function Home() {

  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn, router]);

  return (
      <div>
        <section className="dark:bg-gray-800 dark:text-gray-100">
          <div className="container max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
            <div>
              <h2 className="text-3xl font-bold tracki text-center sm:text-5xl dark:text-gray-50">MyCampusQuest</h2>
              <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">Découvrez votre campus, simplement.</p>
            </div>
            <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 className="text-2xl font-bold tracki sm:text-3xl dark:text-gray-50">Explorez et amusez-vous</h3>
                <p className="mt-3 text-lg dark:text-gray-400">Découvrez votre campus d'une toute nouvelle manière. Trouvez des trésors cachés, explorez des recoins inconnus et plongez dans les récits fascinants qui donnent vie à chaque bâtiment et à chaque endroit.</p>
                <div className="mt-12 space-y-12">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div
                          className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leadi dark:text-gray-50">Des aventures sans fin</h4>
                      <p className="mt-2 dark:text-gray-400">Partez à l'aventure à travers les ruelles pittoresques et les places animées de votre campus. Chaque découverte vous rapproche du trésor final et vous plonge plus profondément dans l'histoire captivante de votre école.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div
                          className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leadi dark:text-gray-50">Des défis excitants</h4>
                      <p className="mt-2 dark:text-gray-400">Affrontez des énigmes complexes, relevez des défis stimulants et gagnez des récompenses exclusives en chemin. Chaque étape de MyCampusQuest vous pousse à repousser vos limites et à explorer votre campus sous un nouveau jour.</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div
                          className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             className="w-7 h-7">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium leadi dark:text-gray-50">Une expérience inoubliable</h4>
                      <p className="mt-2 dark:text-gray-400">Créez des souvenirs durables avec vos amis tout en explorant les trésors cachés de votre campus. MyCampusQuest vous offre une expérience immersive que vous n'oublierez pas de sitôt.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="mt-10 lg:mt-0">
                <img src="/campus-caen.png" alt=""
                     className="mx-auto rounded-lg "/>
              </div>
            </div>
            <div>
              <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                <div className="lg:col-start-2">
                  <h3 className="text-2xl font-bold tracki sm:text-3xl dark:text-gray-50">Développez votre campus</h3>
                  <p className="mt-3 text-lg dark:text-gray-400">Contribuez à l'enrichissement de votre campus en partageant vos découvertes, vos récits et vos expériences avec la communauté. Chaque contribution ajoute une nouvelle dimension à l'expérience de chasse au trésor.</p>
                  <div className="mt-12 space-y-12">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div
                            className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                               className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium leadi dark:text-gray-50">Partagez vos découvertes</h4>
                        <p className="mt-2 dark:text-gray-400">Faites partie d'une communauté passionnée de chercheurs de trésors en partageant vos lieux préférés, vos histoires les plus intrigantes et vos secrets les mieux gardés de votre campus.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div
                            className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                               className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium leadi dark:text-gray-50">Connectez-vous avec d'autres explorateurs</h4>
                        <p className="mt-2 dark:text-gray-400">Rencontrez des personnes partageant les mêmes idées, échangez des conseils et des astuces, et créez des liens durables avec d'autres membres de la communauté MyDigitalSchool. Votre prochaine grande aventure commence ici.</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div
                            className="flex items-center justify-center w-12 h-12 rounded-md dark:bg-violet-400 dark:text-gray-900">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                               className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium leadi dark:text-gray-50">Enrichissez l'expérience de tous</h4>
                        <p className="mt-2 dark:text-gray-400">Contribuez à la croissance de la communauté en partageant vos connaissances, vos compétences et votre passion pour l'aventure. Ensemble, nous pouvons rendre chaque campus plus vivant et plus passionnant que jamais.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                  <img src="/campus-2.png" alt=""
                       className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}
