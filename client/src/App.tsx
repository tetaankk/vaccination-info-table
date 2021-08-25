import "./App.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IOrder, IVaccination } from "./Interfaces";
import { useEffect, useState } from "react";
import orderServices from "./services/orderServices";
import vaccinationServices from "./services/vaccinationServices";
import ArrivedInjectionsPerDistrict from "./components/graphs/ArrivedInjectionsPerDistrict";
import UsedInjectionsPerDistrict from "./components/graphs/UsedInjectionsPerDistrict";
import ExpiringVaccinationsThisDay from "./components/graphs/ExpiringVaccinationsThisDay";
import ExpiringVaccinationsTenDays from "./components/graphs/ExpiringVaccinationsTenDays";
import TotalUsedInjectionsPerDistrict from "./components/top_graphs/TotalUsedInjectionsPerDistrict";
import AverageDailyInjectionsPerDistrict from "./components/top_graphs/AverageDailyInjectionsPerDistrict";

function App() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [vaccinations, setVaccinations] = useState<IVaccination[]>([]);
  const [selectedVaccinations, setSelectedVaccinations] = useState<
    IVaccination[]
  >([]);
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  /*   useEffect(() => {
    setIsLoading(true);
    orderServices.getAll().then((response) => {
      setOrders(response.data);
    });
    vaccinationServices.getAll().then((response) => {
      setVaccinations(response.data);
    });
    setIsLoading(false);
  }, [selectedOrders, selectedVaccinations]); */

  const onChangeDate = (date: Date) => {
    setDate(date);
    /*     setSelectedOrders(
      orders.filter((order: IOrder) => {
        return new Date(order.arrived) <= date;
      })
    );
    setSelectedVaccinations(
      vaccinations.filter((vaccination: IVaccination) => {
        return new Date(vaccination.vaccinationDate) <= date;
      })
    ); */
  };

  return (
    <div className="App">
      <div className="columns">
        <section className="column">
          <AverageDailyInjectionsPerDistrict />
        </section>
        <section className="column">
          <TotalUsedInjectionsPerDistrict />
        </section>
      </div>
      <div className="selections">
        <h4>Choose a date</h4>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={date}
          onChange={onChangeDate}
          className="datepicker"
        />
      </div>
      {isLoading && <p>Loading...</p>}
      <div className="columns">
        <section className="column">
          <ArrivedInjectionsPerDistrict date={date} />
        </section>
        <section className="column">
          <UsedInjectionsPerDistrict date={date} />
        </section>
        <section className="column">
          <ExpiringVaccinationsThisDay date={date} />
        </section>
        <section className="column">
          <ExpiringVaccinationsTenDays date={date} />
        </section>
      </div>
    </div>
  );
}

export default App;
