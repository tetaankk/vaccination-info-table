import express from "express";
import database from "../database/index.js";
const ordersRouter = express.Router();

ordersRouter.get("/all", async (request, response) => {
  try {
    let orders = await database.Orders.all();
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

ordersRouter.get("/expiredvaccinations/:date", async (request, response) => {
  try {
    let orders = await database.Orders.expiredVaccinations(request.params.date);
    response.json(orders);
  } catch (error) {
    console.log(error);
    response.status(500);
  }
});

export default ordersRouter;
