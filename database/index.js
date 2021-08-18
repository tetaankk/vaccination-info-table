import * as mysql from "mysql";
import config from "../config/index.js";
import Vaccinations from "./vaccinations.js";
import Orders from "./orders.js";

export const Connection = mysql.createConnection(config.mysql);

Connection.connect((error) => {
  if (error) console.log(error);
});

export default {
  Vaccinations,
  Orders,
};
