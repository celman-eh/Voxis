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
                        {message.role === "user" ? "You" : "Voxis"}
                    </div>
                    <div className="mt-1 text-lg text-gray-400">
                        <ReactMarkdown
                            children={message.text}
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p({ children }) {
                                    // Add spacing and custom styles for paragraphs
                                    return <p className="block my-8 leading-relaxed text-gray-300">{children}</p>;
                                },
                                strong({ children }) {
                                    // Bold text with emphasis
                                    return <strong className="font-bold text-gray-100">{children}</strong>;
                                },
                                em({ children }) {
                                    // Italic text with subtle styling
                                    return <em className="italic text-gray-400">{children}</em>;
                                },
                                code({ inline, className, children }) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            style={dracula}
                                            language={match[1]}
                                            children={String(children).replace(/\n$/, "")}
                                            className="rounded-lg overflow-auto"
                                        />
                                    ) : (
                                        <code className="bg-gray-800 text-gray-200 px-1 py-0.5 rounded">{children}</code>
                                    );
                                },
                                blockquote({ children }) {
                                    // Stylish blockquotes for emphasis
                                    return (
                                        <blockquote className="pl-4 border-l-4 border-gray-600 italic text-gray-400">
                                            {children}
                                        </blockquote>
                                    );
                                },
                                ul({ children }) {
                                    // Bulleted lists with padding
                                    return <ul className="list-disc pl-6 text-gray-300">{children}</ul>;
                                },
                                ol({ children }) {
                                    // Numbered lists with padding
                                    return <ol className="list-decimal pl-6 text-gray-300">{children}</ol>;
                                },
                                li({ children }) {
                                    // List items with proper spacing
                                    return <li className="mb-2">{children}</li>;
                                },
                                hr() {
                                    // Horizontal rule for separation
                                    return <hr className="my-4 border-gray-700" />;
                                },
                                h1({ children }) {
                                    return <h1 className="text-2xl font-bold text-gray-100 mb-2">{children}</h1>;
                                },
                                h2({ children }) {
                                    return <h2 className="text-xl font-semibold text-gray-200 mb-2">{children}</h2>;
                                },
                                h3({ children }) {
                                    return <h3 className="text-lg font-semibold text-gray-300 mb-2">{children}</h3>;
                                },
                            }}
                        />

                    </div>
                </div>
            ))}
            {loading && (
                <div className="self-start p-4 rounded-lg">
                    <div className="text-sm text-gray-600 font-semibold">Voxis</div>
                    <div className="mt-1 text-lg text-gray-400 italic">Thinking...</div>
                </div>
            )}
        </div>
    );
}
