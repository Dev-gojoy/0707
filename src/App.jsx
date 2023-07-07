import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/main";
import DashBoard from "./pages/dashboard";
import Footer from "./components/Footer";
import Governance from "./pages/governance";
import Covers from "./pages/covers";
import Create from "./pages/create";
import Detail from "./pages/detail";
import CoinQuote from "./pages/coinQuote";
export const apiKey = process.env.REACT_APP_INFURA_KEY;
function App() {
  const [account, setAccount] = useState();

  return (
    <BrowserRouter>
      <Header account={account} setAccount={setAccount} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Main />
            </div>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <div>
              <DashBoard account={account} />
            </div>
          }
        ></Route>
        <Route
          path="/covers"
          element={
            <div>
              <Covers account={account} />
            </div>
          }
        ></Route>
        <Route
          path="/governance"
          element={
            <div>
              <Governance />
            </div>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <div>
              <Create account={account} />
            </div>
          }
        ></Route>
        <Route
          path="/governance/:id"
          element={
            <div>
              <Detail account={account} setAccount={setAccount} />
            </div>
          }
        ></Route>
        <Route
          path="/covers/coindrop"
          element={
            <div>
              <CoinQuote account={account} />
            </div>
          }
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
