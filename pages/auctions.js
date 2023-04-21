
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

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
import Countdown from 'react-countdown';
import { fetcher } from "utils";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import InlineCopyItem from "Items/InlineCopyItem";
import { formatCardName } from "utils";

function Auctions() {
  const { data: auctions, error } = useSWR('/api/auctions', fetcher)

  console.log(auctions)

  if (!auctions) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox m={2}/>
        <CircularProgress />
      </DashboardLayout>
    )
  }

  //const { columns, rows } = authorsTableData();
  const Seller = ({ image, name, title }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{title}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const columns = [
    { Header: "seller", accessor: "seller", align: "left" },
    { Header: "id", accessor: "id", align: "center" },
    { Header: "price", accessor: "price", align: "center" },
    { Header: "card", accessor: "card", align: "center" },
    { Header: "time remaining", accessor: "time", align: "center" },
    { Header: "action", accessor: "action", align: "center" },
  ]

  const now = new Date()
  const rows = auctions.map(auction => {
    return {
      seller: <Seller image={auction.author.image} name={auction.author.username} title={auction.author.title} />,
      id: <InlineCopyItem text={auction.id} />,
      price: (
        <MDTypography variant="text" fontWeight="bold">
          {auction.price + " 🍅"}
        </MDTypography>
      ),
      card: (
        <Button>
        <MDTypography variant="button" fontWeight="medium">
          {formatCardName(auction.card)}
        </MDTypography>
        </Button>
      ),
      time: (
        <Countdown date={Date.parse(auction.expires)} >
          <MDBox ml={-1}>
            <MDBadge badgeContent="finished" color="success" variant="gradient" size="sm" />
          </MDBox>
        </Countdown>
      ),
      action: <Button variant="contained" color="primary">View Details</Button>
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
                  Current Auctions
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
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

export default Auctions;
