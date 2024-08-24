import "./App.css"
import { Character } from "./features/character/Character"
import Todo from "./features/todo/Todo"

const App = () => {
  return (
    <div className="App">
      <Character/>
      <Todo/>
    </div>
  )
}

export default App
