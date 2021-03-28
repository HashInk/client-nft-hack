import create from 'zustand';

type Store = {
  videoModalIsOpen: boolean;
  emailModalIsOpen: boolean;
  toggleVideoModal(): void;
  toggleEmailModal(): void;
};

const useStore = create<Store>((set) => ({
  videoModalIsOpen: false,
  emailModalIsOpen: false,
  toggleVideoModal: () =>
    set((state) => ({ videoModalIsOpen: !state.videoModalIsOpen })),
  toggleEmailModal: () =>
    set((state) => ({ emailModalIsOpen: !state.emailModalIsOpen })),
}));

export default useStore;
