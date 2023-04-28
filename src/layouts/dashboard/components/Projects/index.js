/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import useSWR from 'swr';
import { XPtoLEVEL, fetcher } from 'utils';

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "Tables/DataTable";

import CountdownItem from "Items/CountdownItem";

import AssignmentIcon from '@mui/icons-material/Assignment';
import HelpIcon from '@mui/icons-material/Help';

function Projects() {
  //const { rows } = data();
  const [menu, setMenu] = useState(null);
  const { data: questData, error } = useSWR(`/api/quests`, fetcher)

  const Quest = ({ name, expires }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar name={name} size="sm">
        <MDTypography variant="h4">
          <AssignmentIcon />
        </MDTypography>
      </MDAvatar>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">
          <CountdownItem date={Date.parse(expires)} variant="caption">
            <MDBadge badgeContent="expired" color="error" size="xs" />
          </CountdownItem>
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "quest", accessor: "quest", width: "35%", align: "left" },
    { Header: "reward", accessor: "reward", width: "15%", align: "left" },
    { Header: "type", accessor: "type", align: "center" },
    { Header: "completion", accessor: "completion", align: "center" },
  ]

  const rows = questData ? _.sortBy(questData.userQuests, (quest) => quest.type)
    .map(quest =>
    ({
      quest: (
        <MDBox display="flex" alignItems="horizontally" lineHeight={1}>
          <Quest name={quest.data.name} expires={quest.expiry} />
          <MDBox m={0.25} />
          <Tooltip title={quest.data.desc} placement="top">
            <HelpIcon />
          </Tooltip>
        </MDBox>
      ),
      reward: (
        <MDTypography variant="body2" fontWeight="medium" ml={1} lineHeight={1}>
          {quest.data.reward}
        </MDTypography>
      ),
      type: (
        <MDTypography variant="caption" fontWeight="medium" ml={1} lineHeight={1}>
          {quest.type}
        </MDTypography>
      ),
      completion: (
        <MDBox width="8rem" textAlign="left">
          <MDProgress value={quest.data.target ? quest.data.target : 0} color="info" variant="gradient" label={false} />
        </MDBox>
      ),
    })) : []

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Quests
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0}>
            <AssignmentIcon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            />
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>{questData? questData.completedCount : 0} done</strong> this month
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu} */}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Projects;
