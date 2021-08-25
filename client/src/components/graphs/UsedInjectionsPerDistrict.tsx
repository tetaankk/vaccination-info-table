import { FunctionComponent, useState, useEffect } from "react";
import { IVaccinationWithDistrict } from "../../Interfaces";
import vaccinationServices from "../../services/vaccinationServices";

interface UsedInjectionsPerDistrictProps {
  date: Date;
}

const UsedInjectionsPerDistrict: FunctionComponent<UsedInjectionsPerDistrictProps> =
  (props) => {
    const [vaccinations, setVaccinations] = useState<
      IVaccinationWithDistrict[]
    >([]);

    useEffect(() => {
      const dateString = props.date
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      vaccinationServices.getUsedVaccinations(dateString).then((response) => {
        setVaccinations(response.data);
      });
    }, [props.date]);

    const usedVaccinationsPerDistrict = vaccinations.reduce(
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
      <div>
        <ul>
          <h3>Vaccinations used the chosen day by district</h3>
          {vaccinations.length > 0 ? (
            Object.entries(usedVaccinationsPerDistrict).map(
              ([healthCareDistrict, unUsedInjections], index) => (
                <li key={index}>
                  {healthCareDistrict} : {unUsedInjections}
                </li>
              )
            )
          ) : (
            <li>No vaccinations were used the chosen day</li>
          )}
        </ul>
      </div>
    );
  };

export default UsedInjectionsPerDistrict;
