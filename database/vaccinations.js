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

export default {
  all,
};
