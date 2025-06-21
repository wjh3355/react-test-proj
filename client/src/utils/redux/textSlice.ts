import {
   createAsyncThunk,
   createSlice,
   type PayloadAction,
} from "@reduxjs/toolkit";
import { generate } from "random-words";

export const fetchRandomWords = createAsyncThunk(
   "text/fetchRandom",
   async (_, { rejectWithValue }) => {
      try {
         const p = new Promise((resolve) => setTimeout(resolve, 1000));
         await p;
         return generate({ exactly: 20, join: " " });
      } catch (err) {
         return rejectWithValue("Failed to fetch random words");
      }
   }
);

/**
 * A thunk in Redux is a function that:

    Delays or defers execution of some logic (usually async)

    Can access dispatch and getState

    Is useful for fetching data, handling side effects, or chaining actions
 */

// Create a Redux slice for text functionality
const textSlice = createSlice({
   name: "text", // Name of the slice, used in Redux DevTools
   initialState: "", // Initial state is an empty string
   reducers: {
      // Update the text with the provided string (from action payload)
      updateText: (_, a: PayloadAction<string>) => a.payload,
      // Reset the text back to an empty string
      resetText: () => "",
      // Reverse the text
      reverseText: (s) => s.split("").reverse().join(""),
      // Make text uppercase
      uCaseText: (s) => s.toUpperCase(),
      // Make text lowercase
      lCaseText: (s) => s.toLowerCase(),
      // Normalise spaces
      normSpacesText: (s) => s.replace(/\s+/g, " ").trim(),
      // Remove all spaces
      rmvSpacesText: (s) => s.replace(/\s+/g, ""),
      // Make string titlecase
      ttCaseText: (s) =>
         s
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .map((frag) => frag.charAt(0).toUpperCase() + frag.slice(1))
            .join(" "),
      // Toggle case
      tgCaseText: (s) =>
         s
            .trim()
            .split("")
            .map((char) => {
               if (char >= "A" && char <= "Z") return char.toLowerCase();
               if (char >= "a" && char <= "z") return char.toUpperCase();
               return char;
            })
            .join(""),
      // Remove punctuation
      rmvPuncText: (s) =>
         s.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, ""),
      // Snake case
      sCaseText: (s) => s.trim().toLowerCase().split(/\s+/).join("_"),
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchRandomWords.fulfilled, (_, action) => action.payload)
         .addCase(fetchRandomWords.rejected, (state, action) => {
            console.error(action.payload);
            return state;
         });
   },
});

/**
 * This slice defines a piece of state (here: a string of text), and HOW it can be updated
 * in response to certain actions. Inside the `reducers` object:
 *
 * ▶ Each key (`updateText`, `resetText`) is a REDUCER FUNCTION.
 *    A reducer is a PURE function that receives the current state and an action,
 *    and returns the next state. Does not mutate the original state directly
 *
 * ▶ Redux Toolkit automatically generates an ACTION CREATOR for each reducer.
 *      - function `updateText(payload)` that returns a simple object: { type: "text/updateText", payload }
 *      - The `aaaaaaa` reducer handles the "text/aaaaaaa" action type.
 *
 * ▶ Use the action creators (like `updateText("hello")`) in components to
 *    dispatch actions via Redux's `dispatch()`
 *
 *   const dispatch = useDispatch();
 *   dispatch(updateText("new text"));
 *
 * Redux takes that dispatched action, runs it through the reducer,
 * and updates the store accordingly. The updated state then re-renders subscribed components.
 * 
 * updateText("abc") creates an action object --> { type: "text/updateText", payload: "abc" }
   → dispatch(updateText("abc")) sends it into the store
   → Redux finds the reducer responsible for "text/updateText"
   → Reducer returns new state
   → Store updates, UI re-renders
 */


// Export the action creators for use in components
export const {
   updateText,
   resetText,
   reverseText,
   uCaseText,
   lCaseText,
   normSpacesText,
   rmvSpacesText,
   ttCaseText,
   tgCaseText,
   rmvPuncText,
   sCaseText,
} = textSlice.actions;

// Export the reducer to be included in the store
const textReducer = textSlice.reducer;
export default textReducer;
