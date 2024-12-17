import { FormEvent } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ArrowUp, Loader2 } from "lucide-react";

interface InputFormProps {
    prompt: string;
    setPrompt: (value: string) => void;
    loading: boolean;
    handleSubmit: (e: FormEvent) => void;
}

export default function InputForm({ prompt, setPrompt, loading, handleSubmit }: InputFormProps) {
    const handleFormSubmit = (e: FormEvent) => {
        if (prompt.trim() === "") {
            // Prevent form submission if prompt is empty
            e.preventDefault();
            return;
        }
        handleSubmit(e); // Call the handleSubmit function if the prompt is valid
    };

    return (
        <form onSubmit={handleFormSubmit} className="mt-4 space-y-4 flex flex-col items-stretch">
            <div className="relative w-full">
                <Textarea
                    className="bg-[#1b1b1b] w-full p-3 pr-16 rounded-2xl resize-none overflow-auto max-h-[300px] min-h-[100px] custom-scrollbar"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (!loading && prompt.trim() !== "") {
                                handleSubmit(e);
                            }
                        }
                    }}
                    rows={1}
                    required
                    aria-label="User input"
                    placeholder="What can I help with?"
                />
                <Button
                    type="submit"
                    className="absolute right-2 w-10 h-10 bottom-2 p-2 rounded-full flex items-center justify-center bg-white text-black hover:bg-muted-foreground font-bold disabled:bg-muted-foreground"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="!w-7 !h-7 animate-spin" />
                    ) : (
                        <ArrowUp className="!w-7 !h-7" />
                    )}
                </Button>
            </div>
        </form>
    );
}
