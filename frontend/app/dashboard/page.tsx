"use client";

import { useEffect, useState } from "react";
import useBooks, { Book } from "../../hooks/useBooks";
import DashboardStats from "../../components/dashboard/DashboardStats";
import FilterBar from "../../components/dashboard/FilterBar";
import Modal from "../../components/ui/Modal";
import BookForm from "../../components/books/BookForm";
import BookList from "../../components/books/BookList";
import Button from "../../components/ui/Button";
import Loader from "@/components/ui/Loader";

export default function DashboardPage() {
    const {
        books,
        loading,
        fetchBooks,
        addBook,
        updateBook,
        deleteBook,
    } = useBooks();

    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [statusFilter, setStatusFilter] = useState("");
    const [tagFilter, setTagFilter] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const closeForm = () => {
        setShowForm(false);
        setEditingBook(null);
    };

    const handleSubmit = async (data: {
        title: string;
        author: string;
        tags: string[];
        status: Book["status"];
    }) => {
        if (editingBook) {
            await updateBook(editingBook._id, data);
        } else {
            await addBook(data);
        }

        closeForm();
    };

    const filteredBooks = books.filter((book) => {
        const matchesStatus =
            !statusFilter || book.status === statusFilter;

        const matchesTag =
            !tagFilter ||
            book.tags.some((tag) =>
                tag.toLowerCase().includes(tagFilter.toLowerCase())
            );

        return matchesStatus && matchesTag;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[#111827]">
                        My Library
                    </h1>

                    <p className="mt-1 text-[#6B7280]">
                        Manage your reading collection
                    </p>
                </div>

                <Button
                    type="button"
                    className="sm:w-auto"
                    onClick={() => setShowForm(true)}
                >
                    + Add Book
                </Button>
            </div>

            <DashboardStats books={books} />

            <FilterBar
                status={statusFilter}
                setStatus={setStatusFilter}
                tag={tagFilter}
                setTag={setTagFilter}
            />

            <Modal
                open={showForm || !!editingBook}
                onClose={closeForm}
            >
                <BookForm
                    initialData={editingBook}
                    loading={loading}
                    onSubmit={handleSubmit}
                    onCancel={closeForm}
                />
            </Modal>

            {loading ? (
                <div className="flex min-h-[300px] items-center justify-center">
                    <Loader size="lg" text="Loading your books..." />
                </div>
            ) : (
                <BookList
                    books={filteredBooks}
                    onEdit={(book) => {
                        setEditingBook(book);
                        setShowForm(true);
                    }}
                    onDelete={deleteBook}
                />
            )}
        </div>
    );
}