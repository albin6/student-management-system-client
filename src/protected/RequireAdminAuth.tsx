import { useAdminStore } from "@/zustand/adminStore";
import { Navigate } from "react-router-dom";

interface RequireAdminProps {
  children: React.ReactNode;
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const { admin } = useAdminStore();

  if (!admin || admin.role != "admin") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
