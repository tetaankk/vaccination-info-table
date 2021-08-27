import express from "express";
import database from "../database/index.js";
const vaccinationsRouter = express.Router();

vaccinationsRouter.get("/totalperdistrict", async (request, response) => {
  try {
    let vaccinations = await database.Vaccinations.totalPerDistrict();
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

vaccinationsRouter.get("/usedvaccinations/:date", async (request, response) => {
  try {
    let vaccinations = await database.Vaccinations.usedVaccinations(
      request.params.date
    );
    response.json(vaccinations);
  } catch (error) {
    console.log(error);
    response.status(500);
  }
});

vaccinationsRouter.get(
  "/averageusedvaccinationsperdistrict",
  async (request, response) => {
    try {
      let vaccinations =
        await database.Vaccinations.averageUsedVaccinationsPerDistrict();
      response.json(vaccinations);
    } catch (error) {
      console.log(error);
      response.status(500);
    }
  }
);

vaccinationsRouter.get("/infotable/:date", async (request, response) => {
  try {
    let vaccinations = await database.Vaccinations.infoTable(
      request.params.date
    );
    response.json(vaccinations);
  } catch (error) {
    console.log(error);
    response.status(500);
  }
});

export default vaccinationsRouter;
