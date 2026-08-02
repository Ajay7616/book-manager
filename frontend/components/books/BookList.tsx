"use client";

import { Book } from "../../hooks/useBooks";
import BookCard from "./BookCard";

interface BookListProps {
    books: Book[];
    onEdit: (book: Book) => void;
    onDelete: (id: string) => void;
}

export default function BookList({
    books,
    onEdit,
    onDelete,
}: BookListProps) {
    if (books.length === 0) {
        return (
            <div
                className="rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF]p-8 sm:p-10 text-center shadow-sm"
            >
                <h3 className="text-lg font-semibold text-[#111827]">
                    Your library is empty
                </h3>

                <p className="mt-2 text-sm text-[#6B7280]">
                    Add your first book and start tracking your reading journey.
                </p>
            </div>
        );
    }

    return (
        <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
            {books.map((book) => (
                <BookCard
                    key={book._id}
                    book={book}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}