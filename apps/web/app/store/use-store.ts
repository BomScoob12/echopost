import { UserResponseType } from '@echopost/shared-types';
import { create } from 'zustand';

type UserState = {
  user: UserResponseType | null;
  isAuthenticated: boolean;
};

type Action = {
  updateUser: (newUser: UserState['user']) => void;
  clearUser: () => void;
};

const useUserStore = create<UserState & Action>((set) => ({
  user: null,
  isAuthenticated: false,

  updateUser(newUser) {
    if (!newUser) {
      this.clearUser();
      return;
    }
    set({ user: newUser, isAuthenticated: true });
  },
  clearUser() {
    set({ user: null, isAuthenticated: false });
  },
}));

export default useUserStore;