import { create } from "zustand";
import { Notification } from "../../types";

interface UIState {
  notifications: Notification[];
  isAdmin: boolean;
  addNotification: (message: string, type?: "success" | "error" | "warning") => void;
  removeNotification: (id: string) => void;
  setNotifications: (notifications: Notification[] | ((prev: Notification[]) => Notification[])) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  notifications: [],
  isAdmin: false,
  addNotification: (message, type = "success") => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      message,
      type,
    };
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // 3초 후 자동 제거
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== newNotification.id),
      }));
    }, 3000);
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  setNotifications: (notifications) =>
    set((state) => ({
      notifications: typeof notifications === "function" ? notifications(state.notifications) : notifications,
    })),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));
