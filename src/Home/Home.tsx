import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client";
import React, {
  ChangeEvent,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Country } from "../interfaces/Types";
import FiltersCountries from "../FilterCountries/FiltersCountries";
import CountryListItem from "../CountryListItem/CountryListItem";
import CountriesContext from "../context/CountriesContext";
import { GET_ALL_COUNTRIES } from "../graphql/getQueries";
import { LinearProgress } from "@mui/material";
export const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_COUNTRIES);
  const [currencyList, setCurrencyList] = useState([]);
  const [countriesDefault, setCountriesDefault] = useState([]);
  const [countriesList, setCountriesList] = useState([]);

  const [loadingBar, setLoadingBar] = useState(false);

  useEffect(() => {
    if (data) {
      setCountriesList(data.countries);
      setCountriesDefault(data.countries);
      setCurrencys();

      console.log(countriesList);
    }
  }, [data]);

  if (loading || error) {
    return <p>{error ? error.message :  <LinearProgress />}</p>;
  }

  let setCurrencys = () => {
    let responseCurrency = data.countries.reduce(
      (acc: string[], current: Country) => {
        if (!acc.includes(current.currency) && current.currency !== null) {
          acc.push(current.currency);
        }
        return acc;
      },
      []
    );
    let finalCurrencyList = responseCurrency.map((currency: string) => {
      return { name: currency, code: currency };
    });
    setCurrencyList(finalCurrencyList);
  };

  return (
    <div className="home-principal-page">
      {loadingBar && <LinearProgress/>}
      <div className="list-container">
        {countriesList && (
          <FiltersCountries
            currencyList={currencyList}
            setCurrencyList={setCurrencyList}
            setCountriesList={setCountriesList}
            defaultCountries={countriesDefault}
            currentCountries={countriesList}
            setLoadingBar={setLoadingBar}
          />
        )}

        <div
          className="row item-continer d-flex align-items-center justify-content-center"
          id="header"
        >
          <div className="col-1 ">
            <p className="country-flag"></p>
          </div>
          <div className="col-3 ">
            <p className="align-middle row-header">Name</p>
          </div>
          <div className="col-2">
            <p className="row-header">Native-name</p>
          </div>
          <div className="col-3">
            <p className="row-header">Capital</p>
          </div>
          <div className="col-2">
            <p className="row-header">Continent</p>
          </div>

          <div className="col-1">
            <p className="row-header">Currency</p>
          </div>
        </div>
        {countriesList.map((country: Country, index: number) => {
          return <CountryListItem country={country} key={index} />;
        })}
      </div>
    </div>
  );
};
