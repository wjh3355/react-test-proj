import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/utils/redux/store';
import { increment, decrement, incrementBy, reset, setTo, fetchRandomCount } from '@/utils/redux/counterSlice';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { Redo, Undo } from 'lucide-react';
import { ActionCreators } from 'redux-undo';

export function Counter() {
   const count = useSelector((s: RootState) => s.counter.present);
   const countHistory = useSelector((s: RootState) => s.counter.past);
   const countFuture = useSelector((s: RootState) => s.counter.future);
   const [inputNumStr, setInputNumStr] = useState<string>("");
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useDispatch<AppDispatch>();

   const hasHistory = countHistory.length > 0;
   const hasFuture = countFuture.length > 0;

   const handleFetchRandom = useCallback(async () => {
      setIsLoading(true);
      try {
         await dispatch(fetchRandomCount()).unwrap();
      } catch (err) {
         toast.error("Failed to fetch random number");
      } finally {
         setIsLoading(false);
      }
   }, [dispatch])

   const handleSubmit = useCallback((i: string) => {
      const inputNum = parseInt(i.trim(), 10);
      if (Number.isNaN(inputNum)) {
         toast.error("Invalid input");
         return;
      } else if (inputNum > Number.MAX_SAFE_INTEGER || inputNum < Number.MIN_SAFE_INTEGER) {
         toast.error("Number is out of bounds");
         return;
      }
      dispatch(setTo(inputNum));
      setInputNumStr('');
   }, [dispatch])

   return (
      <div className="space-y-2">
         <h1 className="text-3xl font-bold">
            Counter:&ensp;
            <span className='font-mono'>
               {count}
            </span>
         </h1>
         <div className="space-x-2">
            <button className="btn btn-primary" onClick={() => dispatch(increment())}>+1</button>
            <button className="btn btn-secondary" onClick={() => dispatch(decrement())}>-1</button>
            <button className="btn btn-info" onClick={() => dispatch(incrementBy(2))}>+2</button>
            <button className="btn btn-accent" onClick={() => dispatch(reset())}>Reset</button>
            <button 
               className="btn btn-primary w-20" 
               onClick={handleFetchRandom}
               disabled={isLoading}
            >
               {isLoading ? <span className='loading loading-spinner'/> : "Random"}
            </button>
         </div>
         <div className='space-x-2'>
            <input
               type="number"
               className='input w-40'
               placeholder='enter a number'
               value={inputNumStr}
               onChange={e => setInputNumStr(e.target.value)}
            />
            <button
               className='btn btn-warning'
               disabled={!inputNumStr.length}
               onClick={() => handleSubmit(inputNumStr)}
            >
               Set
            </button>
         </div>
         <div className='space-x-2'>
            <button
               className='btn btn-square'
               onClick={() => dispatch(ActionCreators.undo())}
               disabled={!hasHistory}
            >
               <Undo />
            </button>
            <button
               className='btn btn-square'
               onClick={() => dispatch(ActionCreators.redo())}
               disabled={!hasFuture}
            >
               <Redo />
            </button>
            <button
               className='btn btn-primary'
               onClick={() => dispatch(ActionCreators.clearHistory())}
            >
               Clear history
            </button>
         </div>
         <div>
            History: {countHistory.join(", ")} <br />
            Future: {countFuture.join(", ")}
         </div>
      </div>
   );
}
