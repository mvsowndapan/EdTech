import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const MOCK_USERS = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Ash", email: "Ash@example.com" },
  { id: "4", name: "Misty", email: "Misty@example.com" },
  { id: "5", name: "Brock", email: "Brock@example.com" },
  { id: "6", name: "Dawn", email: "Dawn@example.com" },
];

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState<string>(MOCK_USERS[0].id);

  const handleLogin = () => {
    const user = MOCK_USERS.find((u) => u.id === selectedUserId);
    if (user) {
      login(user);
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Mock Login</h1>
      <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
        {MOCK_USERS.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
