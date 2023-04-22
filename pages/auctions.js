import React from "react";

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

import InlineCopyItem from "Items/InlineCopyItem";
import AuctionPopup from "Popups/AuctionPopup";
import { fetcher, formatCardName } from "utils";
import CountdownItem from "Items/CountdownItem";
import CardPopup from "Popups/CardPopup";

function Auctions() {
  const [auctionOpen, setAuctionOpen] = React.useState(false);
  const [cardOpen, setCardOpen] = React.useState(false);
  const [selectedAuction, setSelectedAuction] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const { data: auctions, error } = useSWR('/api/auctions', fetcher)

  if (!auctions) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox m={2}/>
        <CircularProgress />
      </DashboardLayout>
    )
  }

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
    { Header: "id", accessor: "id", align: "center", sortable: false },
    { Header: "price", accessor: "price", align: "center" },
    { Header: "card", accessor: "card", align: "center" },
    { Header: "time remaining", accessor: "time", align: "center" },
    { Header: "action", accessor: "action", align: "center", sortable: false },
  ]

  const viewAuction = (auction) => {
    setAuctionOpen(true);
    setSelectedAuction(auction);
  };

  const viewCard = (card) => {
    setCardOpen(true);
    setSelectedCard(card);
  };

  const handleAuctionClose = () => {
    setAuctionOpen(false);
  };

  const handleCardClose = () => {
    setCardOpen(false);
  };

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
        <Button onClick={() => viewCard(auction.card)}>
          <MDTypography variant="button" fontWeight="medium">
            {formatCardName(auction.card)}
          </MDTypography>
        </Button>
      ),
      time: (
        <CountdownItem date={Date.parse(auction.expires)} >
          <MDBadge badgeContent="finished" color="success" size="sm" />
        </CountdownItem>
      ),
      action: (
        <Button variant="contained" color="primary" onClick={() => viewAuction(auction)}>
          View Details
        </Button>
      )
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
                  isSorted={true}
                  isPaginated={true}
                  entriesPerPage={false}
                  showTotalEntries={true}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <AuctionPopup auction={selectedAuction} open={auctionOpen} onClose={handleAuctionClose} />
        <CardPopup card={selectedCard} open={cardOpen} onClose={handleCardClose} />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Auctions;
