import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  role: string;
};

interface IUserStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (userData: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (userData: User) =>
        set({ user: userData, isAuthenticated: true }),

      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
