import { signIn, signOut, useSession } from 'next-auth/react';

import DashboardLayout from "LayoutContainers/DashboardLayout";
import DashboardNavbar from "Navbars/DashboardNavbar";
import NavLink from 'next/link'

import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const Home = () => {
  const { data: session } = useSession();

  return (
    <DashboardLayout>
      <MDBox mt={10} display="flex" alignItems="center" flexDirection="column" sx={{height: "100%"}}>
        <MDAvatar src="https://amuse.fra1.digitaloceanspaces.com/web/buns_logo2.png" alt="logo" sx={{width: 200, height: 200}} />
        <MDTypography mt={5} variant="h2" fontWeight="bold" textAlign="center">
          Amusement Dashboard beta
        </MDTypography>
        <MDTypography m={2} variant="body1" textAlign="center" maxWidth={800}>
          Welcome to the Amusement Dashboard beta. This is a work in progress, and will be updated frequently.
          Please log in with your Discord account to access the dashboard.
          This website is currently read only. Please use the Discord bot to do the usual stuff.
        </MDTypography>
        {!session && <MDBox m={2} display="flex" alignItems="center" flexDirection="row">
          <MDButton variant="contained" color="primary" onClick={() => signIn()}>
            Sign In
          </MDButton>
          <MDBox mx={2} />
          <NavLink href="/cards">
            <MDButton variant="contained" color="info">
              Browse cards
            </MDButton>
          </NavLink>
        </MDBox>}
        {session && 
        <MDBox m={2} display="flex" alignItems="center" flexDirection="row">
          <NavLink href="/profile/me">
            <MDButton variant="contained" color="primary">
              Go to your profile
            </MDButton>
          </NavLink>
        </MDBox>
        }
      </MDBox>
    </DashboardLayout>
  )
}

export default Home
