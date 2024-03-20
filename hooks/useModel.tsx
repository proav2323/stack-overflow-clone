import { questionsWithReplies } from "@/types";
import { User } from "@prisma/client";
import { create } from "zustand";

export type modelType = "Login" | "register" | "addQuestion" | "editQuestion";

export interface modelStore {
  type: modelType | null;
  data: modelData;
  isOpen: boolean;
  onOpen: (type: modelType, data?: modelData) => void;
  onClose: () => void;
}

interface modelData {
  currentUser?: User;
  question?: questionsWithReplies;
}

export const useModal = create<modelStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type: modelType, data = {}) =>
    set({ isOpen: true, type: type, data: data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
