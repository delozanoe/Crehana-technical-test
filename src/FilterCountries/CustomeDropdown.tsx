import { useLazyQuery } from "@apollo/client";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useEffect } from "react";

const CustomeDropdown = ({
  dataSelect,
  selectValue,
  setSelectedValue,
  label,
  QUERY,
  setCountriesList,
  defaultCountries,
                           currentFilter, setCurrentFilter, setLoadingBar
}: any) => {
  const [sendQuery, { data, loading, error }] = useLazyQuery(QUERY, {
    variables: { name: (dataSelect[selectValue===0?0: selectValue-1])?dataSelect[selectValue===0?0: selectValue-1].code :"AF" },
  });

  const handleChange = (event: SelectChangeEvent<typeof selectValue>) => {
    const {
      target: { value },
    } = event;
   
    setSelectedValue(value);
    
    if (value === 0) {
      setCountriesList(defaultCountries);
    }else{
      if(currentFilter ===2 || label==="Currency"){
        console.log("Entro aca")
        setCurrentFilter(1);
      }
      else if(currentFilter ===1 || label==="Continent"){
        setCurrentFilter(2);
      }
    }
  };

  useEffect(()=>{
    setLoadingBar(true);
    if(selectValue === 0 ){
      setCountriesList(defaultCountries);
    }else if(selectValue !==0){

      sendQuery().then((response)=> {
        console.log(response.data)
        if(!response.loading){
          setCountriesList(data.countries);
          
        }
      });

    }
    setLoadingBar(false);
  }, [data, selectValue]);

  if (loading || error) {
    return <p>{error ? error.message : setLoadingBar(true)}</p>;
  }
  return (
    <FormControl variant="standard" sx={{ m: 1, width: 200 }}>
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>

      <Select
         labelId="demo-simple-select-standard-label"
         id="demo-simple-select-standard"
        value={selectValue}
        onChange={handleChange}
        
        
      >
        <MenuItem key={0} value={0}>
          <ListItemText primary={"All"} />
        </MenuItem>
        {dataSelect.map((item: any, index: number) => {
            
          return (
            <MenuItem key={item.name} value={index + 1}>
              <ListItemText primary={item.name} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
export default CustomeDropdown;
