import "./App.scss";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IOrder, IVaccination } from "./Interfaces";
import { useEffect, useState } from "react";
import orderServices from "./services/orderServices";
import vaccinationServices from "./services/vaccinationServices";
import ArrivedInjectionsPerDistrict from "./sections/ArrivedInjectionsPerDistrict";
import UsedInjectionsPerDistrict from "./sections/UsedInjectionsPerDistrict";
import UnUsedInjectionsPerDistrict from "./sections/UnUsedInjectionsPerDistrict";

function App() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [vaccinations, setVaccinations] = useState<IVaccination[]>([]);
  const [selectedVaccinations, setSelectedVaccinations] = useState<
    IVaccination[]
  >([]);
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    //setCurrentDate(new Date("January 15, 2021"));
    setIsLoading(true);
    orderServices.getAll().then((response) => {
      setOrders(response.data);
    });
    vaccinationServices.getAll().then((response) => {
      setVaccinations(response.data);
    });
    setIsLoading(false);
  }, []);

  const arrivedVaccinesByDate = (date: Date) => {
    setSelectedOrders(
      orders.filter((order) => {
        return new Date(order.arrived) <= currentDate;
      })
    );
  };

  const onChangeDate = (date: Date) => {
    setDate(date);
  };

  return (
    <div className="App">
      <div className="selections">
        <DatePicker selected={date} onChange={onChangeDate} />
      </div>
      {isLoading && <p>Loading...</p>}
      <div className="columns">
        <section className="column1 column">
          <ArrivedInjectionsPerDistrict orders={orders} />
        </section>
        <section className="column2 column">
          <UsedInjectionsPerDistrict injections={vaccinations} />
        </section>
        <section className="column3 column"></section>
        <section className="column4"></section>
      </div>
    </div>
  );
}

export default App;
