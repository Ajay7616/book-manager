"use client";

import Button from "./Button";
import Modal from "./Modal";

interface ConfirmModalProps {
    open: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmModal({
    open,
    title = "Delete Book",
    message = "Are you sure you want to delete this book?",
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    return (
        <Modal
            open={open}
            onClose={onCancel}
        >
            <div className="space-y-5">
                <div>
                    <h2 className="text-xl font-semibold text-[#111827]">
                        {title}
                    </h2>

                    <p className="mt-2 text-sm text-[#6B7280]">
                        {message}
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        variant="danger"
                        onClick={onConfirm}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
}