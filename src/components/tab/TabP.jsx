import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import Engineer from "../../pages/engineer/Engineer";
import AllEngineers from "../AllEngineers/AllEngineers";
import AllUsers from "../AllUsers/AllUsers";
import AllTickets from "../AllTickets/AllTickets";
export default function TabP() {

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab aria-selected='true' label="ENGINEERS" value="1" />
          <Tab label="USERS" value="2" />
          <Tab label="TICKETS" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
       <AllEngineers/>
      </TabPanel>
      <TabPanel value="2">
        <AllUsers/>
      </TabPanel>
      <TabPanel value="3">
        <AllTickets/>
      </TabPanel>
    </TabContext>
  );
}
