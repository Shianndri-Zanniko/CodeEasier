import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getNotesForUser,
  deleteNote,
  updateNote,
} from "../services/notesService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import pencil from "../assets/icons/pencil.svg";
import trashcan from "../assets/icons/trash_can.svg";

// Page listing all notes created by the user

const GlobalNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const navigate = useNavigate();

  const refreshNotes = () => {
    if (!user) return;
    getNotesForUser(user.uid).then(setNotes);
  };

  useEffect(() => {
    refreshNotes();
    // eslint-disable-next-line
  }, [user]);

  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditedText(note.text);
  };

  const handleSave = async (noteId) => {
    await updateNote(noteId, editedText);
    refreshNotes();
    setEditingId(null);
  };

  const handleDelete = async (noteId) => {
    await deleteNote(noteId);
    refreshNotes();
  };

  return (
    <div className="min-h-screen bg-[#16172B]">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-white mb-8">My Notes</h1>
        {notes.length === 0 ? (
          <div className="text-white/60 text-lg">No notes yet!</div>
        ) : (
          <div className="space-y-6">
            {notes.map((note) => (
              <div key={note.id} className="bg-white/5 rounded-lg p-4 flex flex-col gap-2">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="bg-[#6e74ff] text-white text-xs px-2 py-1 rounded font-bold">
                    {note.courseTitle}
                  </span>
                  <span className="bg-[#bfc6ff] text-xs px-2 py-1 rounded">{note.moduleTitle}</span>
                  <span className="text-xs text-white/60 ml-auto">
                    {new Date(note.timestamp).toLocaleString()}
                  </span>
                  <button onClick={() => handleEdit(note)} className="text-[#6e74ff] ml-2">
                    <img src={pencil} alt="Edit" className="w-4 h-4 inline" />
                  </button>
                  <button onClick={() => handleDelete(note.id)} className="text-red-400 ml-2">
                    <img src={trashcan} alt="Delete" className="w-4 h-4 inline" />
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/courses/${note.courseId}?module=${note.moduleId}`)
                    }
                    className="text-xs text-white bg-[#6e74ff] rounded px-2 py-1 ml-2"
                  >
                    Go to Note
                  </button>
                </div>
                {editingId === note.id ? (
                  <>
                    <textarea
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full rounded p-2 bg-white/20 text-white mb-2"
                    />
                    <div>
                      <button
                        onClick={() => handleSave(note.id)}
                        className="px-3 py-1 bg-[#6e74ff] text-white rounded font-semibold mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 bg-gray-400 text-white rounded font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-white whitespace-pre-line">{note.text}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalNotes;
