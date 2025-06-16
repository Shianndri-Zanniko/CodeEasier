import React from "react";

const CourseHeader = ({ title, description }) => (
  <div className="mb-6">
    <h1 className="text-2xl sm:text-3xl font-bold text-white font-poppins">{title}</h1>
    <p className="text-white/80 text-base mt-2">{description}</p>
  </div>
);

export default CourseHeader;
