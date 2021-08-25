import { FunctionComponent, useState, useEffect } from "react";
import { IExpiredOrder } from "../../Interfaces";
import orderServices from "../../services/orderServices";

interface ExpiringVaccinationsTenDaysProps {
  date: Date;
}
const ExpiringVaccinationsTenDays: FunctionComponent<ExpiringVaccinationsTenDaysProps> =
  (props) => {
    const [expiredBottles, setExpiredBottles] = useState<IExpiredOrder[]>([]);

    useEffect(() => {
      const dateString = props.date
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");

      orderServices
        .getExpiringVaccinationsTenDays(dateString)
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
        <h3>
          Vaccinations expired in the next 10 days from the chosen day by
          district
        </h3>
        {expiredBottles.length > 0 ? (
          Object.entries(expiredInjectionsPerDistrict).map(
            ([healthCareDistrict, unUsedInjections], index) => (
              <li key={index}>
                {healthCareDistrict} : {unUsedInjections}
              </li>
            )
          )
        ) : (
          <li>
            No vaccinations expired in the next 10 days from the chosen day
          </li>
        )}
      </ul>
    );
  };

export default ExpiringVaccinationsTenDays;
