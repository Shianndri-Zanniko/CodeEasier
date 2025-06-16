import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileStats from "../../components/ProfileStats";
import { getUserProfile, updateUserProfile } from "../../services/userService";
import { getCourses } from "../../services/courseService";
import { getAllUserProgress } from "../../services/userProgressService";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

// User profile page with editable details and stats

const Profile = () => {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);
  const [dob, setDob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completedCourses, setCompletedCourses] = useState(0);
  const [achievementCount, setAchievementCount] = useState(0);

  // Fetch user profile and course completion
  useEffect(() => {
    async function fetchUserAndProgress() {
      setLoading(true);
      setError(""); // Reset error
      try {
        const profile = await getUserProfile();
        setUser(profile);
        setForm(profile);
        setDob(profile && profile.dob ? new Date(profile.dob) : null);
        setCompletedCourses(profile?.completedCourses?.length || 0);
        setAchievementCount(Object.keys(profile?.achievements || {}).length);

        if (authUser && (!profile?.completedCourses || profile.completedCourses.length === 0)) {
          const allCourses = await getCourses();
          const allProgress = await getAllUserProgress(authUser.uid);

          let count = 0;
          allCourses.forEach(course => {
            const modules = course.modules || [];
            const progress = allProgress[course.id] || {};
              const allModulesCompleted =
                modules.length > 0 &&
                modules.every(
                  (mod) =>
                    progress[mod.id]?.lessonCompleted &&
                    progress[mod.id]?.exerciseCompleted
                );
            if (allModulesCompleted) count++;
          });
          setCompletedCourses(count);
        }
        } catch (err) {
          console.error(err);
          setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }
    fetchUserAndProgress();
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(""); 
  };

  const handleSave = async () => {
    setLoading(true);
    setError(""); 
    try {
      const { profileComplete: _profileComplete, ...profileData } = form;
      await updateUserProfile({
        ...profileData,
        dob: dob ? dob.toISOString().split("T")[0] : "",
      });
      setEditMode(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1400);
      
      const updatedProfile = await getUserProfile();
      setUser(updatedProfile);
      setForm(updatedProfile);
      setDob(updatedProfile && updatedProfile.dob ? new Date(updatedProfile.dob) : null);
      setAchievementCount(Object.keys(updatedProfile?.achievements || {}).length);
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    navigate("/forgot-password");
  };

  if (loading) return <div className="text-center text-white mt-12">Loading profile...</div>;
  if (!user) return <div className="text-center text-white mt-12">No user found.</div>;

  const level = user.level || 1;
  const longestStreak = user.longestStreak || 0;
  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email;
  const expForPrevLevel = Math.pow(level - 1, 2) * 100;
  const expForNextLevel = Math.pow(level, 2) * 100;
  const expProgress = `${(user.exp || 0) - expForPrevLevel}/${expForNextLevel - expForPrevLevel}`;

  return (
    <div className="min-h-screen bg-[#181a2b]">
      <Navbar />
      <div className="flex justify-center items-center min-h-[80vh] pt-8">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="bg-[#362e7c] rounded-2xl px-10 py-8 w-[440px] max-w-full shadow-xl flex flex-col justify-center">
            <div className="text-white text-xl font-bold mb-5 text-center font-poppins">Edit Profile</div>
            <form className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex flex-col">
                <label className="text-xs text-white/70 font-semibold mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName || ""}
                  onChange={handleChange}
                  className="bg-white/10 text-white rounded px-3 py-2"
                  disabled={!editMode}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-white/70 font-semibold mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName || ""}
                  onChange={handleChange}
                  className="bg-white/10 text-white rounded px-3 py-2"
                  disabled={!editMode}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-white/70 font-semibold mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={form.country || ""}
                  onChange={handleChange}
                  className="bg-white/10 text-white rounded px-3 py-2"
                  disabled={!editMode}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-white/70 font-semibold mb-1">Date of Birth</label>
                <DatePicker
                  selected={dob}
                  onChange={date => setDob(date)}
                  className="bg-white/10 text-white rounded px-3 py-2 w-full"
                  calendarClassName="!bg-white !text-white"
                  popperClassName="!z-50"
                  dateFormat="dd/MM/yyyy"
                  disabled={!editMode}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  placeholderText="Select date"
                />
              </div>
              <div className="flex flex-col col-span-1">
                <label className="text-xs text-white/70 font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email || ""}
                  className="bg-white/10 text-white rounded px-3 py-2"
                  disabled
                />
              </div>
              <div className="flex flex-col col-span-1">
                <label className="text-xs text-white/70 font-semibold mb-1">Institution</label>
                <input
                  type="text"
                  name="institution"
                  value={form.institution || ""}
                  onChange={handleChange}
                  className="bg-white/10 text-white rounded px-3 py-2"
                  disabled={!editMode}
                />
              </div>
            </form>
            {error && (
              <div className="mt-3 text-red-400 text-center" aria-live="assertive" role="alert">
                {error}
              </div>
            )}
            {saved && (
              <div className="mt-2 text-green-400 text-center" aria-live="polite" role="alert">
                Profile updated!
              </div>
            )}
            <div className="flex items-center mt-4 gap-2">
              <span className="text-xs text-white/70 font-semibold">Password</span>
              <button
                type="button"
                className="bg-[#6e74ff] text-white px-4 py-1 rounded font-semibold hover:bg-[#3131BD] transition text-xs"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
            {editMode && (
              <div className="flex gap-3 mt-4 justify-center">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-[#6e74ff] text-white px-5 py-2 rounded font-semibold hover:bg-[#3131BD] transition"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setForm(user);
                    setError("");
                  }}
                  className="bg-gray-400 text-white px-5 py-2 rounded font-semibold hover:bg-gray-500 transition"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            )}
            {!editMode && (
              <button
                className="bg-[#6e74ff] text-white mt-5 px-5 py-2 rounded font-semibold hover:bg-[#3131BD] transition"
                onClick={() => {
                  setEditMode(true);
                  setError("");
                }}
              >
                Edit
              </button>
            )}
          </div>
          <div className="bg-[#362e7c] rounded-2xl px-10 py-8 w-[320px] max-w-full shadow-xl flex flex-col justify-center items-center">
            <ProfileHeader name={name} level={level} expProgress={expProgress} />
            <ProfileStats
              longestStreak={longestStreak}
              completedCourses={completedCourses}
              achievementCount={achievementCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
