"use client";

import { useState, useEffect } from 'react';

export default function RecentQuestions({ questions }: { questions: any[] }) {
  if (questions.length === 0) {
    return (
      <div className="mt-4 text-center text-gray-500">
        You haven't asked any questions yet.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <ul className="bg-white rounded-xl shadow divide-y divide-gray-200">
        {questions.map((q) => (
          <li key={q.id} className="p-4">
            <div className="text-gray-900 font-medium">{q.content}</div>
            <div className="text-sm text-gray-500">
              {q.isAnswered ? "✅ Answered" : "❓ Unanswered"} ·{" "}
              <ClientOnlyDate date={q.createdAt} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ClientOnlyDate({ date }: { date: string | Date }) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleString());
  }, [date]);

  return <span>{formattedDate}</span>;
}
