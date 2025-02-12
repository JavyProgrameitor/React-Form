import ValidationForm from "./components/Validation";
import { Nav } from "./components/Navbar";
import { Foot } from "./components/Footer";

function App() {
  return (
    <div className="bg-gray-200">
      <div className="flex-col items-center justify-center bg-slate-200 rounded shadow-2xl">
        <Nav />
      </div>
      <div className="mt-10 flex items-center justify-center">
        <ValidationForm />
      </div>
      <div className="mt-10 flex items-center justify-center bg-slate-200 rounded shadow-2xl">
        <Foot />
        </div>
    </div>
  );
}

export default App;
