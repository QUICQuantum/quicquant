import { copy } from "clipboard";
import BackToTop from "./backToTop";
import HomePage from "./home";
import fs from 'fs';
import path from 'path';
import { AppProvider } from "@/context/DataContext";

export async function getStaticProps() {
  try {
    console.log("Fetching blog data...");
    
    // Fetch blogs from the API
    const response = await fetch(`https://www.quicquantum.com/api/getblog`);
    const data = await response.json();

    // Read the copyright text file
    const copyrightFilePath = path.join(process.cwd(), 'data', 'copyright.txt');
    const copyrightText = fs.readFileSync(copyrightFilePath, 'utf8');

    // Read the privacy policy text file
    const privacyPolicyFilePath = path.join(process.cwd(), 'data', 'privacyPolicy.txt');
    const privacyPolicyText = fs.readFileSync(privacyPolicyFilePath, 'utf8');

    // Read the cookies settings text file
    const cookiesSettingsFilePath = path.join(process.cwd(), 'data', 'cookiesSettings.txt');
    const cookiesSettingsText = fs.readFileSync(cookiesSettingsFilePath, 'utf8');

    // Validate that all files have content
    if (!copyrightText) {
      throw new Error('Copyright text file not found or empty');
    }
    if (!privacyPolicyText) {
      throw new Error('Privacy Policy text file not found or empty');
    }
    if (!cookiesSettingsText) {
      throw new Error('Cookies Settings text file not found or empty');
    }

    return {
      props: {
        blogs: data.blog || [], // Pass the fetched blogs to the props
        copyrightText,          // Pass the copyright text to the props
        privacyPolicyText,      // Pass the privacy policy text to the props
        cookiesSettingsText,    // Pass the cookies settings text to the props
      },
      revalidate: 86400, // Revalidate every 24 hours
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error.message);
    return {
      props: {
        blogs: [],             // Fallback to an empty array in case of an error
        copyrightText: '',     // Fallback to empty copyright text
        privacyPolicyText: '', // Fallback to empty privacy policy text
        cookiesSettingsText: '' // Fallback to empty cookies settings text
      },
    };
  }
}

export default function Home({ blogs, copyrightText, privacyPolicyText, cookiesSettingsText }) {
  console.log("blogs:", blogs);
  console.log("copyrightText:", copyrightText);
  console.log("privacyPolicyText:", privacyPolicyText);
  console.log("cookiesSettingsText:", cookiesSettingsText);

  return (
    <>
      <AppProvider
        blogs={blogs}
        copyrightText={copyrightText}
        privacyPolicyText={privacyPolicyText}
        cookiesSettingsText={cookiesSettingsText}
      >
        <HomePage />
      </AppProvider>
      <BackToTop />
    </>
  );
}
