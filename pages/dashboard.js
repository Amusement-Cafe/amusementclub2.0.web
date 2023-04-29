
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import { fetcher } from 'utils';
import useSWR from 'swr';
import _ from "lodash"

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "LayoutContainers/DashboardLayout";
import DashboardNavbar from "Navbars/DashboardNavbar";
import Footer from "Footer";
import DefaultProjectCard from "Cards/ProjectCards/DefaultProjectCard";
import ReportsBarChart from "Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "Cards/StatisticsCards/ComplexStatisticsCard";
import CountdownItem from 'Items/CountdownItem';

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import TodoList from 'layouts/dashboard/components/TodoList';

function Profile() {
  const router = useRouter()
  const { data: session } = useSession();

  const { data: user, error } = useSWR(`/api/users?userId=${session?.user.id}`, fetcher)
  const { data: stats } = useSWR(`/api/stats?userId=${session?.user.id}&include=combined,latest&range=7`, fetcher)

  if (!user || !session || !stats) return <div>Loading...</div>

  const getColor = (val1, val2) => {
    if (val1 > val2) return "success"
    if (val1 < val2) return "error"
    return "warning"
  }

  const getPercentage = (val1, val2) => {
    const presentage = _.round((val1/val2 * 100), 2)
    if (presentage > 0) return `+${presentage}%`
    if (presentage < 0) return `${presentage}%`
    return "0%"
  }

  const { combined, latest } = stats
  const tomatoDiff =  combined? combined.tomatoin - combined.tomatoout : 0
  const vialDiff = combined? combined.vialin - combined.vialout : 0
  const lemonsDiff = combined? combined.lemonin - combined.lemonout : 0

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
                  color: getColor(tomatoDiff, 0),
                  amount: getPercentage(tomatoDiff, user.exp),
                  label: "last week",
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
                  color: getColor(vialDiff, 0),
                  amount: getPercentage(vialDiff, user.vials),
                  label: "last week",
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
                  color: getColor(lemonsDiff, 0),
                  amount: getPercentage(lemonsDiff, user.lemons),
                  label: "last week",
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
            <Grid item xs={12} md={6} lg={4}>
              <TodoList user={user} dailyStats={latest} />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview combinedStats={combined} />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Profile;
