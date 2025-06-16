import React, { useEffect, useState } from "react";
import { getComments, addComment } from "../services/commentsService";
import { useAuth } from "../contexts/authContext";
import { getUserProfile } from "../services/userService";

const CommentsSection = ({ courseId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getComments(courseId)
      .then(setComments)
      .finally(() => setLoading(false));
  }, [courseId]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;
    const userProfile = await getUserProfile(user.uid);
    await addComment(courseId, {
      userId: user.uid,
      userDisplayName: userProfile.firstName,
      text: newComment,
      parentId: null,
    });
    setNewComment("");
    setComments(await getComments(courseId));
  };

  return (
    <div className="mt-10">
      <div className="text-white text-xl font-bold mb-2 font-poppins">Comments</div>
      {loading ? (
        <div className="text-white/70">Loading comments...</div>
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white/10 rounded p-3 text-white">
              <span className="font-semibold">{comment.userDisplayName}: </span>
              {comment.text}
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-white/10 text-white"
          disabled={!user}
        />
        <button
          onClick={handleAddComment}
          className="bg-[#6e74ff] px-4 py-2 rounded text-white font-bold hover:bg-[#3131BD] transition"
          disabled={!user}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
