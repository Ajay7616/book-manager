"use client";

import api from "../lib/api";
import { useState } from "react";
import { encrypt, decrypt } from "../lib/encryption";


export interface Book {
    _id: string;
    title: string;
    author: string;
    tags: string[];
    status: "Want to Read" | "Reading" | "Completed";
    createdAt?: string;
}


export default function useBooks() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await api.get("/books");
            const decrypted = await decrypt(response.data);
            setBooks(decrypted.books);
        } finally {
            setLoading(false);
        }
    };


    const addBook = async (bookData: {
        title: string;
        author: string;
        tags: string[];
        status: Book["status"];
    }) => {
        try {
            setLoading(true);
            const encryptedPayload = await encrypt(bookData);
            const response = await api.post(
                "/books",
                encryptedPayload
            );
            const decrypted = await decrypt(response.data);
            await fetchBooks();
            return decrypted;
        } finally {
            setLoading(false);
        }
    };


    const updateBook = async (
        id: string,
        bookData: Partial<Book>
    ) => {
        try {
            setLoading(true);
            const encryptedPayload = await encrypt(bookData);
            const response = await api.put(
                `/books/${id}`,
                encryptedPayload
            );
            const decrypted = await decrypt(response.data);
            await fetchBooks();
            return decrypted;
        } finally {
            setLoading(false);
        }
    };


    const deleteBook = async (id: string) => {
        try {
            setLoading(true);
            const response = await api.delete(
                `/books/${id}`
            );
            const decrypted = await decrypt(response.data);
            await fetchBooks();
            return decrypted;
        } finally {
            setLoading(false);
        }
    };


    return {
        books,
        loading,
        fetchBooks,
        updateBook,
        deleteBook,
        addBook,
    };
}