import React, {useState} from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import RapportService from "../../service/RapportService";

const Formulaire = () => {
  const [dateValue, setDateValue] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {};
  const elements = e.target.elements;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.name) {
      formData[element.name] = element.value;
      formData["Date"] = dateValue;
      formData["id"] = "1"
      formData["id_projet"] = "647a39643625227f3a32ab66"
      formData["createdBy"] = localStorage.getItem("first_name")+" "+localStorage.getItem("last_name");
    }
  }
  // Access the form data as a JSON object
  console.log(formData);
  RapportService.createRapport(formData);
    console.log("submit form");

  };
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  };
  const handleChangeDate =(e) => {
    console.log(e)
    var mois = "";
    
    if (parseInt(e.$M,10) < 10){
      mois = "0"+e.$M;
    }
   var date = e.$y+"-"+mois +"-"+e.$D;
    setDateValue(date);
    console.log(dateValue);
  }
  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email!").required("Required"),
    address1: yup.string().required("Required"),
    address2: yup.string().required("Required"),
  });

  return (
    <Box m="20px">
      <Header title="CREATE FORM" subtitle="Create a New Form" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleFormSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box sx={{ gridColumn: "span 2" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      variant="filled"
                      sx={{ width: "100%" }}
                      label="Date"
                      name="Date"
                      onChange={(e) => handleChangeDate(e)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Technician on duty"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Technician_on_duty"
                error={
                  !!touched.Technician_on_duty && !!errors.Technician_on_duty
                }
                helpertext={
                  touched.Technician_on_duty && errors.Technician_on_duty
                }
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Location"
                  variant="filled"
                  name="Location"
                  error={!!touched.Location && !!errors.Location}
                  helperText={touched.Location && errors.Location}
                >
                  <MenuItem value="admin">W.O.S</MenuItem>
                  <MenuItem value="superviseur">JINAN 1</MenuItem>
                  <MenuItem value="client">AMANI 1</MenuItem>
                  <MenuItem value="client">JINAN 2</MenuItem>
                  <MenuItem value="client">MOUNA</MenuItem>
                  <MenuItem value="client">NADA</MenuItem>
                  <MenuItem value="client">AGP</MenuItem>
                  <MenuItem value="client">WAHA</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">Engine</InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Engine"
                  variant="filled"
                  name="Engine"
                  error={!!touched.Engine && !!errors.Engine}
                  helperText={touched.Engine && errors.Engine}
                >
                  <MenuItem value="admin">
                    SDMO - Power 250 KVA - OMV REF 800-CEDE-3300
                  </MenuItem>
                  <MenuItem value="superviseur">
                    CAT C9 - Power 330 KVA - OMV REF 800-CEDE-6000
                  </MenuItem>
                  <MenuItem value="technicien">
                    FILIPPINI - Power 300 KVA - OMV REF 800-CEDE-3200
                  </MenuItem>
                  <MenuItem value="client">
                    CAT C9 - Power 330 KVA - OMV REF 800-CEDE-7000
                  </MenuItem>
                  <MenuItem value="client">
                    CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-3700
                  </MenuItem>
                  <MenuItem value="client">
                    CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-7100
                  </MenuItem>
                  <MenuItem value="client">
                    CAT C3.3 - Power 66 KVA - OMV REF 800-CEDE-3800
                  </MenuItem>
                  <MenuItem value="client">
                    OLYMPIAN - Power 50 KVA - OMV REF 800-CEDE-2300
                  </MenuItem>
                  <MenuItem value="client">
                    SDMO - Power 400 KVA - OMV REF 800-CEDE-5000
                  </MenuItem>
                  <MenuItem value="client">
                    SDMO - Power 400 KVA - OMV REF 800-CEDE-4000
                  </MenuItem>
                  <MenuItem value="client">
                    CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-3600
                  </MenuItem>
                  <MenuItem value="client">
                    CAT C3.3 - Power 65 KVA - OMV REF 800-CEDE-3900
                  </MenuItem>
                  <MenuItem value="client">
                    CAT C18 - Power 618 KVA - OMV REF 800-EGMD-5041
                  </MenuItem>
                  <MenuItem value="client">
                    CAT GAZ - Power 900 KVA - OMV REF 800-EGMD-5040
                  </MenuItem>
                  <MenuItem value="client">
                    SDMO - Power 500 KVA - OMV REF 800-CEDE-8000
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Status"
                  variant="filled"
                  name="Status"
                  error={!!touched.Status && !!errors.Status}
                  helperText={touched.Status && errors.Status}
                >
                  <MenuItem value="admin">Running</MenuItem>
                  <MenuItem value="Failure">Standby</MenuItem>
                  <MenuItem value="Other">Disconnected</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Last PM Hours"
                onBlur={handleBlur}
                onChange={handleChange}
                
                name="Last_PM_Hours"
                error={!!touched.Last_PM_Hours && !!errors.Last_PM_Hours}
                helpertext={touched.Last_PM_Hours && errors.Last_PM_Hours}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Running Hours"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Running_Hours"
                error={!!touched.Running_Hours && !!errors.Running_Hours}
                helpertext={touched.Running_Hours && errors.Running_Hours}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Electric Power P"
                onBlur={handleBlur}
                onChange={handleChange}
                name="Electric_Power_P"
                error={!!touched.Electric_Power_P && !!errors.Electric_Power_P}
                helpertext={touched.Electric_Power_P && errors.Electric_Power_P}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Apparent Power S
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Apparent Power S"
                  variant="filled"
                  name="Apparent_Power_S" //hethi kenet name="role"
                  error={
                    !!touched.Apparent_Power_S && !!errors.Apparent_Power_S
                  }
                  helperText={
                    touched.Apparent_Power_S && errors.Apparent_Power_S
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                  
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Oil System Check
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Oil System Check"
                  variant="filled"
                  name="Oil_System_Check"
                  error={
                    !!touched.Oil_System_Check && !!errors.Oil_System_Check
                  }
                  helperText={
                    touched.Oil_System_Check && errors.Oil_System_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">Oil Level</InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Oil Level"
                  variant="filled"
                  name="Oil_Level"
                  error={!!touched.Oil_Level && !!errors.Oil_Level}
                  helperText={touched.Oil_Level && errors.Oil_Level}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Oil Pressure
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Oil Pressure"
                  variant="filled"
                  name="Oil_Pressure"
                  error={!!touched.Oil_Pressure && !!errors.Oil_Pressure}
                  helperText={touched.Oil_Pressure && errors.Oil_Pressure}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Oil Temperature
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Oil Temperature"
                  variant="filled"
                  name="Oil_Temperature"
                  error={!!touched.Oil_Temperature && !!errors.Oil_Temperature}
                  helperText={touched.Oil_Temperature && errors.Oil_Temperature}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Cooling Water System Check
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Cooling Water System Check"
                  variant="filled"
                  name="Cooling_Water_System_Check"
                  error={
                    !!touched.Cooling_Water_System_Check &&
                    !!errors.Cooling_Water_System_Check
                  }
                  helperText={
                    touched.Cooling_Water_System_Check &&
                    errors.Cooling_Water_System_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Cooling Water Temperature
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Cooling Water Temperature"
                  variant="filled"
                  name="Cooling_Water_Temperature"
                  error={
                    !!touched.Cooling_Water_Temperature &&
                    !!errors.Cooling_Water_Temperature
                  }
                  helperText={
                    touched.Cooling_Water_Temperature &&
                    errors.Cooling_Water_Temperature
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Radiator Water Level
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Radiator Water Level"
                  variant="filled"
                  name="Radiator_Water_Level"
                  error={
                    !!touched.Radiator_Water_Level &&
                    !!errors.Radiator_Water_Level
                  }
                  helperText={
                    touched.Radiator_Water_Level && errors.Radiator_Water_Level
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Fuel Filters/Fuel Lines/Pumps /Filter Bases
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Fuel Filters/Fuel Lines/Pumps /Filter Bases"
                  variant="filled"
                  name="Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases"
                  error={
                    !!touched.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases &&
                    !!errors.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases
                  }
                  helperText={
                    touched.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases &&
                    errors.Fuel_Filters_Fuel_Lines_Pumps_Filter_Bases
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Fuel Water Separator Check
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Fuel Water Separator Check"
                  variant="filled"
                  name="Fuel_Water_Separator_Check"
                  error={
                    !!touched.Fuel_Water_Separator_Check &&
                    !!errors.Fuel_Water_Separator_Check
                  }
                  helperText={
                    touched.Fuel_Water_Separator_Check &&
                    errors.Fuel_Water_Separator_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Fuel Day Tank/Fuel Level
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Fuel Day Tank/Fuel Level"
                  variant="filled"
                  name="Fuel_Day_Tank_Fuel_Level"
                  error={
                    !!touched.Fuel_Day_Tank_Fuel_Level &&
                    !!errors.Fuel_Day_Tank_Fuel_Level
                  }
                  helperText={
                    touched.Fuel_Day_Tank_Fuel_Level &&
                    errors.Fuel_Day_Tank_Fuel_Level
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Air Cleaner/Filter Condition
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Air Cleaner/Filter Condition"
                  variant="filled"
                  name="Air_Cleaner_Filter_Condition"
                  error={
                    !!touched.Air_Cleaner_Filter_Condition &&
                    !!errors.Air_Cleaner_Filter_Condition
                  }
                  helperText={
                    touched.Air_Cleaner_Filter_Condition &&
                    errors.Air_Cleaner_Filter_Condition
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Turbocharger Check
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Turbocharger Check"
                  variant="filled"
                  name="Turbocharger_Check"
                  error={
                    !!touched.Turbocharger_Check && !!errors.Turbocharger_Check
                  }
                  helperText={
                    touched.Turbocharger_Check && errors.Turbocharger_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Inspect Battery Cables and Battery Connections
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Inspect Battery Cables and Battery Connections"
                  variant="filled"
                  name="Inspect_Battery_Cables_and_Battery_Connections"
                  error={
                    !!touched.Inspect_Battery_Cables_and_Battery_Connections &&
                    !!errors.Inspect_Battery_Cables_and_Battery_Connections
                  }
                  helperText={
                    touched.Inspect_Battery_Cables_and_Battery_Connections &&
                    errors.Inspect_Battery_Cables_and_Battery_Connections
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Starter Motors
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Starter Motors"
                  variant="filled"
                  name="Starter_Motors"
                  error={!!touched.Starter_Motors && !!errors.Starter_Motors}
                  helperText={touched.Starter_Motors && errors.Starter_Motors}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Alternator/Pulleys/Belts/Tensioner
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Alternator/Pulleys/Belts/Tensioner"
                  variant="filled"
                  name="Alternator_Pulleys_Belts_Tensioner"
                  error={
                    !!touched.Alternator_Pulleys_Belts_Tensioner &&
                    !!errors.Alternator_Pulleys_Belts_Tensioner
                  }
                  helperText={
                    touched.Alternator_Pulleys_Belts_Tensioner &&
                    errors.Alternator_Pulleys_Belts_Tensioner
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Meters Gauges
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Meters Gauges"
                  variant="filled"
                  name="Meters_Gauges"
                  error={!!touched.Meters_Gauges && !!errors.Meters_Gauges}
                  helperText={touched.Meters_Gauges && errors.Meters_Gauges}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Control Panel
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Control Panel"
                  variant="filled"
                  name="Control_Panel"
                  error={!!touched.Control_Panel && !!errors.Control_Panel}
                  helperText={touched.Control_Panel && errors.Control_Panel}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Electrical Connections
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Electrical Connections"
                  variant="filled"
                  name="Electrical_Connections"
                  error={
                    !!touched.Electrical_Connections &&
                    !!errors.Electrical_Connections
                  }
                  helperText={
                    touched.Electrical_Connections &&
                    errors.Electrical_Connections
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Indication Lamps Function Check
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Indication Lamps Function Check"
                  variant="filled"
                  name="Indication_Lamps_Function_Check"
                  error={
                    !!touched.Indication_Lamps_Function_Check &&
                    !!errors.Indication_Lamps_Function_Check
                  }
                  helperText={
                    touched.Indication_Lamps_Function_Check &&
                    errors.Indication_Lamps_Function_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Selector Switches Meters Function Check
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Selector Switches Meters Function Check"
                  variant="filled"
                  name="Selector_Switches_Meters_Function_Check"
                  error={
                    !!touched.Selector_Switches_Meters_Function_Check &&
                    !!errors.Selector_Switches_Meters_Function_Check
                  }
                  helperText={
                    touched.Selector_Switches_Meters_Function_Check &&
                    errors.Selector_Switches_Meters_Function_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Body Earthing of Alternator and Panel Check
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Body Earthing of Alternator and Panel Check"
                  variant="filled"
                  name="Body_Earthing_of_Alternator_and_Panel_Check"
                  error={
                    !!touched.Body_Earthing_of_Alternator_and_Panel_Check &&
                    !!errors.Body_Earthing_of_Alternator_and_Panel_Check
                  }
                  helperText={
                    touched.Body_Earthing_of_Alternator_and_Panel_Check &&
                    errors.Body_Earthing_of_Alternator_and_Panel_Check
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Anti vibration mounting is effective
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Anti vibration mounting is effective"
                  variant="filled"
                  name="Anti_vibration_mounting_is_effective"
                  error={
                    !!touched.Anti_vibration_mounting_is_effective &&
                    !!errors.Anti_vibration_mounting_is_effective
                  }
                  helperText={
                    touched.Anti_vibration_mounting_is_effective &&
                    errors.Anti_vibration_mounting_is_effective
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Engine Exhaust System Installation and Condition
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Engine Exhaust System Installation and Condition"
                  variant="filled"
                  name="Engine_Exhaust_System_Installation_and_Condition"
                  error={
                    !!touched.Engine_Exhaust_System_Installation_and_Condition &&
                    !!errors.Engine_Exhaust_System_Installation_and_Condition
                  }
                  helperText={
                    touched.Engine_Exhaust_System_Installation_and_Condition &&
                    errors.Engine_Exhaust_System_Installation_and_Condition
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-label">
                  Intake Manifold/Aftercooler/JWAC-SCAC air cooler
                </InputLabel>
                <Select
                  onChange={(event) => {}}
                  label="Intake Manifold/Aftercooler/JWAC-SCAC air cooler"
                  variant="filled"
                  name="Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler"
                  error={
                    !!touched.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler &&
                    !!errors.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler
                  }
                  helperText={
                    touched.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler &&
                    errors.Intake_Manifold_Aftercooler_JWAC_SCAC_air_cooler
                  }
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Failure">Failure</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Failures and Observations"
                onBlur={handleBlur}
                onChange={handleChange}
                
                name="Failures_and_Observations"
                error={
                  !!touched.Failures_and_Observations &&
                  !!errors.Failures_and_Observations
                }
                helpertext={
                  touched.Failures_and_Observations &&
                  errors.Failures_and_Observations
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Intervention"
                onBlur={handleBlur}
                onChange={handleChange}
                
                name="Intervention"
                error={!!touched.Intervention && !!errors.Intervention}
                helpertext={touched.Intervention && errors.Intervention}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Form
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Formulaire;
