import "./App.css";
import { RouteList } from "./components/RouteList";

function App() {
  return (
    <div>
      <h1>Phone book</h1>
      <div style={{marginBlock: '2rem'}}>
        <RouteList/>
      </div>
    </div>
  );
}

export default App;
