import React from "react";

const ProfileEditForm = ({ profile }) => (
  <div className="flex-1 bg-[#3329A9] p-6 rounded-xl shadow-md text-white max-w-lg">
    <div className="text-lg font-bold mb-4 font-poppins">Edit Profile</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="text-sm">First Name</label>
        <input className="w-full mt-1 p-2 rounded bg-white/10 text-white" value={profile.firstName} readOnly />
      </div>
      <div>
        <label className="text-sm">Last Name</label>
        <input className="w-full mt-1 p-2 rounded bg-white/10 text-white" value={profile.lastName} readOnly />
      </div>
      <div>
        <label className="text-sm">Country</label>
        <input className="w-full mt-1 p-2 rounded bg-white/10 text-white" value={profile.country} readOnly />
      </div>
      <div>
        <label className="text-sm">Date of Birth</label>
        <input className="w-full mt-1 p-2 rounded bg-white/10 text-white" value={profile.dob} readOnly />
      </div>
      <div>
        <label className="text-sm">Email</label>
        <input className="w-full mt-1 p-2 rounded bg-white/10 text-white" value={profile.email} readOnly />
      </div>
      <div>
        <label className="text-sm">Password</label>
        <input className="w-full mt-1 p-2 rounded bg-white/10 text-white" value={profile.password} readOnly type="password" />
      </div>
      <div>
        <label className="text-sm">Institution</label>
        <input className="w-full mt-1 p-2 rounded bg-white/10 text-white" value={profile.institution} readOnly />
      </div>
    </div>
  </div>
);

export default ProfileEditForm;
