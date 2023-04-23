import React from "react";
import { useSession } from 'next-auth/react';

// @mui material components
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CastleIcon from '@mui/icons-material/Castle';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import ConstructionIcon from '@mui/icons-material/Construction';
import GavelIcon from '@mui/icons-material/Gavel';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "LayoutContainers/DashboardLayout";
import DashboardNavbar from "Navbars/DashboardNavbar";
import Footer from "Footer";
import DataTable from "Tables/DataTable";

import useSWR from 'swr';
import { fetcher } from "utils";

function Plots() {
  const { data: session } = useSession();
  const { data: plots, error } = useSWR(`/api/plots`, fetcher)

  if (!session || !plots) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox m={2}/>
        <CircularProgress />
      </DashboardLayout>
    )
  }

  const BuildingIcons = {
    "castle": <CastleIcon />,
    "gbank": <AccountBalanceIcon />,
    "tavern": <SportsBarIcon />,
    "smithhub": <ConstructionIcon />,
    "auchouse": <GavelIcon />,
  }

  const Building = ({building}) => {
    if(!building?.id) return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar size="sm">
          <MDTypography variant="h5">
          <CheckBoxOutlineBlankIcon />
          </MDTypography>
        </MDAvatar>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            [Empty Plot]
          </MDTypography>
        </MDBox>
      </MDBox>
    );

    const { name, desc } = building;

    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar name={name} size="sm">
          <MDTypography variant="h5">
            {BuildingIcons[building.id]}
          </MDTypography>
        </MDAvatar>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption">
            {desc}
          </MDTypography>
        </MDBox>
      </MDBox>
    )
  };

  const BuildingLevel = ({building}) => {
    if(!building?.id) return (
      <MDTypography display="block" variant="button" fontWeight="medium">
        N/A
      </MDTypography>
    );

    const { level, levels } = building;

    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar name={level} size="sm">
          <MDTypography display="block" variant="body1" fontWeight="medium">
            {level}
          </MDTypography>
        </MDAvatar>
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {levels[level - 1].desc}
          </MDTypography>
          {levels[level]? 
          <MDTypography variant="caption">
            {`Next Level: ${levels[level].desc}`}
          </MDTypography>
          : <MDBadge badgeContent="max level" color="success" size="sm" />
          }
        </MDBox>
      </MDBox>
    )
  };

  const columns = [
    { Header: "building", accessor: "building", align: "left" },
    { Header: "level", accessor: "level", align: "left", sortable: false },
    { Header: "lemons", accessor: "lemons", align: "center" },
    { Header: "guild", accessor: "guild", align: "center" },
  ]

  const rows = plots.map(plot => {
    return {
      building: (<Building building={plot.building} />),
      level: (<BuildingLevel building={plot.building} />),
      lemons: (
        <MDTypography variant="body2">
          {plot.building?.stored_lemons + " 🍋"}
        </MDTypography>
      ),
      guild: (
        <MDTypography variant="body2">
          {plot.guild_name}
        </MDTypography>
      ),
    }
  })

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
              >
                <MDTypography variant="h6" color="white">
                  Your Plots
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  isPaginated={true}
                  entriesPerPage={false}
                  showTotalEntries={true}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Plots;
