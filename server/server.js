const express = require("express");
const app = express();
const cors = require("cors");

/**
 * DB 연결 수행전 라이브러리 호출
 */
const mysql = require("mysql2");
const db = mysql.createPoolCluster();

/**
 * 서버 포트
 */
const port = 4000;
/**
 * 세션 사용을 위한 부분
 */
const session = require("express-session");
app.use(express.json());
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: true,
    credentials: true, // 다른 포트의 쿠키 정보 공유
  })
);

/**
 * mysql 접속 정보 생성
 */
db.add("article_project", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "article_project",
  port: 3306,
});

/**
 * 루트 경로
 * db 연결
 * 비동기 = 순차적으로 실해되지 않는다.
 * 비동기를 동기로 바꿔야 함.
 * promise 객체로 묶음
 * async awiat 추가 ( 위치 확인 )
 */
app.get("/", async (req, res) => {
  let result = null;

  /**
   * 프로미스 객체로 묶음 (컴포넌트?)
   */
  const 데이터 = await new Promise(function (resolve, reject) {
    /** 위에 저장한 접속정보 이름 */
    db.getConnection("article_project", function (error, connection) {
      /** 에러 발생 시 에러메세지 출력 */
      if (error) {
        console.log("DB 연결 오류");
        /** 프로미스 객체로 만드는것을 거부한다. */
        reject(true);
      }
      /** 데이터베이스로 쿼리 보냄
       */
      connection.query("SELECT * FROM `user`", function (error, data) {
        if (error) {
          console.log("쿼리 오류", error);
          reject(true);
        }
        /** 데이터 받음 출력 */
        resolve(data);
        result = data;
      });
      /** 접속 해제 */
      connection.release();
    });
  });
  res.send(result);
});

/**
 * 테스트 경로 세션을 콘솔로그로 출력함
 */
app.get("/session", (req, res) => {
  console.log(req.session);
  res.send("?");
});
/**
 * 로그인 페이지
 * post 사용
 * id, pw 를 받아서 DB에 저장하고 code와 message를 전달
 */
app.post("/join", async (req, res) => {
  const { id, pw } = req.body;
  let result = {
    code: "success",
    message: "회원가입되었습니다.",
  };

  const idCheck = `SELECT COUNT(*) AS C FROM user WHERE id = '${id}';`;

  const data = await DB접속(idCheck);

  if (data[0].C >= 0) {
    console.log("중복체크");
    result.code = "fail";
    result.message = "중복된 아이디";
    res.send(result);
    return;
  }

  const query = `INSERT INTO user SET id = '${id}', password = '${pw}', nickName = '아무개';`;
  await DB접속(query);
  res.send(result);
});
/**
 * 로그인 페이지
 * id 와 pw 를 받아서 find로 DB에서 일치하는 객체을 찾아서 세션에 저장
 * 찾은 객체 정보를 전달
 */
app.post("/login", async (req, res) => {
  const { id, pw } = req.body;
  let result = {
    code: "success",
    message: "로그인 성공",
  };

  const loginCheckQuery = `SELECT COUNT(*) AS C FROM user WHERE id = '${id}' AND password = '${pw}';`;

  const loginCheck = await DB접속(loginCheckQuery);
  console.log(loginCheck[0].C);

  if (!loginCheck[0].C) {
    result.code = "fail";
    result.message = "아이디 또는 비밀번호가 틀렸습니다.";
    res.send(result);
  }
  /**
   * 세션 저장
   */
  req.session.save();
  res.send(result);
});

/**
 * 저장되고 로그 출력
 */
app.listen(port, () => {
  console.log("^^");
});

/**
 * DB 접속 정보 함수
 */

const DB접속 = (query) => {
  return new Promise(function (resolve, reject) {
    /** 위에 저장한 접속정보 이름 */
    db.getConnection("article_project", function (error, connection) {
      /** 에러 발생 시 에러메세지 출력 */
      if (error) {
        console.log("DB 연결 오류");
        /** 프로미스 객체로 만드는것을 거부한다. */
        reject(true);
      }
      /** 데이터베이스로 쿼리 보냄
       */
      connection.query(query, function (error, data) {
        if (error) {
          console.log("쿼리 오류", error);
          reject(true);
        }
        /** 데이터 받음 출력 */
        resolve(data);
      });
      /** 접속 해제 */
      connection.release();
    });
  });
};

app.get("/test", async (req, res) => {
  const query = "SELECT * FROM `user`";
  const data = await DB접속(query);
  console.log(data);
  res.send(data);
});

/**
 * 세션 정보 가져오기
 *
 */
app.get("/user", (req, res) => {
  res.send(req.session.loginUser);
});
