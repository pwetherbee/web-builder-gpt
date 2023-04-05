async function getRandomPickle() {
    const response = await fetch("https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=1&format=json&origin=*&rnfilterredir=nonredirects");
    const data = await response.json();
    const pageTitle = data.query.random[0].title;
    document.getElementById("pickle-variety").textContent = pageTitle;

    // Get a generated image of a pickle
    document.getElementById("pickle-image").src = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ZIAXv61Bq6l6pI6NpN0znV1h/user-z35zUoV0DRIc3DKeYbLR4wez/img-8vomcK4HzyUPtigxQ8PNmn03.png?st=2023-04-05T00%3A05%3A02Z&se=2023-04-05T02%3A05%3A02Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-04T08%3A31%3A24Z&ske=2023-04-05T08%3A31%3A24Z&sks=b&skv=2021-08-06&sig=db2WFtcVKQyXB%2BzHa%2B8Qw5mr/Fmjch8bUiW/nBnXZYE%3D";
}

document.getElementById("get-pickle").addEventListener("click", getRandomPickle);
getRandomPickle();