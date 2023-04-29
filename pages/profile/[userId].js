
import { useSession } from 'next-auth/react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import useSWR from 'swr';
import _ from "lodash"

// @mui material components
import Grid from "@mui/material/Grid";
import CardList from 'Lists/CardList';
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "LayoutContainers/DashboardLayout";
import DashboardNavbar from "Navbars/DashboardNavbar";
import Footer from "Footer";
import ProfileInfoCard from "Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "Lists/ProfilesList";
import AchievementList from 'Lists/AchievementList';
import DefaultProjectCard from "Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import HeroCard from 'Cards/HeroCard';

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import { Circle } from '@mui/icons-material';
import CardView from 'Views/CardView';
import { XPtoLEVEL, fetcher } from 'utils';

function Profile() {
  const router = useRouter()
  let { userId } = router.query
  const { data: session } = useSession();

  if (userId === 'me') {
    userId = session?.user.id
  }

  const { data: profile, error } = useSWR(`/api/profile?userId=${userId}`, fetcher)
  const { data: collections, error2 } = useSWR(`/api/collections`, fetcher)

  const [tabValue, setTabValue] = useState(0);

  if (!profile || !session) return <div>Loading...</div>

  const { user, hero, favCards, clout } = profile;
  const { xp, joined, cloutedcols, roles, achievements } = user;
  const sortedAchievements = _.reverse(achievements)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header onTabChange={setTabValue} user={user}>
        {tabValue === 0 && (
        <>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <ProfileInfoCard
                  info={{
                    level: XPtoLEVEL(xp),
                    InGameSince: (new Date(joined)).toDateString(),
                    OverallClout: cloutedcols.length,
                  }}
                  roles={roles.map(role => ({ 
                    name: role,
                    color: "primary",
                    icon: <Circle/> 
                  }))}
                  shadow={true}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <HeroCard hero={hero} shadow={true}/>
              </Grid>
              <Grid item xs={12} xl={4}>
                <AchievementList title="Achievements" achievementIds={sortedAchievements} shadow={true} />
              </Grid>
            </Grid>
          </MDBox>
          { favCards.length > 0 &&
          <MDBox p={2}>
            <MDTypography variant="h6" fontWeight="medium">
              Favourite Cards
            </MDTypography>
            <CardList cards={favCards} />
          </MDBox>
          }
          {cloutedcols.length > 0 && 
          <MDBox p={2}>
            <MDTypography variant="h6" fontWeight="medium">
              Completed Collections
            </MDTypography>
            <Grid container spacing={6}>
              {clout.map((col) => (
              <Grid item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={col.url}
                  label={col.amount}
                  title={col.name}
                  description={`Added ${col.dateAdded}`}
                  action={{
                    type: "internal",
                    route: "/cards?collection=" + col.id,
                    color: "info",
                    label: "view collection cards",
                  }}
                />
              </Grid>
              ))}
            </Grid>
          </MDBox>
          }
        </>
        )}
        {session && tabValue === 1 && (
          <CardView collections={collections} userId={userId || session.user.id} />
        )}
        {session && tabValue === 2 && (
          <CardView collections={collections} userId={userId || session.user.id} useWishlist={true} />
        )}
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Profile;
