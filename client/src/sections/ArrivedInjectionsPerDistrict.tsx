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

    const injectionsPerProducer = orders.reduce(
      (acc, { vaccine, injections }) => {
        if (!acc[vaccine]) {
          acc[vaccine] = 0;
        }
        acc[vaccine] += injections;
        return acc;
      },
      {} as Record<string, number>
    );

    return (
      <div>
        <ul>
          <h3>Total arrived injections per healthcare district</h3>
          {Object.entries(injectionsPerDistrict).map(
            ([healthCareDistrict, injections]) => (
              <li>
                {healthCareDistrict} : {injections}
              </li>
            )
          )}
        </ul>
        <ul>
          <h3>Total arrived injections per producer</h3>
          {Object.entries(injectionsPerProducer).map(
            ([vaccine, injections]) => (
              <li>
                {vaccine} : {injections}
              </li>
            )
          )}
        </ul>
      </div>
    );
  };

export default ArrivedInjectionsPerDistrict;
