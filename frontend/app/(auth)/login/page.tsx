"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function LoginPage() {
    const router = useRouter();
    const { login, loading } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        try {
            setError("");
            await login(formData);
            router.push("/dashboard");
        } catch (error: any) {
            setError(
                error.response?.data?.message ||
                "Invalid credentials"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F0EA] flex items-center justify-center px-5">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E8F5E9] p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Login to manage your books
                    </p>
                </div>
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/signup")}
                        className="text-[#2E7D5B] font-medium hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}