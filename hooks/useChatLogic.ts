import { useState, FormEvent } from "react";

export function useChatLogic() {
  const [prompt, setPrompt] = useState<string>("");
  const [responses, setResponses] = useState<
    Array<{ role: string; text: string }>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const currentPrompt = prompt; // Capture prompt for async
    setPrompt("");

    try {
      const res = await fetch("/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: currentPrompt }),
      });

      const data: { response?: string; error?: string } = await res.json();
      const modelResponse = data.response || "No response from AI";

      setResponses((prev) => [
        ...prev,
        { role: "user", text: currentPrompt },
        { role: "model", text: modelResponse },
      ]);
    } catch (error) {
      setResponses((prev) => [
        ...prev,
        { role: "system", text: "An error occurred while fetching data." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    prompt,
    setPrompt,
    responses,
    setResponses,
    loading,
    handleSubmit,
  };
}
