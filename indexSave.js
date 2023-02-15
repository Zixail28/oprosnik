require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const mailer = require("./nodemailer");

const mongoose = require("mongoose");
const Formdata = require("./models/formdata.js");

const db = process.env.DB_LINK;

mongoose
  .connect(db)
  .then((res) => {
    console.log("Succes connecting with DB");
  })
  .catch((err) => {
    console.log(err);
  })

const app = express();

app.set("view engine", "ejs")

const PORT = process.env.PORT || 9000; 
const domen = process.env.DOMEN || "127.0.0.1"; 
let user = undefined;
let clearDB = false;
const ques = {
  shopOnline: ["Не совершаю", "Редко", "Часто"],
  internetBank: ["Да", "Нет"],
  ingameBuy: ["Да", "Нет"],
  useVPN: ["Да", "Нет"],
  victimScummers: ["Да", "Нет"],
  securityInInternet: ["Сложные пароли", "Двухфакторная авторизация(аутентификация)", "Антивирус", "Постоянное шифрование"],
  leakInfo: ["Да", "Нет"],
  whatIsDevice: ["Мобильные телефоны(смартфоны)", "Персональный компьютер", "Не пользуетесь"],
}

let countForms = 0;
let obj = {};

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"))
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"))

app.use("/thisDir", express.static(__dirname + "/"))
app.use(bodyParser.urlencoded({ extended: false, }));
app.post("/form", (req, res) => {
  const message = {
    to: process.env.TO_MAIL,
    subject: `Данные с формы введенные ${new Date().toDateString()} в ${new Date().toTimeString().slice(0, 8)}`,
    html: `
    <h3>Данные с формы от ${new Date().toDateString()} в ${new Date().toTimeString().slice(0, 8)}</h3><br /><br />

    <b>Как часто вы совершаете покупки в интернет магазинах:</b> ${ques.shopOnline[req.body.shopOnline]} <br /><br />
    <b>Пользуетесь ли вы Интернет-банкингом:</b> ${ques.internetBank[req.body.internetBank]} <br /><br />
    <b>Вы совершаете внутриигровые покупки:</b> ${ques.ingameBuy[req.body.ingameBuy]} <br /><br />
    <b>Пользуетесь VPN:</b> ${ques.useVPN[req.body.useVPN]} <br /><br />
    <b>Вы становились жертвами мошенников (ваши близкие):</b> ${ques.victimScummers[req.body.victimScummers]} <br /><br />
    <b>Как вы обеспечиваете свою безопасность в интернете:</b> ${ques.securityInInternet[req.body.securityInInternet]} <br /><br />
    <b>Происходили ли у вас утечки информации, взломы аккаунтов:</b> ${ques.leakInfo[req.body.leakInfo]} <br /><br />
    <b>Каким устройством вы пользуетесь для операций в интернете:</b> ${ques.whatIsDevice[req.body.whatIsDevice]}
    `
  }
  mailer(message);
  const { shopOnline, internetBank, ingameBuy, useVPN, victimScummers, securityInInternet, leakInfo, whatIsDevice } = req.body;
  const formdata = new Formdata({ shopOnline, internetBank, ingameBuy, useVPN, victimScummers, securityInInternet, leakInfo, whatIsDevice });
  formdata
    .save()
    .then((res) => { console.log(res); })
    .catch((err) => { console.log(err); })
  user = req.body;
  res.redirect("/form");
})

app.get("/form", (req, response) => {
  if (typeof user === "object") {
    response.send("Данные успешно отправлены, для возврата на предыдущую страницу обновите страницу");
    user = undefined;
    return;
  }
  if (clearDB) {
    response.send("Данные успешно удалены, для возврата на предыдущую страницу обновите страницу");
    clearDB = !clearDB;
    return;
  }
  Formdata.find()
  .then((res) => { 
    convertingData(res);
    response.render(__dirname + "/index.ejs", { ...obj, countForms, domen, PORT }); 
  })
  .catch((err) => { console.log(err) })
});

app.get("/cleardb", (req, response) => {
  Formdata.deleteMany()
    .then((res) => { console.log(res);
    })
    .catch((err) => { console.log(err) })
  clearDB = !clearDB;
  response.redirect("/form")
});

app.listen(PORT,() => {
  console.log(`Server listening at http://${process.env.DOMEN}:${PORT}/form`)
})

function convertingData(arrOfFormdatas) {
  countForms = arrOfFormdatas.length;

  obj = {
    shopOnline: {
      0: 0,
      1: 0,
      2: 0,
    },
    internetBank: {
      0: 0,
      1: 0,
    },
    ingameBuy: {
      0: 0,
      1: 0,
    },
    useVPN: {
      0: 0,
      1: 0,
    },
    victimScummers: {
      0: 0,
      1: 0,
    },
    securityInInternet: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
    },
    leakInfo: {
      0: 0,
      1: 0,
    },
    whatIsDevice: {
      0: 0,
      1: 0,
      2: 0,
    },
  }

  for (const form of arrOfFormdatas) {
    for (const prop in form) {
      if (obj.hasOwnProperty(prop)) {
        obj[prop][form[prop]] += 1;
      }
    }
  }
};