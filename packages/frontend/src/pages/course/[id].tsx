import { useRouter } from "next/router";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Link from "next/link";

const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      id
      title
      description
      level
    }
  }
`;

const ENROLL_USER = gql`
  mutation EnrollUser($userId: ID!, $courseId: ID!, $role: Role!) {
    enrollUser(userId: $userId, courseId: $courseId, role: $role) {
      id
      role
    }
  }
`;

export default function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { user, enrollments, setEnrollments } = useAuth();
  const [enrollUser] = useMutation(ENROLL_USER);
  const [loadingEnroll, setLoadingEnroll] = useState(false);

  const { data, loading, error } = useQuery(GET_COURSE, { variables: { id } });

  if (loading) return <p>Loading course...</p>;
  if (error) return <p>Course not found</p>;
  if (!user) return <p>Please login to enroll.</p>;

  const course = data.course;

  // Check enrollment and role for current user & course
  const enrollment = enrollments.find((e) => e.courseId === course.id);

  const handleEnroll = async () => {
    if (!user) return;
    setLoadingEnroll(true);

    try {
      const role: "student" | "professor" = "student"; // Simplify: default role is student on enroll
      const { data } = await enrollUser({
        variables: { userId: user.id, courseId: course.id, role },
      });
      // Update enrollments in Context
      setEnrollments((prev) => [...prev, { courseId: course.id, role }]);
      router.push("/enrollment-confirmation");
    } catch (e) {
      alert("Enrollment failed");
    } finally {
      setLoadingEnroll(false);
    }
  };

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>Level: {course.level}</p>

      {enrollment ? (
        <>
          <p>
            You are enrolled as <b>{enrollment.role}</b>.
          </p>
          {enrollment.role === "professor" ? (
            <>
              <button onClick={() => alert("Edit course feature coming soon!")}>Edit Course</button>
              <p>Here is the course content...</p>
            </>
          ) : (
            <p>Here is the course content (read-only for students).</p>
          )}
        </>
      ) : (
        <button disabled={loadingEnroll} onClick={handleEnroll}>
          {loadingEnroll ? "Enrolling..." : "Enroll"}
        </button>
      )}
      <p>
        <Link href="/">Back to courses</Link>
      </p>
    </div>
  );
}
