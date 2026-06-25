import { getBestsellers } from '@/lib/sanity';
import HomeClient from './HomeClient';

// Revalidate the homepage every hour to ensure data is fresh but highly cached
export const revalidate = 3600;

export default async function Home() {
  // Fetch data on the server side
  const bestsellers = await getBestsellers();

  return (
    <HomeClient initialBestsellers={bestsellers} />
  );
}
