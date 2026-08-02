import React from "react";

export default function Footer() {
    return (
        <footer className="border-t border-[#E8F5E9] bg-[#F0F0EA]">
            <div className="container mx-auto px-6 py-5 text-center">
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-medium text-[#2E7D5B]">
                        Book Manager
                    </span>
                    . Built with Next.js.
                </p>
            </div>
        </footer>
    );
}