import supabase from '../../utils/db'; // Supabase client

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { postId } = req.query;

        try {
            // Fetch the blog post with the matching id
            const { data: blog, error } = await supabase
                .from("blogs")
                .select("*")
                .eq("id", postId)
                .single(); // Fetch a single blog post

            if (error || !blog) {
                throw new Error("Blog post not found");
            }

            // Format the data into the required JSON structure
            const formattedData = {
                blog: {
                    id: blog.id,
                    title: blog.title,
                    content: blog.content,
                    img: blog.img,
                    date: blog.date,
                    url: blog.url,
                    dis_url: blog.dis_url
                }
            };

            // Send the formatted data as the response
            res.status(200).json(formattedData);
        } catch (error) {
            console.error('Error fetching blog data:', error.message);
            res.status(500).json({ error: error.message || 'Internal Server Error' });
        }
    } else {
        // Handle unsupported HTTP methods
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}
