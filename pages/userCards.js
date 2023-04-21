import { useSession } from 'next-auth/react';

import DashboardLayout from "LayoutContainers/DashboardLayout";
import DashboardNavbar from "Navbars/DashboardNavbar";
import CardView from 'Views/CardView'

import useSWR from 'swr';
import { fetcher } from "utils";

const UserCards = () => {
  const { data: session } = useSession();
  const { data, error } = useSWR('/api/collections', fetcher);

  if (!data) return <div>Loading...</div>
  if (!session) return <div>NO SESSION</div>

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CardView collections={data} userId={session.user.id} />
    </DashboardLayout>
  )
}

export default UserCards
