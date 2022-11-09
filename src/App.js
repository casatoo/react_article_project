import "./App.css";
import React from "react";
/**
 * 라우터, 라우트, 네비게이션 사용 react-router-dom
 */
import { Routes, Route, useNavigation, useNavigate } from "react-router-dom";
/**
 * axios 사용
 */
import axios from "axios";

/**
 *  다른 포트와 쿠키 정보 공유
 */
axios.defaults.withCredentials = true;

/**
 * 메인 페이지
 * 컴포넌트는 첫글자 무조건 대문자!!
 */
function Main() {
  let name = "my name";
  let value = "John Smith";
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  alert(document.cookie);
  return <div>메인페이지</div>;
}

/**
 *  로그인 페이지 컴포넌트
 * useState 로 uesr 생성
 * 로그인 함수로 서버와 통신 axios 사용
 * POST 방식으로 데이터 전송할때 data로 전송
 * 받는 데이너 res 콘솔출력
 * catch 로 에러 메세지 출력
 */
function Login() {
  let resultCode;
  const [user, setUser] = React.useState({
    id: "",
    pw: "",
  });
  const 로그인 = async () => {
    await axios({
      method: "POST",
      url: "http://127.0.0.1:4000/login",
      data: user,
    })
      .then((res) => {
        const { code, message } = res.data;
        alert(code + message);
        resultCode = code;
      })
      .catch((e) => {
        console.log(e);
      });
    /**
     * 새로고침
     */
    window.location.href = "/";
    console.log(resultCode);
  };
  /**
   *
   * 데이터 변경 함수
   * 이벤트 함수 onChange 로 입력값이 변경될때마다 실행
   *  user 객체를 복사해서 받아온 값으로 입력
   */
  const 데이터변경 = (event) => {
    const name = event.target.name;
    const cloneUsers = { ...user };
    cloneUsers[name] = event.target.value;

    setUser(cloneUsers);
  };

  return (
    <div>
      <input type="text" name="id" onChange={데이터변경} />
      <input type="password" name="pw" onChange={데이터변경} />
      <button type="button" onClick={로그인}>
        로그인
      </button>
    </div>
  );
}

/**
 * 회원가입 페이지 컴포넌트
 * 네비게이션 함수  변수로 받음
 * users useState 생성
 */
function Join() {
  const navigation = useNavigate();
  const [users, setUser] = React.useState({
    id: "",
    pw: "",
  });

  /**
   * 회원가입 함수로 DB 연결
   *
   */
  const 회원가입 = async () => {
    let resultCode;
    await axios({
      method: "POST",
      url: "http://127.0.0.1:4000/join",
      data: users,
    })
      .then((res) => {
        const { code, message } = res.data;
        alert(code + message);
        resultCode = code;
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(resultCode);
    if (resultCode === "fail") {
      navigation("/join");
    }
    navigation("/login");
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
