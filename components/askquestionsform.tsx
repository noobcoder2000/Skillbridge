// components/AskQuestionForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AskQuestionForm() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = content.trim();
    if (!trimmed) {
      setError("Please write a question.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: trimmed }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json?.error || "Failed to post.");
      } else {
        setContent("");
        // refresh server components (dashboard) to show the new question
        router.refresh();
      }
    } catch (err) {
      setError("Network error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Ask a question or share something short..."
        className="w-full border rounded p-2 mb-2"
        rows={3}
      />
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {loading ? "Posting…" : "Post Question"}
        </button>
        <button
          type="button"
          onClick={() => setContent("")}
          className="px-3 py-2 border rounded"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
