import type { Middleware } from "@reduxjs/toolkit";

// Redux middleware that logs actions and state changes to the console
const loggerMiddleware: Middleware = 
   (storeAPI) =>     // Receives Redux store API (dispatch and getState)
   (next) =>         // Receives the next middleware in chain (or the reducer)
   (action) =>       // Receives the dispatched Redux action)
{     
   // Log the action being dispatched (in green)
   console.log("%c[Dispatching]", "color: green;", action);
   // Pass the action to the next middleware/reducer in chain
   const result = next(action);
   // Log the new state after the action was processed (in blue)
   console.log("%c[Next State]", "color: blue;", storeAPI.getState());
   // Return the result (usually the action itself)
   return result;
};

export default loggerMiddleware;