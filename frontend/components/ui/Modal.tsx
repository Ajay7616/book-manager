"use client";

import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ModalProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
}

export default function Modal({
    children,
    open,
    onClose,
}: ModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!open || !mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[999999] flex items-center justify-center 
            bg-[#111827]/40 backdrop-blur-md p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg rounded-2xl bg-[#FFFFFF] p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-full p-2 
                    text-[#6B7280] transition-colors 
                    hover:bg-[#F7F7F7] hover:text-[#111827]"
                    aria-label="Close Modal"
                >
                    <X size={20} />
                </button>

                {children}
            </div>
        </div>,
        document.body
    );
}