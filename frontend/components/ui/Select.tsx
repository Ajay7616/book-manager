"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
}

export default function Select({
    value,
    onChange,
    options,
}: SelectProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-left text-[#111827] transition focus:border-[#2E7D5B] focus:ring-2 focus:ring-[#2E7D5B]/20"
            >
                {value}

                <ChevronDown
                    size={18}
                    className="text-[#6B7280]"
                />
            </button>

            {open && (
                <div
                    className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl
                        border border-[#E5E7EB] bg-white shadow-lg"
                >
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left text-[#111827]
                                transition hover:bg-[#E8F5E9]"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}