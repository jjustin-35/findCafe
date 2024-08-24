import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Address {
  country: string;
  districts: string;
  mrt: string;
  location: string;
  latitude: number;
  longitude: number;
}

interface Time {
  open_time: string;
}

export interface Cafe {
  _id: string;
  name: string;
  photo?: string[];
  limited_time: string;
  url: string;
  tel?: string;
  stars?: number;
  rank?: Record<string, number>;
  tags?: string[];
}

interface Comment {
  _id: string;
  user: {
    name: string;
    email: string;
    thumbnail?: string;
  };
  time: string;
  post: string;
  cafe: string;
  stars: number;
  tags: string[];
}

interface CafeState {
  cafe: Cafe;
  address: Address;
  time: Time;
  comments: Comment[];
  isFav: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CafeState = {
  cafe: {} as Cafe,
  address: {} as Address,
  time: {} as Time,
  comments: [],
  isFav: false,
  loading: 'idle',
  error: null,
};

export const fetchCafeData = createAsyncThunk(
  'cafe/fetchCafeData',
  async (name: string, { getState, dispatch }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/cafe/${name}`);
    const data = await res.json();
    return data;
  }
);

export const fetchComments = createAsyncThunk(
  'cafe/fetchComments',
  async (name: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/comment/${name}`);
    const data = await res.json();
    return data;
  }
);

export const toggleFavorite = createAsyncThunk(
  'cafe/toggleFavorite',
  async (_, { getState }) => {
    const state = getState() as { cafe: CafeState, user: { profile: { myFav: string[] } } };
    const { cafe, isFav } = state.cafe;
    const { myFav = [] } = state.user.profile;
    
    if (!isFav) {
      return [...myFav, cafe._id];
    } else {
      return myFav.filter((elem: string) => elem !== cafe._id);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'cafe/deleteComment',
  async ({ commentId, cafeName }: { commentId: string, cafeName: string }, { getState, dispatch }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const state = getState() as { auth: { token: string } };
    const token = state.auth.token;

    await fetch(`${apiUrl}/comment/set`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ _id: commentId }),
    });

    // 重新獲取評論
    dispatch(fetchComments(cafeName));

    return commentId;
  }
);

const cafeSlice = createSlice({
  name: 'cafe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCafeData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCafeData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const { address, time, ...cafe } = action.payload;
        state.cafe = cafe;
        state.address = {
          ...address,
          country: address.country !== 'unknown' ? address.country : '',
          districts: address.districts !== 'unknown' ? address.districts : '',
        };
        state.time = time;
      })
      .addCase(fetchCafeData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.isFav = !state.isFav;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment._id !== action.payload);
      });
  },
});

export default cafeSlice.reducer;
