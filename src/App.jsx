import { useEffect, useState } from "react";
import "./App.css";
import Table from "./Table";
import Card from "./Card";
import { CustomerService } from "./services/CustermerService";
import axios from "axios";
import Flags from "./services/flags";

function App() {
  const [statistics, setStatistics] = useState(null);
  const [countryInfo, setCountryInfo] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    CustomerService.getStatistics().then((data) =>
      setStatistics(data.find((el) => el.Country_text === "World"))
    );
  }, []);

  useEffect(() => {
    CustomerService.getCountryDetails().then((data) =>
      setCountryInfo(data.data.rows)
    );
  }, []);

  useEffect(() => {
    axios.get("https://covid-19.dataflowkit.com/v1").then((response) => {
      setData(
        response.data.map((el) => ({ ...el, flagCode: Flags[el.Country_text] }))
      );
    });
  }, []);

  return (
    <div className="App">
      {statistics && (
        <div className="cards">
          <Card
            title="Total Confirmed Cases"
            count={statistics["Active Cases_text"]}
          />
          <Card
            title="Total Death Cases"
            count={statistics["Total Deaths_text"]}
          />
          <Card
            title="Total Recovered Cases"
            count={statistics["Total Recovered_text"]}
          />
        </div>
      )}
      {data.length > 0 && <Table rows={data} />}
    </div>
  );
}

export default App;
