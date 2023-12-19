import { getUrlParameter,initializePageWithDefaultDataType
,addEvents,getData,getItemData,showViewLikesInitially, addTutorialsPageEvents} from "../contentManager.js";

localStorage.setItem("FileWritePath","http://localhost:5500/write/data/tutorials-data.json");


var data = null;
let itemData = null;
const categoriesList = document.getElementById('categories-list');
const searchBar = document.getElementById('search-bar');
const itemsContainer = document.getElementById('items-container');
const sortsList= document.getElementById('sorts-list');

// Get the dataType query parameter from the URL
const selectedDataType = getUrlParameter('dataType') || 'Unity'; // Default to 'games' if not specified
function initializePage(){
    data=initializePageWithDefaultDataType('http://localhost:5500/data/tutorials-data.json',selectedDataType,categoriesList,
    itemsContainer);
}


// Call the function to initialize the page with the default data type if its tutorials page 
/// otherwise loads the tutorials details page with appropriate data /////////////////////
if (document.location.href.includes('tutorials.html')) {
    initializePage();
    addEvents(categoriesList,searchBar,itemsContainer,`tutorial-details.html?tutorialId=`);
    addTutorialsPageEvents(sortsList,searchBar);
}
else {
    initializeTutorialDetailsPage();
}


// Fetch data from the JSON file and load the tutorial details
async function initializeTutorialDetailsPage() {
    data=await getData('http://localhost:5500/data/tutorials-data.json');
    if (data) {
        fillDetailsData();
        document.getElementById('codeCopyButton').addEventListener("click",copyCodeToClipBoard);
    } else {
        // Handle the case where data couldn't be fetched
    }
}

function fillDetailsData() {
    itemData=getItemData();
    showViewLikesInitially();
    // Check if item data exists
    if (itemData) {      
        // Parse the JSON data back to an object
        //const itemHere = JSON.parse(itemData);
        const itemHere = itemData;
        const newItemTabDocument = document;
        newItemTabDocument.getElementById('productName').textContent = itemHere.name;
        newItemTabDocument.getElementById('productIcon').src = itemHere.imageUrl;
        //newItemTabDocument.getElementById('mediaDownloadButton').href = itemHere.link;
        newItemTabDocument.getElementById('mediaDescription').textContent = itemHere.description;
        newItemTabDocument.getElementById('developer').textContent = "Developer : " + itemHere.developer;
        newItemTabDocument.getElementById('likesLabel').textContent = "" + itemHere.likes;
        newItemTabDocument.getElementById('sharesLabel').textContent = "" + itemHere.shares;
        newItemTabDocument.getElementById('viewsLabel').textContent = "Views : " + itemHere.views;
  
        // JavaScript to populate media sources
        const videoContainer = newItemTabDocument.getElementById('video-container');

        const iframeDoc = newItemTabDocument.getElementById("document-frame");
        //iframeDoc.src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true";
        //iframeDoc.src ="https://docs.google.com/viewer?srcid=[1_8L5HI-wcGNf2XStLBoauhWpCvAbkeV2]&pid=explorer&efh=false&a=v&chrome=false&embedded=true";
        // Function to set the iframe's height to match its content


        iframeDoc.src = "https://drive.google.com/file/d/" + itemHere.referenceDocument + "-/preview";

        if (itemHere && itemHere.mediaSources && itemHere.mediaSources.length > 0) {
            // Populate media container with media items

            itemHere.mediaSources.forEach(source => {
                if (source.endsWith('.mp4')) {
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
                    iframe.width="100%";
                    iframe.height = "400";
                    iframe.src = source;
                    iframe.setAttribute('allowfullscreen', 'true'); // Set 'allowfullscreen' as a boolean attribute
                    iframe.className = 'media-item'; // Add a class for styling
                    videoContainer.appendChild(iframe);
                }
            });
        }
    }
}


//////// this function copies the code in code box in clip board ///////
function copyCodeToClipBoard(){
    var contentToCopy= document.getElementById("mediaDescription").innerHTML;
    navigator.clipboard.writeText(contentToCopy);
        // const dummy = document.createElement('input');
        // document.body.appendChild(dummy);
        // dummy.value = contentToCopy;
        // dummy.select();
        // document.execCommand('copy');
        // document.body.removeChild(dummy);
        alert('Code copied to clipboard');    
}

