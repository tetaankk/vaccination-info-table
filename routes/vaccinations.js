import express from "express";
import database from "../database/index.js";
const vaccinationsRouter = express.Router();

vaccinationsRouter.get("/all", async (request, response) => {
  try {
    let vaccinations = await database.Vaccinations.all();
    response.json(vaccinations);
  } catch (error) {
    console.log(error);
    response.status(500);
  }
});

vaccinationsRouter.get(
  "/expiredgivenvaccinations",
  async (request, response) => {
    try {
      let vaccinations = await database.Vaccinations.expiredGivenVaccinations();
      response.json(vaccinations);
    } catch (error) {
      console.log(error);
      response.status(500);
    }
  }
);

export default vaccinationsRouter;
