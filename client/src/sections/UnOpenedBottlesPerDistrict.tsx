import { FunctionComponent, useState, useEffect } from "react";
import { IOrder } from "../Interfaces";
import orderServices from "../services/orderServices";

const UnOpenedBottlesPerDistrict: FunctionComponent = () => {
  const [bottles, setBottles] = useState<IOrder[]>([]);

  useEffect(() => {
    orderServices.getUnOpenedBottles().then((response) => {
      setBottles(response.data);
    });
  }, []);

  const bottlesByDistrict = bottles.reduce(
    (acc, { healthCareDistrict, id }) => {
      if (!acc[healthCareDistrict]) {
        acc[healthCareDistrict] = 0;
      }
      acc[healthCareDistrict] += 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <ul>
      <h3>Unopened bottles by district</h3>
      {Object.entries(bottlesByDistrict).map(([healthCareDistrict, id]) => (
        <li>
          {healthCareDistrict} : {id}
        </li>
      ))}
    </ul>
  );
};

export default UnOpenedBottlesPerDistrict;
