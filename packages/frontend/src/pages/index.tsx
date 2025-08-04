import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const GET_COURSES = gql`
  query GetCourses {
    courses {
      id
      title
      level
    }
  }
`;

interface course {
  id: string;
  title: string;
  level: string;
}

export default function Home() {
  const { data, loading, error } = useQuery(GET_COURSES);
  const { logout, user } = useAuth();

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error loading courses</p>;

  return (
    <div>
      <h1>All Courses</h1>
      {user ? (
        <h1 onClick={logout}>Logout</h1>
      ) : (
        <h1>
          <Link href={`/login`}>Login</Link>
        </h1>
      )}

      <ul>
        {data.courses.map((course: course) => (
          <li key={course.id}>
            <Link href={`/course/${course.id}`}>
              {course.title} ({course.level})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
