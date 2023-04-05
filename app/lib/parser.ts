const axios = require("axios");
const fs = require("fs");
const path = require("path");
const folder = "public/generated/";

export default async function createFilesFroImnput(rawInput: string) {
  // replace errant "html" strings
  // const input = rawInput.replace(/```/g, "").replace(/html/g, "");
  console.log(rawInput);
  // const input = rawInput.split("|||")[1];
  const input = rawInput;
  const inputWithImages = await replaceImagePlaceholders(input);
  console.log(inputWithImages);

  const filePattern = /\[create-(.+?)\]\n([\s\S]+?)(?=\n\[create-|$)/g;
  let match;

  console.log("creating files from input");

  while ((match = filePattern.exec(inputWithImages)) !== null) {
    const fileName = match[1];
    let fileContent = match[2];

    // Remove unwanted strings from the file content
    fileContent = fileContent
      .replace(/```html/g, "")
      .replace(/```css/g, "")
      .replace(/```js/g, "");

    fileContent = fileContent.replace(/```/g, "");

    // Construct the full file path using the current working directory
    const filePath = path.join(process.cwd(), folder, fileName);

    // Extract the directory path and create the directory if it doesn't exist
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, fileContent, (err: any) => {
      if (err) throw err;
    });
    console.log(`Created ${filePath}`);
  }
}

// Function to fetch an image URL from Unsplash API
async function fetchImageURL(query: any) {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        query,
        client_id: process.env.UNSPLASH_API_KEY,
      },
    });

    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      return response.data.results[0].urls.regular;
    } else {
      console.error("No image found for query:", query);
      return null;
    }
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
}

// Function to replace placeholders with actual image URLs
async function replaceImagePlaceholders(input: string) {
  const imagePlaceholderPattern = /\[\$image=(.+?)\]/g;
  const generateImagePattern = /\[\$generate=(.+?)\]/g;
  let match;
  let modifiedInput = input;

  // Replace $image placeholders
  while ((match = imagePlaceholderPattern.exec(input)) !== null) {
    const query = match[1];
    const imageUrl = await fetchImageURL(query);

    if (imageUrl) {
      modifiedInput = modifiedInput.replace(match[0], imageUrl);
    } else {
      console.warn(`No image found for query '${query}', leaving placeholder.`);
    }
  }

  // Replace $generate placeholders
  while ((match = generateImagePattern.exec(input)) !== null) {
    const prompt = match[1];
    const generatedImageUrl = await fetchGeneratedImageURL(prompt);

    if (generatedImageUrl) {
      modifiedInput = modifiedInput.replace(match[0], generatedImageUrl);
    } else {
      console.warn(
        `No image generated for prompt '${prompt}', leaving placeholder.`
      );
    }
  }

  return modifiedInput;
}

async function fetchGeneratedImageURL(prompt: string) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    if (response.data && response.data.data && response.data.data.length > 0) {
      return response.data.data[0].url;
    } else {
      console.error("No image generated for prompt:", prompt);
      return null;
    }
  } catch (error) {
    console.error("Error fetching generated image URL:", error);
    return null;
  }
}
