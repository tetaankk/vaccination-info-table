import { Connection } from "./index.js";

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query("SELECT * FROM vaccinations.order", (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

export const unOpenedBottles = async () => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "SELECT * FROM vaccinations.order WHERE id NOT IN (SELECT sourceBottle FROM vaccinations.givenvaccinations)",
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

export const expiredVaccinations = async (date) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `
    SELECT o.healthCareDistrict, o.id, o.injections, o.arrived, COUNT(v.id) AS numOfVaccsGiven, o.injections - COUNT(v.id) AS unUsedInjections
    FROM vaccinations.order o
    LEFT JOIN  vaccinations.givenvaccinations v ON o.id = v.sourceBottle
    WHERE DATEDIFF(?, o.arrived) > 30
    GROUP BY o.healthCareDistrict, o.id, o.injections, o.arrived
    HAVING NumOfVaccsGiven < o.injections
    ORDER BY o.healthCareDistrict
    `,
      date,
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

export default {
  all,
  unOpenedBottles,
  expiredVaccinations,
};
