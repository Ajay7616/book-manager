"use client";

import Input from "../../components/ui/Input";
import Select from "../ui/Select";

interface FilterBarProps {
    status: string;
    setStatus: (status: string) => void;
    tag: string;
    setTag: (tag: string) => void;
}

export default function FilterBar({
    status,
    setStatus,
    tag,
    setTag,
}: FilterBarProps) {
    return (
        <div
            className=" flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-4 sm:p-5 md:flex-row md:items-center "
        >
            <div className="w-full md:w-72">
                <Select
                    value={status || "All Status"}
                    onChange={(value) =>
                        setStatus(value === "All Status" ? "" : value)
                    }
                    options={[
                        "All Status",
                        "Want to Read",
                        "Reading",
                        "Completed",
                    ]}
                />
            </div>

            <div className="w-full md:flex-1">
                <Input
                    type="text"
                    placeholder="Filter by tag..."
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
            </div>
        </div>
    );
}