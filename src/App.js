import './App.css';
import Nav from "./Navigation/Nav";
import Products from "./components/Product/Products";
import Sidebar from "./Navigation/Sidebar/Sidebar";


function App() {

  return (
    <>
      <Sidebar/>
      <Nav />
      <Products  />
    </>
  );
}

export default App;
