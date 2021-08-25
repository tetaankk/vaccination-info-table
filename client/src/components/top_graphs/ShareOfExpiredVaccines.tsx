import { FunctionComponent, useState, useEffect } from "react";
import { ITotalVaccinationsPerDistrict } from "../../Interfaces";
import vaccinationServices from "../../services/vaccinationServices";
import { Bar } from "react-chartjs-2";

const ShareOfExpiredVaccines: FunctionComponent = () => {
  const [vaccinations, setVaccinations] = useState<
    ITotalVaccinationsPerDistrict[]
  >([]);

  useEffect(() => {
    vaccinationServices
      .getAverageUsedVaccinationsPerDistrict()
      .then((response) => {
        setVaccinations(response.data);
      });
  }, []);

  const averageDailyVaccinationsPerDistrict = vaccinations.reduce(
    (acc, { healthCareDistrict, injections }) => {
      if (!acc[healthCareDistrict]) {
        acc[healthCareDistrict] = 0;
      }
      acc[healthCareDistrict] += injections;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      <h4>Average daily injections</h4>
      <Bar
        data={{
          labels: vaccinations.map((vacc) => vacc.healthCareDistrict),
          datasets: [
            {
              label: "Number of injections",
              data: vaccinations.map((vacc) => vacc.injections),
              backgroundColor: ["green"],
            },
          ],
        }}
        height={200}
        width={200}
        options={{ maintainAspectRatio: true }}
      />
    </div>
  );
};

export default ShareOfExpiredVaccines;
