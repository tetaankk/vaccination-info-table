import { FunctionComponent, useState, useEffect } from "react";
import { IExpiredOrder } from "../../Interfaces";
import orderServices from "../../services/orderServices";

interface ExpiringVaccinationsThisDayProps {
  date: Date;
}

const ExpiringVaccinationsThisDay: FunctionComponent<ExpiringVaccinationsThisDayProps> =
  (props) => {
    const [expiredBottles, setExpiredBottles] = useState<IExpiredOrder[]>([]);

    useEffect(() => {
      const dateString = props.date
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");

      orderServices
        .getExpiringVaccinationsThisDay(dateString)
        .then((response) => {
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
        <h3>Vaccinations expiring the chosen day by district</h3>
        {expiredBottles.length > 0 ? (
          Object.entries(expiredInjectionsPerDistrict).map(
            ([healthCareDistrict, unUsedInjections], index) => (
              <li key={index}>
                {healthCareDistrict} : {unUsedInjections}
              </li>
            )
          )
        ) : (
          <li>No vaccinations expired the chosen day</li>
        )}
      </ul>
    );
  };

export default ExpiringVaccinationsThisDay;
