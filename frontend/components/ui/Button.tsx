import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger";
}

const Button = ({
    className = "",
    variant = "primary",
    ...props
}: ButtonProps) => {
    const variants = {
        primary: "bg-[#2E7D5B] text-white  hover:bg-[#25684B] focus:ring-[#2E7D5B]/30",
        secondary: "bg-[#FF8A3D] text-white hover:bg-[#E97932] focus:ring-[#FF8A3D]/30 ",
        danger: "bg-[#DC2626] text-white hover:bg-red-700 focus:ring-[#DC2626]/30",
    };

    return (
        <button
            {...props}
            className={`px-4 py-3 rounded-xl font-medium transition focus:outline-none
                focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed 
                whitespace-nowrap shrink-0 ${variants[variant]} ${className}`}
        />
    );
};

export default Button;