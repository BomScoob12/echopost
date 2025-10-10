import { create } from 'zustand';
import { isAxiosError } from 'axios';
import { getUserMe, postLogin, postLogout } from '@/lib/api/auth';
import type { SignInDtoType, UserResponseType } from '@echopost/shared-types';

type UserState = {
  user: UserResponseType | null | undefined;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

type UserActions = {
  login: (credentials: SignInDtoType) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  reset: () => void;
};

const initialState: UserState = {
  user: undefined,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const useAuthStore = create<UserState & UserActions>((set) => ({
  ...initialState,

  login: async (credentials) => {
    set({ loading: true, error: null });

    try {
      await postLogin(credentials);
      const { data } = await getUserMe();

      set({
        user: data,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      let errorMsg = 'Login failed';
      if (isAxiosError(err)) {
        errorMsg = err.response?.data?.message || err.message;
      }
      errorMsg = err instanceof Error ? err.message : String(err);
      set({
        user: null,
        loading: false,
        error: errorMsg,
        isAuthenticated: false,
      });
    }
  },

   fetchUser: async () => {
    set({ loading: true });
    try {
      const {data} = await getUserMe();
      
      set({
        user: data,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },

  logout: async () => {
    try {
      await postLogout();
    } finally {
      set(initialState);
    }
  },

  reset: () => set(initialState),
}));
