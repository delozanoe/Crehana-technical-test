import {gql} from "@apollo/client";

const FILTER_COUNTRY_BY_CONTINENT = gql`
query GetCountriesOfContinent( $name: String){
    countries(filter:{
        continent: {eq:$name}
      }){
        name
      code
      emoji
      continent {
        name
      }
      native
      capital
      currency
      languages {
        name
      }
    }
  }
`;

const FILTER_COUNTRY_BY_CURRENCY = gql`
query GetCountriesOfCurrency( $name: String){
    countries(filter:{
      currency: {eq:$name}
    }){
      name
      code
      emoji
      continent {
        name
      }
      native
      capital
      currency
      languages {
        name
      }
    }
  }
`;

export {FILTER_COUNTRY_BY_CONTINENT, FILTER_COUNTRY_BY_CURRENCY}