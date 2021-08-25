import { FunctionComponent, useState, useEffect } from "react";
import { IOrder } from "../../Interfaces";
import orderServices from "../../services/orderServices";

interface ArrivedInjectionsProps {
  date: Date;
}

const ArrivedInjectionsPerDistrict: FunctionComponent<ArrivedInjectionsProps> =
  (props) => {
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
      const dateString = props.date
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      orderServices.getAllThisDay(dateString).then((response) => {
        setOrders(response.data);
      });
    }, [props.date]);

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
        <h3>Vaccinations arrived the chosen day per district</h3>
        {orders.length > 0 ? (
          <div>
            <ul>
              {Object.entries(injectionsPerDistrict).map(
                ([healthCareDistrict, injections], idx) => (
                  <li key={idx}>
                    {healthCareDistrict} : {injections}
                  </li>
                )
              )}
            </ul>
            <h3>Per producer</h3>
            <ul>
              {Object.entries(injectionsPerProducer).map(
                ([vaccine, injections]) => (
                  <li>
                    {vaccine} : {injections}
                  </li>
                )
              )}
            </ul>
          </div>
        ) : (
          "No vaccinations arrived the chosen day"
        )}
      </div>
    );
  };

export default ArrivedInjectionsPerDistrict;
