import { gql } from "@apollo/client";

const GET_COUNTRY_BY_ID = gql`
query getCountry( $code: ID!){
    country(code: $code){
        name
      code
      emoji
      continent {
        name
      }
      native
      capital
      currency
      phone
      
      languages {
        name
      }
    }
  }
`;
const GET_ALL_COUNTRIES= gql`
{
  countries {
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

const GET_ALL_CONTINENTS = gql`
{
  continents {
    name
    code
  }
}
`;
export {GET_COUNTRY_BY_ID, GET_ALL_COUNTRIES,GET_ALL_CONTINENTS};
