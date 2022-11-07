const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;

const DB = {
  user: [],
};

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello");
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

app.listen(port, () => {
  console.log("?");
});
