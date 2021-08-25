import "./App.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IOrder, IVaccination } from "./Interfaces";
import { useEffect, useState } from "react";
import orderServices from "./services/orderServices";
import vaccinationServices from "./services/vaccinationServices";
import ArrivedInjectionsPerDistrict from "./sections/ArrivedInjectionsPerDistrict";
import UsedInjectionsPerDistrict from "./sections/UsedInjectionsPerDistrict";
import ExpiringVaccinationsThisDay from "./sections/ExpiringVaccinationsThisDay";
import ExpiringVaccinationsTenDays from "./sections/ExpiringVaccinationsTenDays";
import TotalUsedInjectionsPerDistrict from "./sections/TotalUsedInjectionsPerDistrict";
import AverageDailyInjectionsPerDistrict from "./sections/AverageDailyInjectionsPerDistrict";

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
        <section className="column1 column">
          <ArrivedInjectionsPerDistrict date={date} />
        </section>
        <section className="column3 column">
          <UsedInjectionsPerDistrict date={date} />
        </section>
        <section className="column4 column">
          <ExpiringVaccinationsThisDay date={date} />
        </section>
        <section className="column1 column">
          <ExpiringVaccinationsTenDays date={date} />
        </section>
        <section className="column1 column">
          <TotalUsedInjectionsPerDistrict />
        </section>
        <section className="column1 column">
          <AverageDailyInjectionsPerDistrict />
        </section>
      </div>
    </div>
  );
}

export default App;
