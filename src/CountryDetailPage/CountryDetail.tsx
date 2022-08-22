import { GET_COUNTRY_BY_ID } from "../graphql/getQueries";
import { useQuery } from "@apollo/client";
import React from "react";
import { Lenguages } from "../interfaces/Types";
import "./CountryDetail.css";
import { createSvgIcon } from "@mui/material/utils";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled/types/base";

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  "Home"
);


const CountryDetail = () => {
  const queryString = window.location.pathname;
  let getCodeCountry = queryString.split("/");
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_COUNTRY_BY_ID, {
    variables: { code: getCodeCountry[2] },
  });
  //Lets call the information
  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  const goHome = (event: any) => {
    event.preventDefault();
    navigate("/");
  };
  return (
    <div className={"gray-background general-margin"}>
      <div className="fixed-icon" onClick={goHome}>
        
        <IconButton>
          
          <HomeIcon sx={{ fontSize: 40 }} color="primary" />
        </IconButton>
      </div>
      <div className="row  d-flex align-items-center title-container margin-info">
        <div className="col-3">
          <h6 className={"emoji-detail"}>{data.country.emoji}</h6>
        </div>
        <div className="col">
          <h1>
            {data.country.name} - {data.country.code}
          </h1>
        </div>
      </div>
      <div className="row margin-info">
        <div className="col info-container">
          <p>Continent</p>
          <h2>{data.country.continent.name}</h2>
        </div>
        <div className="col info-container">
          <p>Capital</p>
          <h2>{data.country.capital}</h2>
        </div>
        <div className="col info-container">
          <p>Native</p>
          <h2>{data.country.native}</h2>
        </div>
      </div>
      <div className="row margin-info">
        <div className="col info-container">
          <p>Languages</p>
          {data.country.languages.map((language: Lenguages) => {
            return <h2>{language.name}</h2>;
          })}
        </div>
        <div className="col info-container">
          <p>Currency</p>
          <h2>{data.country.currency}</h2>
        </div>
        <div className="col info-container">
          <p>Phone</p>
          <h2>+{data.country.phone}</h2>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
