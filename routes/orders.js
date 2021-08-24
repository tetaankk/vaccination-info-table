import express from "express";
import database from "../database/index.js";
const ordersRouter = express.Router();

ordersRouter.get("/all/:date", async (request, response) => {
  try {
    let orders = await database.Orders.allThisDay(request.params.date);
    response.json(orders);
  } catch (error) {
    console.log(error);
    response.status(500);
  }
});

ordersRouter.get("/unopenedbottles", async (request, response) => {
  try {
    let orders = await database.Orders.unOpenedBottles();
    response.json(orders);
  } catch (error) {
    console.log(error);
    response.status(500);
  }
});

ordersRouter.get(
  "/expiringvaccinationsthisday/:date",
  async (request, response) => {
    try {
      let orders = await database.Orders.expiringVaccinationsThisDay(
        request.params.date
      );
      response.json(orders);
    } catch (error) {
      console.log(error);
      response.status(500);
    }
  }
);

ordersRouter.get(
  "/expiringvaccinationstendays/:date",
  async (request, response) => {
    try {
      let orders = await database.Orders.expiringVaccinationsTenDays(
        request.params.date
      );
      response.json(orders);
    } catch (error) {
      console.log(error);
      response.status(500);
    }
  }
);

export default ordersRouter;
