import { getUrlParameter,initializePageWithDefaultDataType
    ,addEvents,getData,getItemData,showViewLikesInitially } from "../contentManager.js";
    
    localStorage.setItem("FileWritePath","http://localhost:5500/write/data/apps-and-games-data.json");
    
    
    var data = null;
    let itemData = null;
    const categoriesList = document.getElementById('categories-list');
    const searchBar = document.getElementById('search-bar');
    const itemsContainer = document.getElementById('items-container');
    
    // Get the dataType query parameter from the URL
    const selectedDataType = getUrlParameter('dataType') || 'games'; // Default to 'games' if not specified
    function initializePage(){
        data=initializePageWithDefaultDataType('http://localhost:5500/data/apps-and-games-data.json',selectedDataType,categoriesList,
        itemsContainer);
    }
    
    
    // Call the function to initialize the page with the default data type if its tutorials page 
    /// otherwise loads the tutorials details page with appropriate data /////////////////////
    if (document.location.href.includes('apps-and-games.html')) {
        initializePage();
        addEvents(categoriesList,searchBar,itemsContainer,`apps-and-games-details.html?tutorialId=`);
    }
    else {
        initializeAppsAndGamesDetailsPage();
    }
    
    
    // Fetch data from the JSON file and load the tutorial details
    async function initializeAppsAndGamesDetailsPage() {
        data=await getData('http://localhost:5500/data/apps-and-games-data.json');
        if (data) {
            fillDetailsData();
        } else {
            // Handle the case where data couldn't be fetched
        }
    }

function fillDetailsData() {

    // Retrieve the item data from localStorage
    itemData=getItemData();
    showViewLikesInitially();

    // Check if item data exists
    if (itemData) {
        // Parse the JSON data back to an object
        const itemHere= itemData;
       // const itemHere = JSON.parse(itemData);
        const newItemTabDocument = document;

        // newItemTabDocument.getElementById('media').src = itemHere.imageUrl;
        newItemTabDocument.getElementById('productName').textContent = itemHere.name;
        newItemTabDocument.getElementById('productIcon').src=itemHere.imageUrl;
        // newItemTabDocument.getElementById('mediaDownloadButton').href = itemHere.link;
        newItemTabDocument.getElementById('mediaDescription').textContent = itemHere.description;
        newItemTabDocument.getElementById('developer').textContent = "Developer : " + itemHere.developer;
        newItemTabDocument.getElementById('likesLabel').textContent = "" + itemHere.likes;
        newItemTabDocument.getElementById('sharesLabel').textContent = "" + itemHere.shares;
        newItemTabDocument.getElementById('viewsLabel').textContent = "Views : " + itemHere.views;


        // JavaScript to populate media sources
        const videoContainer = newItemTabDocument.getElementById('video-container');
        const imageContainer = newItemTabDocument.getElementById('image-container');

        if (itemHere && itemHere.mediaSources && itemHere.mediaSources.length > 0) {

            // Populate media container with media items
            itemHere.mediaSources.forEach(source => {
                //if (source.includes((jpeg|jpg|gif|png|webp|photos)) != null) {
                if (source.includes('google')||source.endsWith('.jpg') || source.endsWith('.jpeg') || source.endsWith('.png')) {
                    // Create an image element for images
                    const image = document.createElement('img');
                    image.src = source;
                    image.className = 'media-item'; // Add a class for styling
                    imageContainer.appendChild(image);
                } 
                else if (source.endsWith('.mp4')) {
                    // Create a video element for videos
                    const video = document.createElement('video');
                    video.src = source;                   
                    video.controls = true; // Add video controls
                    video.style.objectFit = 'contain'; // Set object-fit property
                    video.className = 'media-item'; // Add a class for styling
                    videoContainer.appendChild(video);
                }

                else if (source.includes('youtube.com/embed')) {
                    // For YouTube videos, create an iframe element and set its src attribute
                    const iframe = document.createElement('iframe');
                    iframe.src = source;
                    iframe.setAttribute('allowfullscreen', 'true'); // Set 'allowfullscreen' as a boolean attribute
                    iframe.className = 'media-item'; // Add a class for styling
                    videoContainer.appendChild(iframe);
                }
            });
        }
    }

}


// Function to scroll media items
function scrollMedia(direction) {
    const scrollAmount = direction === 'left' ? -100 : 100; // Adjust the scroll amount as needed
    const mediaContainer = document.getElementById('image-container');
    mediaContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

