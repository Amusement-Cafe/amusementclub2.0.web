import { useSession } from 'next-auth/react';
import { fetcher } from 'utils';
import useSWR from 'swr';
import { add } from 'add-subtract-date'

// @mui material components
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import InlineCopyItem from "Items/InlineCopyItem";

function TodoList({ user, dailyStats }) {
  const { data: session } = useSession();
  const { data: plots } = useSWR(`/api/plots?userId=${session?.user.id}`, fetcher)

  if (!plots || !session) {
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

  const getIcon = (condition) => {
    if (condition) {
      return <CheckCircleIcon color='success' />
    }
    return <PendingIcon color='warning' />
  }

  const TaskItem = ({ condition, task, command, description }) => {
    return (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDTypography display="block" variant="h4">
          {getIcon(!condition)}
        </MDTypography>
        <MDBox ml={2} lineHeight={1} opacity={condition? 1 : 0.5} >
          <MDTypography 
            display="block" 
            variant="button" 
            fontWeight="medium"> 
            {task}{" "}
            <InlineCopyItem text={`/${command} `} p={0.5}/>
          </MDTypography>
          <MDTypography variant="caption">{description}</MDTypography>
        </MDBox>
      </MDBox>
    )
  }

  const now = new Date()
  const lastDaily = new Date(user.lastdaily)
  const lastVote = new Date(user.lastvote)

  const futureDaily = add(lastDaily, 20, 'hours')
  const futureVote = add(lastVote, 12, 'hours')
  const daily = futureDaily < now
  const vote = futureVote < now
  const claim = dailyStats.claims === 0
  const quest = user.dailyquests.length > 0
  const plot = plots.some(x=> x.building?.stored_lemons > 0)

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Your Tasks today
        </MDTypography>
        <Stack spacing={2} mt={4}>
          <TaskItem 
            condition={daily} 
            task="Claim Daily" 
            command="daily" 
            description="Collect your daily reward. This will reset your claim price." 
          />

          <TaskItem 
            condition={vote} 
            task="Vote for the bot" 
            command="vote" 
            description="Vote for the bot to get a reward. Get rewards like cards and 🍅"
          />

          <TaskItem
            condition={claim}
            task="Claim your cards"
            command="claim"
            description="Claim a card from the bot. Recommended to claim 4-6 cards per day."
          />

          <TaskItem
            condition={quest}
            task="Complete your quests"
            command="quest"
            description="Complete your daily quests to get rewards. Quests reset every daily."
          />

          <TaskItem
            condition={plot}
            task="Collect plot oncome"
            command="plot"
            description="Collect your 🍋 from your plots. You must have built at least one plot."
          />
        </Stack>
      </MDBox>
    </Card>
  );
}

export default TodoList;
