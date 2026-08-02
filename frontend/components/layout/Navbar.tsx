"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { BookOpen, LogOut } from "lucide-react";

export default function Navbar() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <nav className="bg-[#F0F0EA] border-b border-[#E8F5E9]">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <div
                    onClick={() => router.push("/")}
                    className="cursor-pointer flex items-center gap-3"
                >
                    <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#2E7D5B] flex items-center justify-center">
                        <BookOpen size={22} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                            Book Manager
                        </h1>
                        <p className="text-xs text-gray-500">
                            Your personal library
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl  bg-[#2E7D5B] text-white text-sm font-medium hover:bg-[#25684B] transition"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => router.push("/login")}
                            className="px-5 py-2 rounded-xl bg-[#2E7D5B] text-white text-sm font-medium hover:bg-[#25684B]  transition"
                        >
                            Login
                        </button>
                    )}

                </div>

            </div>
        </nav>
    );
}