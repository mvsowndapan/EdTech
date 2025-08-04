import Link from "next/link";

export default function EnrollmentConfirmation() {
  return (
    <div>
      <h1>Enrollment Successful!</h1>
      <p>Thank you for enrolling in the course.</p>
      <Link href="/">Go to course list</Link>
    </div>
  );
}
