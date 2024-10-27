import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import { engine } from "express-handlebars";
import { resolve } from "node:path";
import credientials from "./config/credentials";

const app = express();
const port = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", resolve(import.meta.dirname, "./views"));

app.use(cookieParser(credientials.cookieSecret));
app.use(
  session({
    secret: credientials.cookieSecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  let name = req.session.name
  if (!name) {
    res.redirect("/login");
  } else {
    res.send(`Welcome ${name}`);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  req.session.name = req.body.name;
  res.send("Success");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
