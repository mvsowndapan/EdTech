const courses = require("../data/courses");
const users = require("../data/users");
const enrollments = require("../data/enrollments");

const resolvers = {
  Query: {
    courses: () => courses,
    course: (_, { id }) => courses.find((course) => course.id === id),
  },
  Mutation: {
    enrollUser: (_, { userId, courseId, role }) => {
      const user = users.find((u) => u.id === userId);
      if (!user) {
        throw new Error("User not found");
      }

      const course = courses.find((c) => c.id === courseId);
      if (!course) {
        throw new Error("Course not found");
      }

      const newEnrollment = {
        id: (enrollments.length + 1).toString(),
        user_id: userId,
        course_id: courseId,
        role,
      };

      enrollments.push(newEnrollment);
      return newEnrollment;
    },
  },
  Enrollment: {
    user: (enroll) => users.find((u) => u.id === enroll.user_id),
    course: (enroll) => courses.find((c) => c.id === enroll.course_id),
  },
};

module.exports = resolvers;
