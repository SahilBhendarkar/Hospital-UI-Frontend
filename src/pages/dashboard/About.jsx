import { Users, Heart, Activity, Shield, Globe } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <section className="bg-gradient-to-r from-white-600 to-white-700 text-black">
                <div className="max-w-6xl mx-auto px-6 py-20">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-semibold">
                            About Hospital UI
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-black/90">
                            A modern healthcare management platform designed to simplify
                            clinical workflows and empower healthcare professionals.
                        </p>
                    </div>
                </div>
            </section>

            <div className="h-24" />

            <section className="max-w-6xl mx-auto px-6">
                <div className="grid gap-12 md:grid-cols-2">
                    <div className="bg-white rounded-2xl p-10 shadow-lg">
                        <div className="flex items-center gap-5 mb-6">
                            <div className="bg-blue-100 rounded-xl p-4 text-blue-600">
                                <Users size={32} />
                            </div>
                            <h2 className="text-3xl font-semibold text-slate-800">
                                Who We Are
                            </h2>
                        </div>
                        <div className="space-y-4 text-slate-600 text-lg leading-relaxed max-w-prose">
                            <p>
                                Hospital UI is a modern hospital management platform built to
                                streamline operations, reduce complexity, and improve clinical efficiency.
                            </p>
                            <p>
                                Our dashboards and workflows are designed specifically for doctors,
                                nurses, and administrators working in high-pressure healthcare environments.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-10 shadow-lg">
                        <div className="flex items-center gap-5 mb-6">
                            <div className="bg-green-100 rounded-xl p-4 text-green-600">
                                <Heart size={32} />
                            </div>
                            <h2 className="text-3xl font-semibold text-slate-800">
                                Our Mission
                            </h2>
                        </div>
                        <div className="space-y-4 text-slate-600 text-lg leading-relaxed max-w-prose">
                            <p>
                                To empower healthcare institutions with reliable, user-friendly tools
                                that save time, reduce errors, and improve patient outcomes.
                            </p>
                            <p>
                                We believe technology should support human care — not complicate it.
                                Every feature is crafted with real clinical workflows in mind.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

