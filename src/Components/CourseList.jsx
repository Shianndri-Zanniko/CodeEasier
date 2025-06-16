import React from "react";
import CourseCard from "./CourseCard";

// Renders a grid of course cards

const CourseList = ({ courses }) => (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white font-poppins">Available Courses</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
);

export default CourseList;
