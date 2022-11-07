import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

function Main() {
  return <div>메인페이지</div>;
}

function Login() {
  return <div>login</div>;
}
function Join() {
  const [users, setUser] = React.useState({
    id: "",
    pw: "",
  });

  const 회원가입 = async () => {
    await axios({
      method: "POST",
      url: "http://127.0.0.1:4000/join",
      data: users,
    })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  };

  const 데이터변경 = (event) => {
    const name = event.target.name;
    const cloneUsers = { ...users };
    cloneUsers[name] = event.target.value;

    setUser(cloneUsers);
    console.log(users);
  };

  return (
    <div>
      <input type="text" name="id" onChange={데이터변경} />
      <input type="password" name="pw" onChange={데이터변경} />
      <button type="button" onClick={회원가입}>
        회원가입
      </button>
    </div>
  );
}

const StoreContext = React.createContext({});

function App() {
  return (
    <StoreContext.Provider value={{}}>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/join" element={<Join />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
