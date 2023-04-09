import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { CustomerService } from "./services/CustermerService";

export default function DataTableComponent({ rows }) {
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    CustomerService.getCustomersMedium().then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);

      return d;
    });
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search by country"
          />
        </span>
      </div>
    );
  };

  const ImgColumnTemplate = (country) => {
    return (
      <div className="flex align-items-center gap-2">
        {country.flagCode ? (
          <img
            alt={country.Country_text}
            src={`https://www.worldometers.info/img/flags/${country.flagCode}-flag.gif`}
            width="32"
          />
        ) : (
          "NA"
        )}
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="card">
      <DataTable
        value={rows}
        paginator
        rows={10}
        dataKey="id"
        filters={filters}
        loading={loading}
        globalFilterFields={["Country_text"]}
        header={header}
        emptyMessage="No data found."
      >
        <Column
          field="Country_text"
          header="Country Name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          header="Flag"
          field="flag"
          style={{ minWidth: "12rem" }}
          body={ImgColumnTemplate}
        />
        <Column
          header="Confirmed Cases"
          field="Active Cases_text"
          style={{ minWidth: "14rem" }}
        />
        <Column
          field="Total Deaths_text"
          header="Deaths"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="Total Recovered_text"
          header="Recovered"
          style={{ minWidth: "6rem" }}
        />
      </DataTable>
    </div>
  );
}
