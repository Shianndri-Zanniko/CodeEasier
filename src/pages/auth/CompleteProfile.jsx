import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile, getUserProfile } from "../../services/userService";
import Navbar from "../../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CompleteProfile = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    dob: "",
    institution: "",
  });
  const [dob, setDob] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [saving, setSaving] = useState(false);  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getUserProfile();
        if (data) {
          setForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            country: data.country || "",
            dob: data.dob || "",
            institution: data.institution || "",
          });
          setDob(data.dob ? new Date(data.dob) : null);
          const allFilled = ["firstName", "lastName", "country", "dob", "institution"]
            .every((f) => data[f] && String(data[f]).trim().length > 0);
          if (allFilled) {
            navigate("/dashboard");
            return; 
          }
        }
        } catch (err) {
          console.error(err);
          // Fail silently, let user fill the form
      }
      setLoading(false);
    }
    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const updatedForm = {
      ...form,
      dob: dob ? dob.toISOString().split("T")[0] : "",
    };

    // Validate required fields
    for (const [, value] of Object.entries(updatedForm)) {
      if (!value || String(value).trim().length === 0) {
        setError("Please fill out all fields.");
        setSaving(false);
        return;
      }
    }

    try {
      await updateUserProfile({
        ...updatedForm,
      });
      setSaving(false);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1e1e30] to-[#29296b] flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1">
        {loading ? (
          <div className="text-white text-center mt-10">Loading...</div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 p-8 rounded-2xl w-[350px] flex flex-col gap-4 mt-10"
          >
            <h2 className="text-white text-2xl font-bold mb-2 text-center">
              Complete Your Profile
            </h2>
            {error && (
              <div className="text-red-400 text-center mb-2" aria-live="assertive" role="alert">
                {error}
              </div>
            )}
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="bg-white/10 text-white px-4 py-2 rounded"
              required
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="bg-white/10 text-white px-4 py-2 rounded"
              required
            />
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              className="bg-white/10 text-white px-4 py-2 rounded"
              required
            />
            <DatePicker
              selected={dob}
              onChange={(date) => {
                setDob(date);
                setForm((prev) => ({
                  ...prev,
                  dob: date ? date.toISOString().split("T")[0] : "",
                }));
              }}
              className="bg-white/10 text-white px-4 py-2 rounded w-full"
              dateFormat="yyyy-MM-dd"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              placeholderText="Date of Birth"
              required
            />
            <input
              name="institution"
              value={form.institution}
              onChange={handleChange}
              placeholder="Institution"
              className="bg-white/10 text-white px-4 py-2 rounded"
              required
            />
            <button
              type="submit"
              disabled={saving}
              className="bg-[#6e74ff] text-white px-4 py-2 rounded font-semibold hover:bg-[#3131BD] transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompleteProfile;
