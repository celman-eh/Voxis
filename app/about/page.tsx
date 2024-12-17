import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Botlify",
    description: "Your interactive chatbot powered by AI.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen flex items-center justify-center  p-4">
            <Card className="w-full max-w-md text-muted-foreground shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">About Botlify</CardTitle>
                    <CardDescription className="text-gray-400">
                        Your interactive chatbot powered by AI.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>
                        Botlify is an advanced AI assistant powered by the <strong>Gemini 1.5 Flash-8B</strong>, designed to deliver engaging and interactive conversations. Optimized for handling straightforward tasks, it ensures high efficiency and reliability.
                    </p>

                    <p>
                        Whether you need quick answers, creative ideas, or simple automation, this model
                        delivers reliable responses with a focus on accessibility and efficiency.
                    </p>
                    <p>
                        Currently, Botlify supports text input and output, enabling users to communicate effectively. Whether you need quick answers, troubleshooting assistance, or casual interactions, Botlify adapts effortlessly to meet your needs.
                    </p>
                    <p>
                        For inquiries or support, visit <a
                            href="https://www.linkedin.com/in/celman"
                            className=" underline"
                        >
                            LinkedIn
                        </a>.
                    </p>
                    <p className="text-xs text-gray-400">
                        Disclaimer: Botlify can make mistakes. Always verify critical information.
                    </p>

                </CardContent>
            </Card>
        </main>
    );
}
