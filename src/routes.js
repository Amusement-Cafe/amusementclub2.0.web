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

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StyleIcon from '@mui/icons-material/Style';
import GavelIcon from '@mui/icons-material/Gavel';
import PeopleIcon from '@mui/icons-material/People';
import WindowIcon from '@mui/icons-material/Window';

const sessionRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <DashboardIcon fontSize="small"/>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "Transactions",
  //   key: "transactions",
  //   icon: <ReceiptIcon fontSize="small"/>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  {
    type: "collapse",
    name: "My Cards",
    key: "userCards",
    icon: <StyleIcon fontSize="small"/>,
    route: "/userCards",
  },
  {
    type: "collapse",
    name: "My Plots",
    key: "plots",
    icon: <WindowIcon />,
    route: "/plots",
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <AccountCircleIcon fontSize="small"/>,
    route: "/profile/me",
    component: <Profile />,
  },
  {
    type: "title",
    key: "globalTitle",
    title: "Global",
  },
];

const globalRoutes = [
  {
    type: "collapse",
    name: "Auctions",
    key: "auctions",
    icon: <GavelIcon fontSize="small"/>,
    route: "/auctions",
  },
  {
    type: "collapse",
    name: "Cards",
    key: "cards",
    icon: <StyleIcon fontSize="small"/>,
    route: "/cards",
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <PeopleIcon fontSize="small"/>,
    route: "/users",
  },
]

export default { sessionRoutes, globalRoutes }
