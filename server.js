import express from "express";
import cors from "cors";
import vaccinationsRouter from "./routes/vaccinations.js";
import ordersRouter from "./routes/orders.js";
const app = express();
const PORT = 3001;

app.use(cors());

app.use("/api/vaccinations", vaccinationsRouter);
app.use("/api/orders", ordersRouter);

app.get("/", (req, res) => {
  res.send("Express server running");
});

app.listen(3001, () => {
  console.log(`Server running on port ${PORT}`);
});
