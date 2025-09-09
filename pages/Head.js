import Head from "next/head";

const PageHead = ({ title, description, imageUrl }) => {
  const defaultUrl = "https://quicquantum.com"; // Your website link

  return (
    <>
      <Head>
        <title>{`${title} || Quantum - Crypto and Future`}</title>
        <meta
          name="description"
          content={
            description || "Explore the world of crypto and future technologies at Quantum."
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph meta tags for social media embeds */}
        <meta
          property="og:title"
          content={`${title} || Quantum - Crypto and Future`}
        />
        <meta
          property="og:description"
          content={
            description || "Explore the world of crypto and future technologies at Quantum."
          }
        />
        <meta property="og:image" content={imageUrl || "/default-image.jpg"} />
        <meta property="og:url" content={defaultUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card meta tags */}
        <meta
          name="twitter:title"
          content={`${title} || Quantum - Crypto and Future`}
        />
        <meta
          name="twitter:description"
          content={
            description || "Explore the world of crypto and future technologies at Quantum."
          }
        />
        <meta name="twitter:image" content={imageUrl || "/default-image.jpg"} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description:
              description || "Explore the world of crypto and future technologies at Quantum.",
            url: defaultUrl,
            image: imageUrl || "/default-image.jpg",
          })}
        </script>
      </Head>
    </>
  );
};

export default PageHead;
