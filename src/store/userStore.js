import { create } from "zustand";

const useUserStore = create((set) => ({
  isUserLoggedIn: false,
  login: () => set({ isUserLoggedIn: true }),
  logout: () => set({ isUserLoggedIn: false }),
}));

export default useUserStore;
