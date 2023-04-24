import { useSession } from 'next-auth/react';

import DashboardLayout from "LayoutContainers/DashboardLayout";
import DashboardNavbar from "Navbars/DashboardNavbar";
import CardView from 'Views/CardView'

import useSWR from 'swr';
import { fetcher } from "utils";
import ProfilesList from 'Lists/ProfilesList';

const UserCards = () => {
  const { data: users, error } = useSWR('/api/users', fetcher);

  if (!users) return <div>Loading...</div>

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ProfilesList title="Users" profiles={users} />
    </DashboardLayout>
  )
}

export default UserCards
