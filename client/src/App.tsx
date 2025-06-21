import { Counter } from "./components/Counter"
import { Text } from "./components/Text"

export default function App() {

   return (
      <section className="flex flex-col gap-10 m-5" id="app">
         <h1 className="text-4xl">Redux Playground</h1>
         <Counter/>
         <Text/>
         <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis eos vitae omnis beatae commodi sit recusandae laborum. Omnis perspiciatis adipisci similique excepturi! Dolore quas dolorum aspernatur sint voluptatibus consequuntur totam.
         </div>
      </section>
   )
}