import { useUserStore } from "@/zustand/store";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return children;
}

export function RequireNoAuth({ children }: RequireAuthProps) {
  const { user } = useUserStore();
  if (user) {
    return <Navigate to={"/dashboard"} />;
  }
  return children;
}
