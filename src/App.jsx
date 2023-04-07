import { useEffect, useState } from "react";
import "./App.css";
import Table from "./Table";
import Card from "./Card";
import { CustomerService } from "./services/CustermerService";

function App() {
  const [statistics, setStatistics] = useState(null);
  const [countryInfo, setCountryInfo] = useState([]);

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
  console.log(countryInfo);
  console.log(statistics);
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
      {/* <Data/>
      <Paginator/> */}
      {countryInfo.length > 0 && <Table rows={countryInfo} />}
    </div>
  );
}

export default App;
