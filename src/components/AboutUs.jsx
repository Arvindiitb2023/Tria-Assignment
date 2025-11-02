import React from "react";
import Me from '../assests/Me.png';
const AboutMe = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1A205B] via-[#212762] to-[#1A205B] text-white flex flex-col items-center px-6 py-16">
            {/* Header */}
            <div className="text-center max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
                <p className="text-gray-300 text-lg">
                    Hi 👋 I'm <span className="text-white font-semibold">Arvind Bhimanpalli</span>,
                    a passionate developer who loves building simple and functional web experiences.
                </p>
            </div>

            {/* Content Section */}
            <div className="mt-16 grid md:grid-cols-2 gap-10 max-w-6xl items-center">
                <img
                    src={Me}
                    alt="Profile"
                    className="w-64 h-64 mx-auto md:w-80 md:h-80 object-cover rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                />


                <div>
                    <h2 className="text-2xl font-semibold mb-4">👨‍💻 Who I Am</h2>
                    <p className="text-gray-300 leading-relaxed">
                        I'm a Aerospace student and aspiring full-stack developer with a strong interest
                        in React, clean UI design, and building apps that solve real-world problems.
                        I enjoy experimenting with new technologies, learning from every project, and improving my coding workflow.
                    </p>
                </div>
            </div>

            {/* Goals / Interests */}
            <div className="mt-20 max-w-4xl text-center">
                <h2 className="text-2xl font-semibold mb-4">🌱 My Goals</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                    My goal is to keep learning, improving, and contributing to meaningful software projects.
                    I believe in writing clean code, designing intuitive interfaces, and never stopping the process of growth.
                </p>
                <button className="px-6 py-3 bg-white text-[#212762] rounded-full font-semibold shadow-lg hover:bg-gray-200 transition">
                    Connect With Me
                </button>
            </div>

            {/* Footer */}
            <footer className="mt-20 text-sm text-gray-400">
                © {new Date().getFullYear()} Arvind. Built with ❤️ using React & Tailwind CSS.
            </footer>
        </div>
    );
};

export default AboutMe;
