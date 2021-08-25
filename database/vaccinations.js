import { Connection } from "./index.js";

export const totalPerDistrict = async () => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `
      SELECT o.healthCareDistrict, COUNT(*) AS injections
      FROM vaccinations.givenvaccinations v
      INNER JOIN vaccinations.order o ON v.sourceBottle = o.id
      GROUP BY o.healthCareDistrict
      ORDER BY injections DESC
      `,
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

export const usedVaccinationsPerDayPerDistrict = async (date) => {
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

export const averageUsedVaccinationsPerDistrict = async () => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `SELECT o.healthCareDistrict, COUNT(*) / COUNT(DISTINCT(DATE(v.vaccinationDate))) as injections
      FROM vaccinations.givenvaccinations v
      INNER JOIN vaccinations.order o ON v.sourceBottle = o.id
      GROUP BY o.healthCareDistrict`,
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
  totalPerDistrict,
  usedVaccinations,
  averageUsedVaccinationsPerDistrict,
};
