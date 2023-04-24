import Link from 'next/link'

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

import achievements from 'assets/achievements';

function AchievementList({ title, achievementIds, shadow, limit = 5 }) {
  const renderAchievements = achievementIds.slice(0, limit).map((achievementId) => {
    const { name, desc, title } = achievements.find((achievement) => achievement.id === achievementId);
    const image = `https://cdn.amusement.cafe/achievements/${achievementId}.png`;

    return (
    <MDBox key={name} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <MDBox mr={2}>
        <MDAvatar src={image} alt={name} shadow="md" />
      </MDBox>
      <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
        <MDTypography variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption" color="text">
          {desc}
        </MDTypography>
      </MDBox>
    </MDBox>
  )});

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderAchievements}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the AchievementList
AchievementList.defaultProps = {
  shadow: true,
};

export default AchievementList;
