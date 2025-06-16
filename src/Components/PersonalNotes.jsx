import React, { useState, useEffect } from "react";
import {
  addNote,
  getNotesForCourseAndModule,
  updateNote,
  deleteNote,
} from "../services/notesService";

const PersonalNotes = ({ courseId, courseTitle, moduleId, moduleTitle, userId }) => {
  const [note, setNote] = useState("");
  const [editing, setEditing] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!userId) return;
    getNotesForCourseAndModule(userId, courseId, moduleId).then((notes) => {
      if (notes.length > 0) {
        setNote(notes[0].text);
        setNoteId(notes[0].id);
        setEditing(false);
      } else {
        setNote("");
        setNoteId(null);
        setEditing(false);
      }
      setLoading(false);
    });
  }, [userId, courseId, moduleId]);

  const handleSave = async () => {
    if (noteId) {
      await updateNote(noteId, note);
    } else {
      await addNote({
        userId,
        courseId,
        courseTitle,
        moduleId,
        moduleTitle,
        text: note,
      });
    }
    setEditing(false);
    setLoading(true);
    getNotesForCourseAndModule(userId, courseId, moduleId).then((notes) => {
      if (notes.length > 0) {
        setNote(notes[0].text);
        setNoteId(notes[0].id);
      } else {
        setNote("");
        setNoteId(null);
      }
      setLoading(false);
    });
  };

  const handleDelete = async () => {
    if (noteId) {
      await deleteNote(noteId);
      setNote("");
      setNoteId(null);
      setEditing(false);
    }
  };

  if (loading) return <div className="text-white">Loading note...</div>;

  return (
    <div className="bg-white/10 rounded-lg p-4 h-full">
      <div className="text-white text-lg font-bold mb-2 font-poppins">Your Personal Note</div>
      {!editing ? (
        <>
          <div
            className={`min-h-[100px] rounded p-2 font-poppins mb-3 ${
              note ? "text-white" : "text-white/40 italic"
            }`}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "background 0.2s"
            }}
          >
            {note ? note : "No note saved yet for this chapter."}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-[#6e74ff] text-white rounded font-semibold hover:bg-[#3131BD] transition"
            >
              {note ? "Edit Note" : "Add Note"}
            </button>
            {note && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-700 transition"
              >
                Delete
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          <textarea
            className="w-full min-h-[100px] rounded p-2 bg-white/20 text-white font-poppins mb-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your private note for this chapter..."
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#6e74ff] text-white rounded font-semibold hover:bg-[#3131BD] transition"
            >
              Save Note
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded font-semibold hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PersonalNotes;
