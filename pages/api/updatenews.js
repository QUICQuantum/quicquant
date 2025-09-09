import fetch from 'node-fetch';
const cheerio = require('cheerio');
import supabase from '../../utils/db';


async function fetchMainContent(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Error fetching URL ${url}: HTTP ${response.status}`);
                return {
                    mainContent: "No content available",
                    thumbnailDesc: "No content available",
                };
            }
            const html = await response.text();
            const $ = cheerio.load(html);

            $("script, style").remove();

            if (url.includes("fool.com")) {
              // Remove all instances of the specified divs
              $('div.flex.justify-center').remove();
              $('div.company-card-vue-component').remove();
              $('section.block-pitch').remove();
              
              $('section.block-definition').remove();

            $('.image .caption').remove();

              
          
              // Find the divs with class table-responsive and block-table
              const tableResponsiveDiv = $('.article-body .table-responsive');
              const tableBlockDiv = $('.article-body .block-table');
                const qna = $('.qna');
              // Remove all <br> tags from the divs
              if (tableResponsiveDiv.length > 0) {
                  tableResponsiveDiv.find('br').remove();
              }
              if (tableBlockDiv.length > 0) {
                  tableBlockDiv.find('br').remove();
              }
              if (qna.length > 0) {
                qna.find('svg').remove();
            }
              
          } else {
              console.log('URL does not include "fool.com".');
          }

            let mainContent = $(".body").html();
            if (!mainContent) mainContent = $(".content-without-wrap").html();
            if (!mainContent) mainContent = $("article").html();
            if (!mainContent) mainContent = $("#content").html();
            if (!mainContent) mainContent = $(".content").html();
            if (!mainContent) mainContent = $(".post-content").html();
            if (!mainContent) mainContent = $("#main-content").html();
            if (!mainContent) mainContent = $(".article-body").html();

            let title = $('.foolcom-grid-content-sidebar header').text();
            if (!title) title = $('h1.tracking-tight').text();
            if (!title) title = $('header.single-post-title h1 a').text();
           

            if (!mainContent) {
                console.error(`No content found for URL ${url}`);
                return {
                    mainContent: "No content available",
                    thumbnailDesc: "No content available",
                };
            }

            if (!title) {
                console.error(`No title found for URL ${url}`);
                return {
                    title: "No title available",
                };
            } else {
                title = title
                .replace(/\n/g, " ")
                .replace(/\s+/g, " ")
                .trim();
                }
            
            mainContent = mainContent.replace(/\n/g, "");
            mainContent = mainContent.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
            
          
            const images = $("img");
            images.each((index, img) => {
                const imgSrc = $(img).attr("src");
                const imgAlt = $(img).attr("alt") || "Image";
                $(img).replaceWith(
                    `<img src="${imgSrc}" alt="${imgAlt}" style="max-width: 100%; height: auto;">`
                );
            });

            let thumbnailDesc = $("<div>").html(mainContent).text();
            if (thumbnailDesc) {
                thumbnailDesc = thumbnailDesc
                .replace(/\n/g, " ")
                .replace(/\s+/g, " ")
                .trim();
            } 
                else {
                    console.error(`No thumbnail description found for URL ${url}`);
                    return {
                        thumbnailDesc: "No content available"
                    }
                }

            

            console.log(`Fetched main content from ${url}`);
            return { title, mainContent, thumbnailDesc };
        } catch (error) {
            if (i < retries - 1) {
                console.warn(`Retrying fetching main content from ${url}...`);
                continue;
            }
            console.error(`Error fetching main content from ${url}:`, error);
            return {
                mainContent: "No content available",
                thumbnailDesc: "No content available",
            };
        }
    }
}

// Save the timestamp in the `timestamps` table
async function saveLastUpdated() {
    const now = new Date().toISOString(); // Always save in UTC
    try {
        // Use upsert to insert or update the timestamp in a single operation
        const { error } = await supabase
            .from('timestamps')
            .upsert([
                { id: 1, last_updated: now }, // Assuming 'id' is the primary key
            ]);

        if (error) {
            throw error; // Handle any upsert error
        }

        console.log("Timestamp updated successfully!");
    } catch (error) {
        console.error(`Error updating timestamp: ${error.message}`);
    }
}




async function fetchGoogleSearchResults(query, numResults = 50) {
  const resultsPerPage = 10;
  let allResults = [];

  for (let start = 1; start <= numResults; start += resultsPerPage) {
      const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&start=${start}`;
      try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.items) {
             // Filter and log items that include "m.foolcdn.com"
             const foolcdnItems = data.items.filter(item => 
                item.link && item.link.includes('https://www.fool.com/investing/stock-market')
            );
              allResults = allResults.concat(data.items);
          } else {
              console.log(`Error fetching data: ${data.error.message}`);
              break;
          }
      } catch (error) {
          console.error(`Error fetching Google search results:`, error);
          break;
      }
  }

  return allResults;
}

async function fetchAndSaveBlogData() {
  try {
      console.log("Fetching blog data using Google Custom Search API...");

      const query = 'Quantum computing news';
      const searchResults = await fetchGoogleSearchResults(query, 50);

      if (searchResults.length > 0) {
          console.log(`Fetched ${searchResults.length} articles from Google Custom Search API.`);

          const uniquePosts = new Set();
          const uniqueTitles = new Set();

          const formattedData = {
              blog: []
          };

          for (const [index, item] of searchResults.entries()) {
              const articleUrl = item.link;

              if (!item.pagemap || !item.pagemap.cse_image || !item.pagemap.cse_image[0] || !item.pagemap.cse_image[0].src) {
                  console.log(`Skipping article without an image: ${articleUrl}`);
                  continue;
              }

              if (uniquePosts.has(articleUrl)) {
                  console.log(`Skipping duplicate article: ${articleUrl}`);
                  continue;
              }

              

              const { title, mainContent, thumbnailDesc } = await fetchMainContent(articleUrl);
              if (uniqueTitles.has(title)) {
                console.log(`Skipping duplicate title: ${title}`);
                continue;
            }
            
            if (mainContent && mainContent !== "No content available") {
                // Use metatags date if available, otherwise fallback to gsa_date
                const rawDate = item.pagemap.metatags[0]?.date || item.pagemap.metatags[0]?.gsa_date;

                const date = rawDate 
                ? rawDate === item.pagemap.metatags[0]?.gsa_date
                    ? new Date(rawDate.replace(/\s/g, '-')).toISOString() // Convert gsa_date to timestamp
                    : new Date(rawDate).toISOString() // Use metatags date as is
                : null; // Skip date if rawDate is empty

            
                formattedData.blog.push({
                    title: title,
                    content: mainContent,
                    img: item.pagemap.cse_image[0]?.src || '', // Ensure image exists
                    date: date,
                    thumbnail_desc: thumbnailDesc,
                    thumbnail_img: item.pagemap.cse_thumbnail?.[0]?.src || '', // Ensure thumbnail exists
                    url: articleUrl,
                    dis_url: item.displayLink,
                });
            
                uniquePosts.add(articleUrl);
                uniqueTitles.add(title);
            }
            
              
          }
          try {
            const {deleteerror} = await supabase.from('blogs').delete().not('id', 'is', null);
            if (deleteerror) {
                throw deleteerror;
            }
            console.log("Saving blog data to Supabase...");
            for (const blog of formattedData.blog) {
                const { error } = await supabase
                    .from('blogs')
                    .insert([blog]);
            
                if (error) {
                    console.error(`Error inserting blog data for ${blog.title}: ${error.message}`);
                }
            }
    
            
        } catch (error) {
            console.error(`Error inserting blog data: ${error}`);
        }
          saveLastUpdated();

          console.log("Data saved to blog.json");
      } else {
          console.log("Error fetching data: ", data.error.message);
      }
  } catch (error) {
      console.error("Error fetching or saving blog data:", error);
  }
}


export default async function handler(req, res) {
    

    if (req.method === 'POST' || (req.method === 'GET')) {
        await fetchAndSaveBlogData();
        res.status(200).json({ message: 'Blog data updated successfully' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

