"use client";
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";
export default () => {

    const contactMethods = [
        {
            icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
            ,
            contact: "mcq@perriet.fr"
        },
    ]

    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm("service_zlx2lm9", "template_478yqbm", e.target, "G7BlSildTSqLzWeOi")
            .then((result) => {
                Swal.fire(
                    'Demande envoyée avec succès !',
                    'Nous vous répondrons dans les plus brefs délais.',
                    'success'
                );
                e.target.reset();
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <main className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
                    <div className="max-w-lg space-y-3">
                        <h3 className="text-indigo-600 font-semibold">
                            Contact
                        </h3>
                        <p className="dark:text-gray-100 text-3xl font-semibold sm:text-4xl">
                            Faites nous savoir comment nous pouvons vous aider
                        </p>
                        <p className="dark:text-gray-100">
                            Nous sommes là pour vous aider et répondre à toutes vos questions. N'hésitez pas à nous contacter pour toute demande de renseignements.
                        </p>
                        <div>
                            <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                                {
                                    contactMethods.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-x-3">
                                            <div className="flex-none dark:text-gray-100">
                                                {item.icon}
                                            </div>
                                            <p className="dark:text-gray-100">{item.contact}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
                        <form
                            onSubmit={sendEmail}
                            className="space-y-5"
                        >
                            <div>
                                <label className="font-medium dark:text-gray-100 ">
                                    Nom complet
                                </label>
                                <input
                                    name="to_name"
                                    type="text"
                                    required
                                    className="w-full mt-2 px-3 py-2 dark:text-gray-100 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium dark:text-gray-100">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full mt-2 px-3 py-2 dark:text-gray-100 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium dark:text-gray-100">
                                    Message
                                </label>
                                <textarea name="message" required className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-gray-100"></textarea>
                            </div>
                            <button
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            >
                                Envoyer
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}