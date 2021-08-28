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

export const infoTable = async (date) => {
  return new Promise((resolve, reject) => {
    Connection.query(
      `WITH dailyArrivedInjectionsPerDistrict AS (
        SELECT 	o.healthCareDistrict as healthCareDistrict, 
                DATE(o.arrived) as date, 
                SUM(o.injections) as arrivedInjections
        FROM vaccinations.order o
        WHERE DATE(o.arrived) = ?
        GROUP BY o.healthCareDistrict, DATE(o.arrived)
      ),
      dailyUsedInjectionsPerDistrict AS (
        SELECT 	o.healthCareDistrict as healthCareDistrict, 
                DATE(v.vaccinationDate) as date, 
                COUNT(*) as usedInjections
        FROM vaccinations.givenvaccinations v
        INNER JOIN vaccinations.order o ON v.sourceBottle = o.id
        WHERE DATE(v.vaccinationDate) = ?
        GROUP BY o.healthCareDistrict, DATE(v.vaccinationDate)
      ),
      vaccinesExpiringThisDay AS (
        WITH table1 AS (
          SELECT  o.healthCareDistrict, 
                  o.id, 
                  o.injections, 
                  o.arrived, 
                  COUNT(v.id) AS numOfVaccsGiven, 
                  o.injections - COUNT(v.id) AS unUsedInjections
          FROM vaccinations.order o
          LEFT JOIN  vaccinations.givenvaccinations v ON o.id = v.sourceBottle
          WHERE DATEDIFF(?, o.arrived) = 30
          GROUP BY o.healthCareDistrict, o.id, o.injections, o.arrived
          HAVING NumOfVaccsGiven < o.injections)
      
        SELECT  healthCareDistrict, 
                SUM(unUsedInjections) as expiringInjections
        FROM table1
        GROUP BY healthCareDistrict
      ),
      vaccinesExpiringInTenDays as (
        WITH table10 AS (
          SELECT  o.healthCareDistrict, 
                  o.id, 
                  o.injections, 
                  o.arrived, 
                  COUNT(v.id) AS numOfVaccsGiven, 
                  o.injections - COUNT(v.id) AS unUsedInjections, 
                  DATEDIFF("2021-04-12", DATE(o.arrived))
          FROM vaccinations.order o
          LEFT JOIN  vaccinations.givenvaccinations v ON o.id = v.sourceBottle
          WHERE DATEDIFF(?, o.arrived) BETWEEN 20 and 29
          GROUP BY o.healthCareDistrict, o.id, o.injections, o.arrived
          HAVING numOfVaccsGiven < o.injections
          ORDER BY o.healthCareDistrict)
        
        SELECT  healthCareDistrict, 
                SUM(unUsedInjections) as expiringVaccinesTenDays
        FROM table10
        GROUP by healthCareDistrict
        )
      
      SELECT  dar.healthCareDistrict, 
              dar.date, 
              dar.arrivedInjections, 
              dus.usedInjections, 
              ved.expiringInjections, 
              ve10.expiringVaccinesTenDays 
      FROM dailyArrivedInjectionsPerDistrict dar
      LEFT JOIN dailyUsedInjectionsPerDistrict dus ON dar.healthCareDistrict = dus.healthCareDistrict
      LEFT JOIN vaccinesExpiringThisDay ved ON dar.healthCareDistrict = ved.healthCareDistrict
      LEFT JOIN vaccinesExpiringInTenDays ve10 ON dar.healthCareDistrict = ve10.healthCareDistrict  
      `,
      [date, date, date, date],
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
  infoTable,
};
