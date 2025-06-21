import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create async thunk
export const fetchRandomCount = createAsyncThunk(
   "counter/fetchRandom",
   async (_, { rejectWithValue }) => {
      try {
         const p = new Promise((resolve) => setTimeout(resolve, 1000));
         await p;
         return Math.floor(Math.random() * 2000 - 1000); // Random number -1000 to 1000
      } catch (err) {
         return rejectWithValue("Failed to fetch random number");
      }
   }
);

// Create a Redux slice for counter functionality
const counterSlice = createSlice({
   name: "counter", // Name of the slice, used in Redux DevTools
   initialState: 0, // Initial state is a number starting at 0
   reducers: {
      // Increment counter by 1, but don't exceed MAX_SAFE_INTEGER
      increment: (s) => (s < Number.MAX_SAFE_INTEGER ? ++s : s),
      // Decrement counter by 1, but don't go below MIN_SAFE_INTEGER
      decrement: (s) => (s > Number.MIN_SAFE_INTEGER ? --s : s),
      // Increment counter by a specific amount (provided in action payload)
      incrementBy: (s, a: PayloadAction<number>) => (s += a.payload),
      // Set counter to a specific value (provided in action payload)
      setTo: (_, a: PayloadAction<number>) => a.payload,
      // Reset counter back to 0
      reset: () => 0,
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchRandomCount.fulfilled, (_, action) => action.payload)
         .addCase(fetchRandomCount.rejected, (state, action) => {
            console.error(action.payload);
            return state;
         })
   },
});

// Export the action creators for use in components
export const { increment, decrement, incrementBy, reset, setTo } =
   counterSlice.actions;

// Export the reducer to be included in the store
export default counterSlice.reducer;
