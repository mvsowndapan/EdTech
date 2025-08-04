import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Enrollment {
  courseId: string;
  role: "student" | "professor";
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  enrollments: Enrollment[];
  setEnrollments: React.Dispatch<React.SetStateAction<Enrollment[]>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedEnrollments = localStorage.getItem("enrollments");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedEnrollments) {
      setEnrollments(JSON.parse(storedEnrollments));
    }
  }, []);

  // Persist user and enrollments to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("enrollments", JSON.stringify(enrollments));
  }, [enrollments]);

  const login = (user: User) => setUser(user);
  const logout = () => {
    setUser(null);
    setEnrollments([]);
    localStorage.removeItem("user");
    localStorage.removeItem("enrollments");
  };

  return <AuthContext.Provider value={{ user, login, logout, enrollments, setEnrollments }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
