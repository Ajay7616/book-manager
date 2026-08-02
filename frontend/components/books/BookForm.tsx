"use client";

import { useEffect, useState } from "react";
import { Book } from "../../hooks/useBooks";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Select from "../ui/Select";

interface BookFormProps {
    initialData?: Book | null;
    onSubmit: (data: {
        title: string;
        author: string;
        tags: string[];
        status: Book["status"];
    }) => void;
    onCancel?: () => void;
}

export default function BookForm({
    initialData,
    onSubmit,
    onCancel,
}: BookFormProps) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [tags, setTags] = useState("");
    const [status, setStatus] = useState<Book["status"]>("Want to Read");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setAuthor(initialData.author);
            setTags(initialData.tags.join(", "));
            setStatus(initialData.status);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            title,
            author,
            tags: tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            status,
        });

        if (!initialData) {
            setTitle("");
            setAuthor("");
            setTags("");
            setStatus("Want to Read");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <h2 className="text-xl font-semibold text-[#111827]">
                {initialData ? "Edit Book" : "Add New Book"}
            </h2>

            <div className="space-y-4">
                <Input
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Input
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <Input
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <Select
                    value={status}
                    onChange={(value) =>
                        setStatus(value as Book["status"])
                    }
                    options={[
                        "Want to Read",
                        "Reading",
                        "Completed",
                    ]}
                />
            </div>
            <div className="flex flex-col gap-3">
                <Button type="submit">
                    {initialData ? "Update Book" : "Add Book"}
                </Button>
                {initialData && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                )}
            </div>
        </form>
    );
}