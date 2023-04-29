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

import { useSession } from 'next-auth/react';
import useSWR from 'swr';

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "Timeline/TimelineItem";

import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

import { fetcher } from 'utils';
import { CircularProgress } from '@mui/material';

function OrdersOverview({ combinedStats }) {
  const { data: session } = useSession();
  const include = ["transaction", "claim", "forge"]
  const { data } = useSWR(`/api/transactions?userId=${session?.user.id}&include=${include.join(',')}`, fetcher)

  if (!data || !session) {
    return (
      <Card sx={{ height: "100%" }}>
        <MDBox display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%" >
          <CircularProgress />
        </MDBox>
      </Card>
    )
  }

  const iconMap = {
    transaction: <SwapHorizontalCircleIcon />,
    claim: <PlaylistAddCircleIcon />,
    forge: <BuildCircleIcon />,
  }

  const { transactions, claims, forges } = data
  const concat = _.concat(transactions, claims, forges)
  const sorted = concat.sort((a, b) => new Date(b.date) - new Date(a.date))
  
  const cardChange = combinedStats? combinedStats.claims - combinedStats.aucsell + combinedStats.aucwin - 
    combinedStats.liquefy + combinedStats.draw - combinedStats.forge - 
    combinedStats.usersell - combinedStats.botsell + combinedStats.userbuy : 0

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Cards in/out
        </MDTypography>
        <MDBox mt={0} mb={1}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography variant="button" color="text" fontWeight="medium">
              {cardChange >= 0? "+" : ""}{cardChange}
            </MDTypography>{" "}
            last 7 days
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        {sorted.filter(x => x).slice(0, 5).map((item, i) => {
          const title = item.type === 'transaction' ? `Transaction [${item.id}]` : item.type === 'claim' ? `Claim [${item.id}]` : `Forge [${item.id}]`
          const amount = item.cards.length
          const color = item.type === 'transaction' ? 'success' : item.type === 'claim' ? 'warning' : 'info'

          return (
            <TimelineItem
              color={color}
              icon={iconMap[item.type]}
              title={title}
              dateTime={(new Date(item.date)).toDateString()}
              lastItem={i === 4}
              description={`You ${item.type === 'transaction' ? 
                (item.seller_id === session?.user.id? 'sold' : 'bought') : 
                (item.type === 'claim' ? 'claimed' : 'forged')} ${amount} card(s) for ${item.cost} 🍅`}
            />
          )
        })}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
