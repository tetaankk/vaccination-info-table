import { FunctionComponent, useState, useEffect } from "react";
import { IExpiredOrder } from "../Interfaces";
import orderServices from "../services/orderServices";

interface ExpiredVaccinationProps {
  date: Date;
}

const ExpiredVaccinations: FunctionComponent<ExpiredVaccinationProps> = (
  props
) => {
  const [expiredBottles, setExpiredBottles] = useState<IExpiredOrder[]>([]);

  useEffect(() => {
    const dateString = props.date.toISOString().slice(0, 10).replace(/-/g, "");
    console.log(dateString);
    console.log(typeof dateString);

    orderServices.getExpiredVaccinations(dateString).then((response) => {
      setExpiredBottles(response.data);
    });
  }, [props.date]);

  const expiredInjectionsPerDistrict = expiredBottles.reduce(
    (acc, { healthCareDistrict, unUsedInjections }) => {
      if (!acc[healthCareDistrict]) {
        acc[healthCareDistrict] = 0;
      }
      acc[healthCareDistrict] += unUsedInjections;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <ul>
      <h3>Expired vaccinations by district</h3>
      {Object.entries(expiredInjectionsPerDistrict).map(
        ([healthCareDistrict, unUsedInjections]) => (
          <li>
            {healthCareDistrict} : {unUsedInjections}
          </li>
        )
      )}
    </ul>
  );
};

export default ExpiredVaccinations;
