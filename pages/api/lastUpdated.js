import supabase from '../../utils/db'; // Supabase client

export default async function handler(req, res) {
  
  if (req.method === 'GET') {
  try {
    // Fetch all blog data from the Supabase database
    const { data, error } = await supabase.from("timestamps").select("*");
    if (error) {
      throw error; // Handle any database errors
  }

  // Format the data into the required JSON structure
  const formattedData = {
    lastUpdatedTimestamp: data[0].last_updated
  }

    console.log('lastUpdatedTimestamp:', formattedData.lastUpdatedTimestamp);
    // Send the formatted data as the response
    res.status(200).json(formattedData.lastUpdatedTimestamp);
  } catch (error) {
      console.error('Error fetching blog data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
} else {
  // Handle unsupported HTTP methods
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} not allowed`);
}
}