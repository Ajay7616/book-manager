"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";


export default function SignUpPage() {
    const router = useRouter();
    const { signup, loading } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        try {
            setError("");
            await signup(formData);
            router.replace("/dashboard");
            router.push;
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F0EA] flex items-center justify-center px-5">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#E8F5E9] p-8">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Start managing your personal library
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
                        name="name"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
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
                        {loading ? "Creating account..." : "Sign Up"}
                    </Button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="text-[#2E7D5B] font-medium hover:underline"
                    >
                        Login
                    </button>
                </p>

            </div>
        </div>
    );
}