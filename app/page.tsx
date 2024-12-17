import PromptForm from "../components/PromptForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center relative bg-background">
      <span className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs md:text-lg text-[#e11d48] font-semibold">
        Continue your AI journey
      </span>
      <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
        AI can make mistakes. Check important info.
      </span>

      <PromptForm />
    </main>

  );
}
