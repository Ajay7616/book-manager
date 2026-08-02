interface LoaderProps {
    size?: "sm" | "md" | "lg";
    text?: string;
}

export default function Loader({
    size = "md",
    text,
}: LoaderProps) {
    const sizes = {
        sm: "h-5 w-5 border-2",
        md: "h-8 w-8 border-4",
        lg: "h-12 w-12 border-4",
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                className={`
                    animate-spinrounded-full border-[#E8F5E9] border-t-[#2E7D5B]
                    ${sizes[size]}
                `}
            />

            {text && (
                <p className="text-sm text-[#6B7280]">
                    {text}
                </p>
            )}
        </div>
    );
}