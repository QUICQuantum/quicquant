import supabase from '../../utils/db'; // Supabase client

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        // Extract the `limit` value from query parameters
        const limitQuery = req.query.limit;
        const limit = limitQuery ? parseInt(limitQuery, 10) : null; // Parse the query parameter
  
        if (limit && (isNaN(limit) || limit <= 0)) {
          return res.status(400).json({ error: 'Invalid limit value' });
        }
  
        // Fetch blog data with or without a limit
        const query = supabase.from('blogs').select('*');
        if (limit) {
          query.limit(limit); // Apply limit only if specified
        }
  
        const { data: blogs, error } = await query;
  
        if (error) {
          throw error; // Handle any database errors
        }
  
        // Format the data into the required JSON structure
        const formattedData = {
          blog: blogs.map(blog => ({
            id: blog.id,
            title: blog.title,
            img: blog.img,
            content: blog.content,
            date: blog.date,
            thumbnail_desc: blog.thumbnail_desc,
            thumbnail_img: blog.thumbnail_img,
            url: blog.url,
            dis_url: blog.dis_url,
          })),
        };
  
        // Send the formatted data as the response
        res.status(200).json(formattedData);
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
  
