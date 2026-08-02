interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "green" | "gray";
}

export default function Badge({
  children,
  variant = "green",
}: BadgeProps) {

  const styles = {
    orange: "bg-[#FFF0E8] text-[#FF8A3D]",
    green: "bg-[#E8F5E9] text-[#2E7D5B]",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}