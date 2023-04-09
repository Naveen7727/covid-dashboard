import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import Card from "./components/Card";
import Flags from "./services/flags";
import CovidLogo from "./assets/image.png";

function App() {
  const [data, setData] = useState([]);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    axios.get("https://covid-19.dataflowkit.com/v1").then((response) => {
      setStatistics(response.data.find((el) => el.Country_text == "World"));
      setData(
        response.data.map((el) => ({ ...el, flagCode: Flags[el.Country_text] }))
      );
    });
  }, []);

  return (
    <div className="App">
      <h1>COVID19 - World Dashboard</h1>
      <img src={CovidLogo} />
      {statistics && (
        <div className="cards">
          <Card
            title="Total Confirmed Cases"
            count={statistics["Total Cases_text"]}
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
