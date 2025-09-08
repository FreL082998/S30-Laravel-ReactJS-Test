import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/user';
import { userService } from '../services/userService';

interface UsersState {
  list: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  status: 'idle',
  error: null
};

export const fetchUsersByRole = createAsyncThunk<User[], string>(
  'users/fetchByRole',
  async (role, thunkAPI) => {
    try {
      return await userService.getUsersByRole(role);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const createUser = createAsyncThunk<User, { full_name: string; email: string; roles: string[] }>(
  'users/create',
  async (payload, thunkAPI) => {
    try {
      return await userService.createUser(payload);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByRole.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsersByRole.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchUsersByRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Failed to fetch users';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || action.error.message || 'Failed to create user';
      });
  }
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;
