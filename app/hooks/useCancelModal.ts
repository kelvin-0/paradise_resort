import { create } from "zustand";

interface CancelModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  valueid: string;
}

const useCancelModal = create<CancelModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  valueid: "",
}));

export default useCancelModal;
