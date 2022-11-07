const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const session = require("express-session");

const DB = {
  user: [
    {
      id: "asd",
      pw: "asd",
    },
    {
      id: "asd1",
      pw: "asd1",
    },
    {
      id: "asd2",
      pw: "asd2",
    },
  ],
};

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
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/test", (req, res) => {
  console.log(req.session);
  res.send("?");
});

app.post("/join", (req, res) => {
  const { id, pw } = req.body;
  console.log(id);
  console.log(pw);
  DB.user.push({
    id: id,
    pw: pw,
  });
  res.send({
    code: "success",
    message: "회원가입되었습니다.",
  });
});

app.post("/login", (req, res) => {
  const { id, pw } = req.body;

  const user = DB.user;

  const findUser = user.find((item) => {
    return item.id === id && item.pw === pw;
  });
  /**
   * 세션 저장
   */
  req.session.loginUser = findUser;
  req.session.save();
  res.send(findUser);
});

app.listen(port, () => {
  console.log("?");
});
