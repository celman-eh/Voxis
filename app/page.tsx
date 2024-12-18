import PromptForm from "../components/PromptForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center relative bg-background">
      <span className="absolute flex items-center gap-2 top-6 left-1/2 transform -translate-x-1/2 text-4xl text-[#bbbbbb] font-semibold">
        <img src="/logo.svg" alt="Logo" width={50} />
        Voxis
      </span>


      <PromptForm />
      <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
        Voxis can make mistakes. Check important info.
      </span>

    </main>

  );
}
