import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  passcode?: string;
}

interface OnboardingState {
  hasOnboarded: boolean;
  isAuthenticated: boolean;
  user: User | null;
  
  // Actions
  completeOnboarding: () => void;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      isAuthenticated: false,
      user: null,

      completeOnboarding: () => set({ hasOnboarded: true }),
      
      login: (user) => set({ isAuthenticated: true, user }),
      
      logout: () => set({ isAuthenticated: false, user: null }),
      
      updateUser: (updates) =>
        set((state) => ({
          user: { ...state.user, ...updates },
        })),

      reset: () => set({ hasOnboarded: false, isAuthenticated: false, user: null }),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
