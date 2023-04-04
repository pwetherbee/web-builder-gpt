
function showTreeFacts() {
  const facts = [
    "The tallest tree in the world is Hyperion, a coast redwood in California that measures over 379 feet (115 meters) high!",
    "Did you know that trees can grow in space? In 1971, Soviet cosmonauts took a tree seed into orbit around the Earth and later planted it back on the ground.",
    "Trees help to counteract climate change by absorbing carbon dioxide during photosynthesis.",
    "The oldest living tree in the world is believed to be a Great Basin bristlecone pine in California, named Methuselah, which is over 4,800 years old!"
  ];
  const randomIndex = Math.floor(Math.random() * facts.length);
  const treeFactsEl = document.getElementById("tree-facts");
  treeFactsEl.textContent = facts[randomIndex];
}


This website is about an imaginary community who loves trees! The homepage has a header with a logo, a navigation bar linking to the homepage and the about page, a section with a welcome message and a button to display a random tree fact. The about page has a header and a section with information about the community and their mission to preserve and protect trees. The CSS has some basic styling for the navigation bar, the button, and the main section. The JS file contains a function to display a random tree fact when the button is clicked. 

Since this is just a basic code, feel free to add more details or elements to make it look cooler!