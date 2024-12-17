import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

interface ChatHistoryProps {
    responses: Array<{ role: string; text: string }>;
    loading: boolean;
}

export default function ChatHistory({ responses, loading }: ChatHistoryProps) {
    return (
        <div className="space-y-4 overflow-y-auto overflow-x-hidden max-h-96 custom-scrollbar">
            {responses.map((message, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-lg ${message.role === "user" ? "self-end" : "self-start"
                        }`}
                >
                    <div className="text-sm text-gray-600 font-semibold">
                        {message.role === "user" ? "You" : "AI"}
                    </div>
                    <div className="mt-1 text-lg text-gray-400">
                        <ReactMarkdown
                            children={message.text}
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, inline, className, children }) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            style={dracula}
                                            language={match[1]}
                                            children={String(children).replace(/\n$/, "")}
                                        />
                                    ) : (
                                        <code className={className}>{children}</code>
                                    );
                                },
                            }}
                        />
                    </div>
                </div>
            ))}
            {loading && (
                <div className="self-start p-4 rounded-lg">
                    <div className="text-sm text-gray-600 font-semibold">AI</div>
                    <div className="mt-1 text-lg text-gray-400 italic">Thinking...</div>
                </div>
            )}
        </div>
    );
}
