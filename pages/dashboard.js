
import { useSession } from 'next-auth/react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import useSWR from 'swr';
import _ from "lodash"

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardList from 'Lists/CardList';
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "LayoutContainers/DashboardLayout";
import DashboardNavbar from "Navbars/DashboardNavbar";
import Footer from "Footer";
import ProfileInfoCard from "Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "Lists/ProfilesList";
import AchievementList from 'Lists/AchievementList';
import DefaultProjectCard from "Cards/ProjectCards/DefaultProjectCard";

// Material Dashboard 2 React example components
import ReportsBarChart from "Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import homeDecor1 from "assets/images/home-decor-1.jpg";
import CardView from 'Views/CardView';
import { fetcher } from 'utils';
import CountdownItem from 'Items/CountdownItem';
import { Badge } from '@mui/material';

function Profile() {
  const router = useRouter()
  const { data: session } = useSession();

  const { data: user, error } = useSWR(`/api/users?userId=${session?.user.id}`, fetcher)
  const { sales, tasks } = reportsLineChartData;

  if (!user || !session) return <div>Loading...</div>

  console.log(new Date(user.lastdaily))

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="🍅"
                title="Tomatoes"
                count={_.round(user.exp)}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="🍷"
                title="Vials"
                count={_.round(user.vials)}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="🍋"
                title="Lemons"
                count={_.round(user.lemons)}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <Card>
                <MDBox display="flex" justifyContent="space-between" m={1} pt={1} px={2}>
                  <MDTypography variant="h5">
                    Daily status
                  </MDTypography>
                </MDBox>
                <MDBox m={2}>
                  <CountdownItem date={Date.parse(user.lastdaily)} variant="h4">
                    <MDBadge badgeContent="Ready to claim!" color="success"/>
                  </CountdownItem>
                </MDBox> 
              </Card>
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Profile;
