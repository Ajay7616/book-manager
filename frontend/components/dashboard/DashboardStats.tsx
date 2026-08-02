import { useMemo } from "react";
import { Book } from "../../hooks/useBooks";

interface DashboardStatsProps {
    books: Book[];
}

export default function DashboardStats({
    books,
}: DashboardStatsProps) {

    const stats = useMemo(() => {
        const counts = books.reduce(
            (acc, book) => {
                acc.total++;
                if (book.status === "Reading") {
                    acc.reading++;
                }

                if (book.status === "Completed") {
                    acc.completed++;
                }

                if (book.status === "Want to Read") {
                    acc.wantToRead++;
                }

                return acc;
            },
            {
                total: 0,
                reading: 0,
                completed: 0,
                wantToRead: 0,
            }
        );


        return [
            {
                title: "Total Books",
                value: counts.total,
                color: "bg-[#E8F5E9]",
            },
            {
                title: "Want to Read",
                value: counts.wantToRead,
                color: "bg-[#FFF0E8]",
            },
            {
                title: "Reading",
                value: counts.reading,
                color: "bg-[#E8F5E9]",
            },
            {
                title: "Completed",
                value: counts.completed,
                color: "bg-[#F7F7F7]",
            },
        ];
    }, [books]);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >
                    <div
                        className={`mb-4 inline-flex rounded-xl px-3 py-1 text-xs font-medium text-[#2E7D5B] ${stat.color}`}
                    >
                        {stat.title}
                    </div>

                    <h2 className="text-3xl font-bold text-[#111827]">
                        {stat.value}
                    </h2>

                    <p className="mt-1 text-sm text-[#6B7280]">
                        Books in your library
                    </p>
                </div>
            ))}
        </div>
    );
}