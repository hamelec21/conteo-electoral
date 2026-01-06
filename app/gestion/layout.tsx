"use client";

import ProtectedRoute from "../components/ProtectedRoute";

export default function GestionLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
