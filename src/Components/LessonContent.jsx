import React from "react";

const LessonContent = ({ content }) => (
  <div className="prose prose-invert font-poppins max-w-none">
    {content.split("\n").map((line, idx) =>
      line.startsWith("```python") ? (
        <pre key={idx} className="bg-white/60 rounded p-3 my-3 text-white text-sm overflow-x-auto">
          {line.replace("```python", "").replace("```", "")}
        </pre>
      ) : (
        <p className="text-white" key={idx}>{line}</p>
      )
    )}
  </div>
);

export default LessonContent;
