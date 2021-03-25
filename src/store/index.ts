import create from 'zustand';

type Store = {
  notifications: string[];
  walletModalIsOpen: boolean;
  signModalIsOpen: boolean;
  requestModalIsOpen: boolean;
  viewModalIsOpen: boolean;
  enrollModalIsOpen: boolean;
  videoModalIsOpen: boolean;
  toggleVideoModal(): void;
  toggleWalletModal(): void;
  toggleSignModal(): void;
  toggleRequestModal(): void;
  toggleViewModal(): void;
  toggleEnrollModal(): void;
  addNotification(notification: string): any;
};

const useStore = create<Store>((set) => ({
  notifications: [],
  walletModalIsOpen: false,
  signModalIsOpen: false,
  requestModalIsOpen: false,
  viewModalIsOpen: false,
  enrollModalIsOpen: false,
  videoModalIsOpen: false,
  toggleVideoModal: () =>
    set((state) => ({ videoModalIsOpen: !state.videoModalIsOpen })),
  toggleWalletModal: () =>
    set((state) => ({ walletModalIsOpen: !state.walletModalIsOpen })),
  toggleSignModal: () =>
    set((state) => ({ signModalIsOpen: !state.signModalIsOpen })),
  toggleRequestModal: () =>
    set((state) => ({ requestModalIsOpen: !state.requestModalIsOpen })),
  toggleViewModal: () =>
    set((state) => ({ viewModalIsOpen: !state.viewModalIsOpen })),
  toggleEnrollModal: () =>
    set((state) => ({ enrollModalIsOpen: !state.enrollModalIsOpen })),
  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
}));

export default useStore;
