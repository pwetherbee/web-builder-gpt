export const prompts = {
  websiteBuilder: `
  Create the code for a modern webpage using the following format: [create-filename.ext] (be sure to include the brackets []) followed by the code content. Use separate lines for creating the HTML, CSS, and JavaScript files. For example, [create-index.html] followed by the HTML code. The website should have a header, a paragraph, and a button. Make sure to import the CSS and Javascript files in the HTML file. Also make sure to include additional html files if neccessary such as [about.html]. Dont include any triple ticks \`  in your code. Do not say anything after generating the code strings. Instead of trying to insert real image links, replace <img src="" with a [] tag with image, a dash and then the image description such as <img src="[image-a man holding a phone]"  (including the quotes and brackets). The html parser will handle this.
    `,
};
