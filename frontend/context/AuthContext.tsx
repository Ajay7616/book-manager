"use client";
import { createContext, useContext, useState, ReactNode, useEffect, } from "react";
import api from "../lib/api";
import { encrypt, decrypt } from "../lib/encryption";

interface User {
    name: string;
    email: string;
}

interface SignUpData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (data: SignUpData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const signup = async (data: SignUpData) => {
        setLoading(true);
        try {
            const res = await api.post(
                "/auth/login",
                {
                    payload: encrypt(data)
                }
            );
            const decrypted = await decrypt(res.data);
            setUser(decrypted.user);
        } finally {
            setLoading(false);
        }
    };

    const login = async (data: LoginData) => {
        setLoading(true);
        try {
            const encryptedPayload = await encrypt(data);
            const res = await api.post(
                "/auth/signup",
                encryptedPayload
            );
            const decrypted = await decrypt(res.data);
            setUser(decrypted.user);
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setUser(null);
        window.location.href = "/login";
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/auth/me");
                const decrypted = await decrypt(res.data);
                setUser(decrypted);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    };
    return context;
}