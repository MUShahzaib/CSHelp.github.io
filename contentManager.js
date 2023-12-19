import { fetchData } from "./FileIO/FileIO.js";
import { saveDataToJSONFile } from "./FileIO/FileIO.js";
import { ViewMedia, setLikeImage } from "./LikeShareView/script-likeViewsShare.js";

var data = null, itemData;
var categoriesList = null, itemsContainer, selectedDataType;
const itemBlockTemplate = document.getElementById('item-block');



// Function to initialize the page with default data type
async function initializePageWithDefaultDataType(fileReadPath, selectedType, categoriesListTemp, itemsContainerTemp) {
    await getData(fileReadPath);
    if (data) {
        // Use jsonData to access your data
        categoriesList = categoriesListTemp;
        itemsContainer = itemsContainerTemp;
        selectedDataType = selectedType;
        populateCategories(selectedDataType, categoriesList);
        displayItems(selectedDataType, 'All', '',null);
    } else {
        // Handle the case where data couldn't be fetched
    }
    return data;
}

///////// this function gets the file path than calls function from FileIO.js and returns the fetched data
//////// in future we just need to get data from firebase or nay other db here //////////////////////////
async function getData(fileReadPath) {
    return data = await fetchData(fileReadPath);
}

function setData(dataToSet){
    data= dataToSet;
}

// Function to get the value of a URL parameter by name
function getUrlParameter(name) {
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function populateCategories(dataType, categoriesList) {
    const categories = data[dataType].categories;
    categoriesList.innerHTML = '<option value="All">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoriesList.appendChild(option);
    });

    return categoriesList;
}

/////// this method filters the items based on dataType,category selected or serach /////////
function filterItems(dataType, selectedCategory, searchQuery) {
    const items = data[dataType].items;
    const filteredItems = items.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    return filteredItems;
}


/////////////// this functions gets filetered or sorted items based on sort type selected
function filterSortedItems(dataType, selectedCategory, searchQuery, sortBy) {
    
    let filteredItems= filterItems(dataType, selectedCategory, searchQuery);
    // Sort the filtered items based on the selected sorting criteria
    switch (sortBy) {
      case 'name':
        filteredItems = filteredItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        filteredItems = filteredItems.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        break;
      case 'likes':
        filteredItems = filteredItems.sort((a, b) => b.likes - a.likes);
        break;
      default:
        // Sort by default (no sorting)
        break;
    }
  
    return filteredItems;
  }
  

// Function to extract the tutorial ID from the URL {used in details page}
function getTutorialIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const tutorialId = urlParams.get('tutorialId');
    return parseInt(tutorialId); // Convert to integer
}


///////////////// this method returns the id of item by its name
function getIdByName(name) {
    // Loop through all categories to find the item by name
    for (const dataType in data) {
        if (data.hasOwnProperty(dataType)) {
            const items = data[dataType].items;
            const item = items.find(item => item.name === name);
            if (item) {
                return item.id; // Return the item if found
            }
        }
    }
    return null; // Return null if item not found
}

//////// this method displays the items based on dataType,category and search query//////
function displayItems(dataType, selectedCategory, searchQuery,filteredItems) {  
    if(filteredItems==null)
     filteredItems = filterItems(dataType, selectedCategory, searchQuery);
    if (document.location.href.includes("tutorial"))
        displayTutorialItems(filteredItems);

    else {
       
        itemsContainer.innerHTML = '';
        filteredItems.forEach(item => {
            const itemBlock = document.createElement('div');
            itemBlock.classList.add('item-block');
            itemBlock.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" style="max-width: 256px; max-height: 256px;">
            <h3 class="item-name">${item.name}</h3>
            <p>${item.description.substring(0, 100)} </p> <!-- Display the first 100 characters of description -->
            <a class="download-button" href="${item.link}" target="_blank" > Download/Buy </a>
        `;

            itemBlock.style = "cursor:pointer";
            itemsContainer.appendChild(itemBlock);
        });
    }
}

//////// this method displays the items for tutorials based on dataType,category and search query//////
function displayTutorialItems(filteredItems) {
   
    console.log(filteredItems.length);
     itemsContainer.innerHTML = '';
    filteredItems.forEach(item => {

        
        const itemBlockCopy = itemBlockTemplate.cloneNode(true);

        itemBlockCopy.querySelector('.icon-image').src=item.imageUrl;
        itemBlockCopy.querySelector('.item-name').textContent=item.name;
        itemBlockCopy.querySelector('.item-added-date').textContent=item.publishDate;
        itemBlockCopy.querySelector('.item-description').textContent=item.description.substring(0, 100);
        itemBlockCopy.querySelector('.likesLabel').textContent=item.likes;
        itemBlockCopy.querySelector('.sharesLabel').textContent=item.shares;
        itemBlockCopy.querySelector('.viewsLabel').textContent=item.views;
        itemBlockCopy.querySelector('.download-button').href=item.link;
        itemBlockCopy.querySelector('.download-button').target = '_blank';
        itemBlockCopy.style.display='flex';
        
        itemsContainer.append(itemBlockCopy);
        itemsContainer.append("/");
       
    });
  
}


///////////// this method adds evnets on categories drop down,search bar ,
//////////// click on item container and also on which page to load on base of datatype selected /////
function addEvents(categoriesList, searchBar, itemsContainer, urlToOpen) {
    // Add event listener for changing data type
    document.querySelectorAll('.data-type-button').forEach(button => {
        button.addEventListener('click', () => {
            selectedDataType = button.dataset.type;
            populateCategories(selectedDataType);
            displayItems(selectedDataType, 'All', '',null);
        });
    });

    // Add event listener for changing category or search query
    categoriesList.addEventListener('change', () => {
        const selectedCategory = categoriesList.value;
        const searchQuery = searchBar.value;
        displayItems(selectedDataType, selectedCategory, searchQuery,null);
    });

    searchBar.addEventListener('input', () => {
        const selectedCategory = categoriesList.value;
        const searchQuery = searchBar.value;
        displayItems(selectedDataType, selectedCategory, searchQuery,null);
    });

    let itemBlock; // Declare itemBlock variable outside the event listener scope

    // Add event listener for opening detailed info in a pop-up window
    itemsContainer.addEventListener('click', (event) => {
        if (!event.target.classList.contains('download-button')) {
            if (itemBlock = event.target.closest('.item-block')) {

                if (itemBlock) {

                    const itemId = getIdByName(itemBlock.querySelector('.item-name').textContent);
                    //const itemId = parseInt(itemBlock.dataset.itemId);
                    console.log("Id" + itemId);
                    if (!isNaN(itemId)) {
                        window.open(urlToOpen + `${itemId}`, '_self');
                    }
                }

            }
        }
    });
}


//////  this functions add events specific to tutorials like sorts etc. //////

function addTutorialsPageEvents(sortsList,searchBar){
        sortsList.addEventListener('change', () => {
        const selectedSort= sortsList.value;
        const selectedCategory = categoriesList.value;
        const searchQuery = searchBar.value;
        const filteredItems =filterSortedItems(selectedDataType, selectedCategory, searchQuery,selectedSort);
        displayItems(selectedDataType, selectedCategory, searchQuery,filteredItems);
        
    });
}



//// this function simply get the current item and its data based on the name of item ///
function getItemData() {
    //////// getting the data associated with currentItem so that load it ///////
    const tutorialId = getTutorialIdFromUrl();

    for (const dataType in data) {
        if (data.hasOwnProperty(dataType)) {
            const items = data[dataType].items;
            itemData = items.find(itemData => itemData.id === tutorialId);
            if (itemData) {
                break; // Stop searching when the item is found
            }
        }
    }

    return itemData;
}

function showViewLikesInitially() {
    //////////// using this code we are checking and setting if current 
    //////////// data is viewed and liked and how many times /////////
    setTimeout(function () {
        setLikeImage(true);
        ViewMedia();
    }, 200); //replace 200 with desired delay     Note: 1000 means 1 second 
}


function saveItemData() {
    saveDataToJSONFile(data);
}

function saveUpdatedData(dataToSave){
    saveDataToJSONFile(dataToSave);
}


export {
    getUrlParameter, populateCategories, filterItems, getTutorialIdFromUrl,
    initializePageWithDefaultDataType, addEvents,setData, getData, saveItemData, getItemData,
    showViewLikesInitially, itemData,addTutorialsPageEvents,saveUpdatedData
};