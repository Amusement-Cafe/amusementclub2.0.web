// react-routers components
import Link from 'next/link'

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

function HeroCard({ hero, shadow }) {
  const { size } = typography;
  const { name, xp, followers, id, pictures } = hero;

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <MDBox p={2}>
              <CardMedia
                src={pictures[0]}
                component="img"
                title={name}
                sx={{
                  maxWidth: "100%",
                  margin: 0,
                  boxShadow: ({ boxShadows: { md } }) => md,
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <MDBox p={2}>
              <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
                {name}
              </MDTypography>
              <MDTypography variant="button" fontWeight="regular" color="text">
                {id}
              </MDTypography>
              <MDBox key="heroLevel" display="flex" py={1} pr={2}>
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  Level: &nbsp;
                </MDTypography>
                <MDTypography variant="button" fontWeight="regular" color="text">
                  &nbsp;{xp}
                </MDTypography>
              </MDBox>
              <MDBox key="heroFollowers" display="flex" py={1} pr={2}>
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                  Followers: &nbsp;
                </MDTypography>
                <MDTypography variant="button" fontWeight="regular" color="text">
                  &nbsp;{followers}
                </MDTypography>
              </MDBox>
              <MDBox opacity={0.3}>
                <Divider />
              </MDBox>
              {/* <MDBox>
                {renderItems}
                <MDBox display="flex" py={1} pr={2}>
                  <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                    social: &nbsp;
                  </MDTypography>
                  {renderSocial}
                </MDBox>
              </MDBox> */}
            </MDBox>
          </Grid>
        </Grid>
    </Card>
  );
}

export default HeroCard;
