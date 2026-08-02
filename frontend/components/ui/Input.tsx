import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({
    className = "",
    ...props
}: InputProps) => {
    return (
        <input
            {...props}
            className={`w-full px-4 py-3 rounded-xl border border-gray-200
                bg-white text-gray-900 placeholder:text-gray-400
                outline-none transition focus:border-[#2E7D5B] focus:ring-2
                focus:ring-[#2E7D5B]/20
                ${className}
            `}
        />
    );
};

export default Input;