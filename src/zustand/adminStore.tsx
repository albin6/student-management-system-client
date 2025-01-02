import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Admin = {
  email: string;
  role: string;
};

interface IAdminStore {
  admin: Admin | null;
  setAdmin: (adminData: Admin) => void;
  clearAdmin: () => void;
}

export const useAdminStore = create<IAdminStore>()(
  persist(
    (set) => ({
      admin: null,

      setAdmin: (adminData: Admin) => set({ admin: adminData }),

      clearAdmin: () => set({ admin: null }),
    }),
    {
      name: "admin-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
