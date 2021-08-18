import { FunctionComponent } from "react";
import { IOrder } from "../Interfaces";

interface ArrivedInjectionsProps {
  orders: IOrder[];
}

const ArrivedInjectionsPerDistrict: FunctionComponent<ArrivedInjectionsProps> =
  (props) => {
    const { orders } = props;

    const injectionsPerDistrict = orders.reduce(
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
      <ul>
        <h2>Total arrived injections per healthcare district</h2>
        {Object.entries(injectionsPerDistrict).map(
          ([healthCareDistrict, injections]) => (
            <li>
              {healthCareDistrict} : {injections}
            </li>
          )
        )}
      </ul>
    );
  };

export default ArrivedInjectionsPerDistrict;
