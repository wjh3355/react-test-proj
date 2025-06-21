import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from '@/utils/redux/store';
import {
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
   fetchRandomWords
} from "@/utils/redux/textSlice";
import toast from "react-hot-toast";

export function Text() {
   const text = useSelector((s: RootState) => s.text);
   const [inputText, setInputText] = useState('');
   const dispatch = useDispatch<AppDispatch>();
   const [isLoading, setIsLoading] = useState<boolean>(false)

   function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (!inputText.length) {
         toast.error("Input cannot be empty");
         return;
      } else if (inputText.length > 2000) {
         toast.error("Input is too long");
         return;
      }
      dispatch(updateText(inputText));
      setInputText('');
   };

   const handleFetchRandom = useCallback(async () => {
      setIsLoading(true);
      try {
         await dispatch(fetchRandomWords()).unwrap();
      } catch (err) {
         toast.error("Failed to fetch random words");
      } finally {
         setIsLoading(false);
      }
   }, [dispatch])

   return (
      <div>
         <h1 className="text-3xl font-bold">
            Text:&ensp;
            <span className='font-mono'>
               "{text}"
            </span>
         </h1>
         <form onSubmit={handleSubmit} className="space-x-2 mt-2">
            <textarea
               className="textarea"
               value={inputText}
               onChange={e => setInputText(e.target.value)}
               placeholder="Type something"
            />
            <button
               className="btn"
               type="submit"
               disabled={!inputText.trim()}
            >
               Submit
            </button>
         </form>
         <div className="mt-2 space-x-2">
            <button className="btn btn-primary" onClick={() => dispatch(resetText())}>Reset</button>
            <button className="btn btn-secondary" onClick={() => dispatch(reverseText())}>Reverse</button>
            <button className="btn btn-success" onClick={() => dispatch(uCaseText())}>Uppercase</button>
            <button className="btn btn-warning" onClick={() => dispatch(lCaseText())}>Lowercase</button>
            <button className="btn btn-error" onClick={() => dispatch(tgCaseText())}>Toggle case</button>
            <button className="btn btn-info" onClick={() => dispatch(ttCaseText())}>Title case</button>
            <button className="btn btn-neutral" onClick={() => dispatch(normSpacesText())}>Normalise spaces</button>
            <button className="btn btn-accent" onClick={() => dispatch(rmvSpacesText())}>Remove spaces</button>
            <button className="btn btn-soft btn-secondary" onClick={() => dispatch(sCaseText())}>Snake case</button>
            <button className="btn btn-soft btn-primary" onClick={() => dispatch(rmvPuncText())}>Remove punctuation</button>
            <button 
               className="btn btn-soft btn-success" 
               onClick={handleFetchRandom}
               disabled={isLoading}
            >
               {isLoading ? <span className='loading loading-spinner'/> : "Random"}
            </button>
         </div>
      </div>
   )
}