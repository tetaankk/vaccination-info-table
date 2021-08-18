import express from "express";
import mysql from "mysql";
import cors from "cors";
import vaccinationsRouter from "./routes/vaccinations.js";
import ordersRouter from "./routes/orders.js";
const app = express();
const PORT = 3001;

app.use(cors());

app.use("/api/vaccinations", vaccinationsRouter);
app.use("/api/orders", ordersRouter);

/* app.get("/orders", (req, res) => {
  database.query("SELECT * FROM vaccinations.order", (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get("/vaccinations", (req, res) => {
  database.query(
    "SELECT * FROM vaccinations.givenvaccinations",
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).send(results);
      }
    }
  );
}); */

app.get("/", (req, res) => {
  res.send("Express server running");
});

app.listen(3001, () => {
  console.log(`Server running on port ${PORT}`);
});
