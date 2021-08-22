import "./App.scss";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IOrder, IVaccination, IExpiredOrder } from "./Interfaces";
import { useEffect, useState } from "react";
import orderServices from "./services/orderServices";
import vaccinationServices from "./services/vaccinationServices";
import ArrivedInjectionsPerDistrict from "./sections/ArrivedInjectionsPerDistrict";
import UsedInjectionsPerDistrict from "./sections/UsedInjectionsPerDistrict";
import UnOpenedBottlesPerDistrict from "./sections/UnOpenedBottlesPerDistrict";
import ExpiredVaccinations from "./sections/ExpiredVaccinations";

function App() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [vaccinations, setVaccinations] = useState<IVaccination[]>([]);
  const [selectedVaccinations, setSelectedVaccinations] = useState<
    IVaccination[]
  >([]);
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setIsLoading(true);
    orderServices.getAll().then((response) => {
      setOrders(response.data);
    });
    vaccinationServices.getAll().then((response) => {
      setVaccinations(response.data);
    });
    setIsLoading(false);
  }, [selectedOrders, selectedVaccinations]);

  const onChangeDate = (date: Date) => {
    setDate(date);
    setSelectedOrders(
      orders.filter((order: IOrder) => {
        return new Date(order.arrived) <= date;
      })
    );
    setSelectedVaccinations(
      vaccinations.filter((vaccination: IVaccination) => {
        return new Date(vaccination.vaccinationDate) <= date;
      })
    );
  };

  return (
    <div className="App">
      <div className="selections">
        <DatePicker selected={date} onChange={onChangeDate} />
      </div>
      {isLoading && <p>Loading...</p>}
      <div className="columns">
        <section className="column1 column">
          <ArrivedInjectionsPerDistrict orders={selectedOrders} />
        </section>
        <section className="column2 column">
          <UsedInjectionsPerDistrict injections={selectedVaccinations} />
        </section>
        <section className="column3 column">
          <UnOpenedBottlesPerDistrict />
        </section>
        <section className="column4">
          <ExpiredVaccinations date={date} />
        </section>
      </div>
    </div>
  );
}

export default App;
