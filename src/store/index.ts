import create from 'zustand';

type Store = {
  walletModalIsOpen: boolean;
  signModalIsOpen: boolean;
  requestModalIsOpen: boolean;
  viewModalIsOpen: boolean;
  toggleWalletModal(): void;
  toggleSignModal(): void;
  toggleRequestModal(): void;
  toggleViewModal(): void;
};

const useStore = create<Store>((set) => ({
  walletModalIsOpen: false,
  signModalIsOpen: false,
  requestModalIsOpen: false,
  viewModalIsOpen: false,
  toggleWalletModal: () =>
    set((state) => ({ walletModalIsOpen: !state.walletModalIsOpen })),
  toggleSignModal: () =>
    set((state) => ({ signModalIsOpen: !state.signModalIsOpen })),
  toggleRequestModal: () =>
    set((state) => ({ requestModalIsOpen: !state.requestModalIsOpen })),
  toggleViewModal: () =>
    set((state) => ({ viewModalIsOpen: !state.viewModalIsOpen })),
}));

export default useStore;
