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

export const expiredGivenVaccinations = async () => {
  return new Promise((resolve, reject) => {
    Connection.query(
      "SELECT v.gender, v.vaccinationDate, v.sourceBottle, o.id, o.arrived FROM vaccinations.givenvaccinations v INNER JOIN vaccinations.order o ON v.sourceBottle = o.id WHERE DATEDIFF(v.vaccinationDate, o.arrived) > 30 ORDER BY DATEDIFF(v.vaccinationDate, o.arrived)",
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
  expiredGivenVaccinations,
};
