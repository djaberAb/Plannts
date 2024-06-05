import Navbar from '@/components/navbar';
import React from 'react';

const About: React.FC = () => {
return (
    <>
        <Navbar />
        <div className="container mx-auto p-6 ">
            <div className="bg-green-100 p-8 rounded-lg shadow-lg mt-12">
                <h1 className="text-4xl font-bold text-center text-green-700 mb-6">À Propos de Nous</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">Introduction</h2>
                    <p className="text-gray-700">
                        Bienvenue chez Plannt: une plateforme d'échange de Plantes ! Nous sommes passionnés par la connexion des amateurs de plantes du monde entier. Que vous cherchiez à échanger, à donner ou simplement à apprendre sur les plantes, notre communauté est là pour vous aider à développer votre pouce vert.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">Notre Mission</h2>
                    <p className="text-gray-700">
                        Notre mission est de favoriser une communauté où les amoureux des plantes peuvent se réunir pour partager leurs connaissances, échanger des plantes et se soutenir mutuellement dans leurs aventures de jardinage. Nous croyons au pouvoir de la communauté et à la joie que les plantes peuvent apporter à nos vies.
                    </p>
                </section>

                <section className="mb-8 ">
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">Rencontrez l'Équipe</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        <div className="p-4 bg-white border border-green-300 rounded-lg shadow">
                            <h3 className="text-xl font-bold text-green-700 mb-2">Rania Rezig</h3>
                            <p className="text-gray-700">Fondatrice &amp; PDG</p>
                            <p className="text-gray-600">Rania a une passion pour les plantes et jardine depuis plus de 15 ans. Elle a fondé Échange de Plantes pour connecter des personnes partageant les mêmes idées et promouvoir des pratiques de jardinage durables.</p>
                        </div>
                <div className="p-4 bg-white border border-green-300 rounded-lg shadow">
                <h3 className="text-xl font-bold text-green-700 mb-2">Lina Boudjema</h3>
                <p className="text-gray-700">Fondatrice &amp; COO</p>
                <p className="text-gray-600">Lina est passionnée par les plantes et a une grande expérience en gestion de communauté. Elle veille à ce que nos membres se sentent connectés et soutenus dans leurs parcours de jardinage.</p>
                </div>
            </div>
            </section>

            <section>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Contactez-Nous</h2>
            <p className="text-gray-700">
                Si vous avez des questions, des suggestions ou si vous voulez simplement dire bonjour, n'hésitez pas à nous contacter à <a href="mailto:contact@Plannt.com" className="text-green-500 underline">contact@plannts.com</a>.
            </p>
            </section>
        </div>
        </div>
    </>
  );
};

export default About;
