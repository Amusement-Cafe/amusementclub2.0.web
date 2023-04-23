
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";

const getStartedLinks = [
  { href: "https://discord.com/api/oauth2/authorize?client_id=340988108222758934&permissions=0&scope=bot%20applications.commands", name: "Invite" },
  { href: "https://docs.amusement.cafe/", name: "Documentation" },
  { href: "https://discordz.gg/kqgAvdX", name: "Support Discord" },
]

const devLinks = [
  { href: "https://github.com/Amusement-Cafe/amusementclub2.0", name: "Bot Source" },
  { href: "https://github.com/Amusement-Cafe", name: "Amusement Cafe" },
  { href: "https://github.com/madebynoxc/amusementclub2.0.web", name: "Website Source" },
  { href: "https://github.com/madebynoxc/amusement-club", name: "Legacy Bot" },
  { href: "https://ko-fi.com/amusement", name: "Donate" },
]

const usingLinks = [
  { href: "https://github.com/OceanicJS/Oceanic", name: "Oceanic" },
  { href: "https://nodejs.org/", name: "NodeJS" },
  { href: "https://www.mongodb.com/", name: "MongoDB" },
  { href: "https://nextjs.org/", name: "Next.JS" },
  { href: "https://vercel.com/", name: "Vercel" },
  { href: "https://material-ui.com/", name: "mui" },
]

function Footer() {
  const { size } = typography;

  const renderLinks = (links) =>
    links.map((link) => (
      <Stack>
        <Link href={link.href} target="_blank">
          <MDTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </MDTypography>
        </Link>
      </Stack>
    ));

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <Grid
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="top"
        flexWrap="wrap"
        flexDirection={{ xs: "column", lg: "row" }}
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        <Grid item>
          <Stack>
            <MDBox 
              src="https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/discord_logo_2021.svg"
              component="img"
              alt="Dicord Logo"
              mb={0.75}
              sx={{ width: "120px" }}
              />
            
            <MDBox 
              src="https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/amusement-cafe-smalltext.png"
              component="img"
              alt="Amusement Cafe Logo"
              mb={0.75}
              sx={{ width: "120px" }}
              />

            <MDTypography variant="button" fontWeight="bold" color="text">
              support@amusement.cafe
            </MDTypography>
            <MDTypography variant="button" fontWeight="bold" color="text">
              Website 
              <Link href="https://twitter.com/madebynoxc" target="_blank"> @madebynoxc</Link>
            </MDTypography>
            <MDTypography variant="button" fontWeight="bold" color="text">
              Bort art by 
              <Link href="https://twitter.com/NAMIORII" target="_blank"> @NAMIORII</Link>
            </MDTypography>
          </Stack>
        </Grid>
        <Grid item>
          <MDTypography variant="h6">Get Started</MDTypography>
          {renderLinks(getStartedLinks)}
        </Grid>
        <Grid item>
          <MDTypography variant="h6">Links</MDTypography>
          {renderLinks(devLinks)}
        </Grid>
        <Grid item>
          <MDTypography variant="h6">Using</MDTypography>
          {renderLinks(usingLinks)}
        </Grid>
        <Grid item>
          <MDBox></MDBox>
        </Grid>
        <Grid item>
          <MDBox></MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
