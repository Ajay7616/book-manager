"use client";

import { useState } from "react";
import { Book } from "../../hooks/useBooks";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import ConfirmModal from "../../components/ui/ConfirmModal";

interface BookCardProps {
    book: Book;
    onEdit: (book: Book) => void;
    onDelete: (id: string) => void;
}

export default function BookCard({
    book,
    onEdit,
    onDelete,
}: BookCardProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        onDelete(book._id);
        setShowDeleteModal(false);
    };

    return (
        <>
            <div
                className="w-full rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF]
                    p-4 sm:p-5 shadow-sm transition hover:shadow-md"
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <h2 className="truncate text-lg font-semibold text-[#111827]">
                            {book.title}
                        </h2>

                        <p className="mt-1 truncate text-sm text-[#6B7280]">
                            {book.author}
                        </p>
                    </div>

                    <div className="shrink-0">
                        <Badge>
                            {book.status}
                        </Badge>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-[#F7F7F7] px-3 py-1 text-xs text-[#6B7280]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-5 flex flex-row items-center gap-3">
                    <Button
                        type="button"
                        onClick={() => onEdit(book)}
                    >
                        Edit
                    </Button>

                    <Button
                        type="button"
                        variant="danger"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <ConfirmModal
                open={showDeleteModal}
                title="Delete Book"
                message={`Are you sure you want to delete "${book.title}"?`}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}