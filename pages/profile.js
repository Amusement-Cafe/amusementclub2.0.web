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
import { useState, useEffect } from "react";
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'
import { getToken } from "next-auth/jwt"

// @mui material components
import Grid from "@mui/material/Grid";
import CardList from 'Lists/CardList';
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

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

// Data
import getHost from '../utils/get-host'

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import { Circle } from '@mui/icons-material';
import CardView from 'Views/CardView';

function Profile({user, hero, favCards, clout, collections}) {
  const { data: session } = useSession();
  const { xp, joined, cloutedcols, roles, achievements } = user;
  
  const [tabValue, setTabValue] = useState(0);
  const [userCards, setUserCards] = useState([]);

  useEffect(() => {
    if (tabValue === 1) {

    } else if (tabValue === 2) {

    }
  }, [tabValue])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header onTabChange={setTabValue}>
        {tabValue === 0 && (
        <>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <ProfileInfoCard
                  info={{
                    level: xp,
                    InGameSince: joined,
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
                <AchievementList title="Achievements" achievementIds={achievements} shadow={true} />
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
                  image={homeDecor1}
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
        {tabValue === 1 && (
          <CardView collections={collections} userId={session.user.id} />
        )}
        {tabValue === 2 && (
          <CardView collections={collections} userId={session.user.id} useWishlist={true} />
        )}
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export async function getServerSideProps({ req, res }) {
  let session = await getServerSession(req, res, authOptions)

  if(session) {
    session.user.email = null
    
    const token = await getToken({ req: req })

    if (token && token.sub && session.user) {
      session = {
        ...session,
        user: {
          ...session.user,
          id: token.sub
        }
      }

      const userApiUrl = getHost(req) + '/api/users'
      const colApiUrl = getHost(req) + '/api/collections'
      const userResponse = await fetch(`${userApiUrl}?id=${token.sub}`)
      const colResponse = await fetch(colApiUrl)

      if (userResponse.ok && colResponse.ok) {
        const user = await userResponse.json()
        const collections = await colResponse.json()

        return {
          props: {
            session,
            collections,
            ...user
          }
        }
      }      
    }
  }

  return { props: { session } }
}

export default Profile;
