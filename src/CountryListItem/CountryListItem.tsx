
import "./CountryListItem.css";
import {useNavigate} from "react-router-dom";

const CountryListItem = (country: any) => {
    const navigate = useNavigate();
    const goToDetail  = (event:any) =>{
        event.preventDefault();
        navigate(`/country/${country.country.code}`);
    }
  return (
    <div className="row item-continer d-flex align-items-center justify-content-center" onClick={goToDetail}>
      <div className="col-1 ">
        <p className="country-flag">{country.country.emoji}</p>
      </div>
      <div className="col-3 " >
        <p className="align-middle">{country.country.name}</p>
      </div>
      <div className="col-2">
        <p>{country.country.native}</p>
      </div>
      <div className="col-3">
        <p>{country.country.capital}</p>
      </div>
      <div className="col-2">
      <p>{country.country.continent.name}</p>
      </div>
      
      <div className="col-1">
        <p>{country.country.currency}</p>
      </div>
    </div>
  );
};

export default CountryListItem;
