import React from "react";

const ModuleList = ({ modules, selectedModule, onSelect }) => (
  <div className="flex gap-3 overflow-x-auto mb-5">
    {modules.map((mod) => (
      <button
        key={mod.id}
        className={`px-4 py-2 rounded font-poppins text-sm transition-all ${
          selectedModule && selectedModule.id === mod.id
            ? "bg-[#6e74ff] text-white"
            : "bg-white/20 text-[#6e74ff] hover:bg-[#6e74ff]/50"
        }`}
        onClick={() => onSelect(mod)}
      >
        {mod.title}
      </button>
    ))}
  </div>
);

export default ModuleList;
