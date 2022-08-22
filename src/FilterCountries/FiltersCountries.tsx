import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import React, { ChangeEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import CustomeDropdown from "./CustomeDropdown";
import "./FiltersCountries.css";

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import InfoIcon from '@mui/icons-material/Info';

import { Country } from "../interfaces/Types";
import {FILTER_COUNTRY_BY_CONTINENT, FILTER_COUNTRY_BY_CURRENCY} from "../graphql/filterQueries";
import { GET_ALL_CONTINENTS } from "../graphql/getQueries";


function MouseOverPopover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <p className="sub-title">Filters    <InfoIcon/></p>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Will filter all the countries</Typography>
      </Popover>
    </div>
  );
}


const FiltersCountries = ({
  currencyList,
  setCountriesList,
  defaultCountries,
                    
                            setLoadingBar
}: any) => {
  const { data, loading, error } = useQuery(GET_ALL_CONTINENTS);
  const [continentSelect, setContinentSelect] = useState(0);
  const [currencySelect, setCurrencySelect] = useState(0);

  const [currentFilter, setCurrentFilter] = useState(0);

  let filterCountriesByName = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    let filtredCountries = defaultCountries.filter((country: Country) => {
      return country.name
        .toLocaleLowerCase()
        .includes(inputValue.toLocaleLowerCase());
    });
    setLoadingBar(true);
    setCountriesList(filtredCountries);
    setLoadingBar(false);
  };

  if (loading || error) {
    return <p>{error ? error.message : setLoadingBar(true)}</p>;
  }

  
  return (
    <div>
      <div className="row ">
      <MouseOverPopover/>
      </div>
      
    <div className={"row d-flex align-items-center"}>
      
      <div className="col" id="country-search">
        <TextField
          label="Country name"
          color="primary"
          variant="standard"
          onChange={filterCountriesByName}
        />
      </div>
      <div className="col-3 dropdown-input">
        <CustomeDropdown
          dataSelect={data.continents}
          selectValue={continentSelect}
          setSelectedValue={setContinentSelect}
          label={"Continent"}
          QUERY={FILTER_COUNTRY_BY_CONTINENT}
          setCountriesList={setCountriesList}
          defaultCountries={defaultCountries}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          setLoadingBar={setLoadingBar}
        />
      </div>
      <div className="col-3 dropdown-input">
        <CustomeDropdown
          dataSelect={currencyList}
          selectValue={currencySelect}
          setSelectedValue={setCurrencySelect}
          label={"Currency"}
          QUERY={FILTER_COUNTRY_BY_CURRENCY}
          setCountriesList={setCountriesList}
          defaultCountries={defaultCountries}
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          setLoadingBar={setLoadingBar}
        />
      </div>
    </div>
    </div>
  );
};

export default FiltersCountries;
