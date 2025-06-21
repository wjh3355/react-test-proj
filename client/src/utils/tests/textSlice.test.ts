import textReducer, {
   updateText,
   resetText,
   normSpacesText,
   reverseText,
} from "../redux/textSlice";

describe("textSlice", () => {
   describe("initial state", () => {
      test("should return empty string when no state provided", () => {
         expect(textReducer(undefined, { type: "unknown" })).toEqual("");
      });
   });

   describe("updateText", () => {
      test("should update empty state with new text", () => {
         expect(textReducer("", updateText("new text"))).toEqual("new text");
      });

      test("should replace existing text with new text", () => {
         expect(textReducer("old text", updateText("new text"))).toEqual(
            "new text"
         );
      });

      test("should handle empty string update", () => {
         expect(textReducer("old text", updateText(""))).toEqual("");
      });
   });

   describe("resetText", () => {
      test("should reset to empty string from populated state", () => {
         expect(textReducer("some text", resetText())).toEqual("");
      });

      test("should maintain empty string when resetting empty state", () => {
         expect(textReducer("", resetText())).toEqual("");
      });
   });

   describe("normSpacesText", () => {
      test("should normalize multiple spaces between words", () => {
         expect(textReducer("hello   world", normSpacesText())).toEqual(
            "hello world"
         );
      });

      test("should trim leading/trailing spaces", () => {
         expect(textReducer("  hello world  ", normSpacesText())).toEqual(
            "hello world"
         );
      });

      test("should normalize newlines and tabs", () => {
         expect(textReducer("hello\n\tworld", normSpacesText())).toEqual(
            "hello world"
         );
      });

      test("should handle empty string", () => {
         expect(textReducer("", normSpacesText())).toEqual("");
      });

      test("should handle string with only spaces", () => {
         expect(textReducer("   ", normSpacesText())).toEqual("");
      });
   });

   describe("reverseText", () => {
      test("should reverse the text", () => {
         expect(textReducer("abc", reverseText())).toEqual("cba");
      });

      test("should handle empty string", () => {
         expect(textReducer("", reverseText())).toEqual("");
      });
   });

   describe("unhandled actions", () => {
      test("should ignore unknown actions and return the current state", () => {
         const state = "hello";
         const nextState = textReducer(state, {
            type: "text/doesNotExist",
            payload: "...",
         });
         expect(nextState).toBe(state); // state should not change
      });
   });
});
