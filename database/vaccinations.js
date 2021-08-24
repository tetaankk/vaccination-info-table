import { Connection } from "./index.js";

export const all = async () => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "SELECT * FROM vaccinations.givenvaccinations",
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

export const usedVaccinations = async (date) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `SELECT v.id, v.vaccinationDate, v.sourceBottle, o.healthCareDistrict
      FROM vaccinations.givenvaccinations v
      INNER JOIN vaccinations.order o ON v.sourceBottle = o.id 
      WHERE DATEDIFF(v.vaccinationDate, ?)=0`,
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
  usedVaccinations,
};
