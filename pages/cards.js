
import DashboardLayout from "LayoutContainers/DashboardLayout";
import DashboardNavbar from "Navbars/DashboardNavbar";
import CardView from 'Views/CardView'

import useSWR from 'swr';
import { fetcher } from "utils";
import { useRouter } from 'next/router';

const Cards = () => {
  const router = useRouter();
  const { collection } = router.query;
  const { data } = useSWR('/api/collections', fetcher);

  const query = {
    collection: collection,
    keywords: ""
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <CardView collections={data} startingQuery={query} />
    </DashboardLayout>
  )
}

export default Cards
