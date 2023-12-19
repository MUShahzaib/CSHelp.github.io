import { saveItemData, itemData } from "../contentManager.js";


if (!window.location.href.includes("discussion")) {
    $(".shared-elements").load("../LikeShareView/likeShareView.html .downloadLikeShareView", function () {
        loadViewLikeShares();
        document.getElementById('mediaDownloadButton').addEventListener('click', function () {
            //print();
            enableDisableCpatcha('block');
        });

    });
}

else if (window.location.href.includes("discussion")) {

    $(".share-elements").load("../LikeShareView/likeShareView.html .sharing-container", function () {
        loadViewLikeShares();
    });
    
    $(".like-elements").load("../LikeShareView/likeShareView.html .likesButton", function () {
        loadViewLikeShares();
    });
}




function loadViewLikeShares() {

    addLikeShareEvents();

    window.addEventListener('message', function (event) {
        if (event.data === 'closeCaptcha') {
            enableDisableCpatcha('none');
        }

        else if (event.data === 'addShare') {
            ShareMedia();
            document.getElementById('sharesLabel').textContent = "" + itemData.shares;
        }
    });


}


function addLikeShareEvents() {
    ///////// there can be many like share buttons on one page/div at a time
    let likeButtons = Array.from(document.getElementsByClassName('likesButton'));
    let shareButtons = Array.from(document.getElementsByClassName('share-button'));

    shareButtons.forEach(shareButton => {
        shareButton.addEventListener('click', function () {
            // Show the custom sharing dialog
            document.getElementById('sharingDialog').style.display = 'block';
        });
    });

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener('click', function (event) {
            // Prevent the default behavior of the link (e.g., navigating to the URL)
            event.preventDefault();
            setLikeImage(false);
            document.getElementById('likesLabel').textContent = "" + itemData.likes;
        });
    });

       // Close the sharing dialog
        document.getElementById('closeDialog').addEventListener('click', function () {
            document.getElementById('sharingDialog').style.display = 'none';
        });
}

const imagePaths = ["../Images/emptyHeart.png", "../Images/heart.png"];

function enableDisableCpatcha(valueToSet) {
    // Close the iframe when receiving the 'closeCaptcha' message
    var captchaParent = document.getElementById('captcha-ParentContainer');
    captchaParent.style.display = valueToSet;
}

function setLikeImage(isPageRefresh) {
    // localStorage.removeItem(itemData.id+itemData.name+"Likes");
    if (localStorage.getItem(itemData.id + itemData.name + "Likes") == null)
        localStorage.setItem(itemData.id + itemData.name + "Likes", 0);

    var valueToSet = parseInt(localStorage.getItem(itemData.id + itemData.name + "Likes"));

    console.log(valueToSet + "index" + imagePaths[valueToSet]);
    if (isPageRefresh)
        applyLikeImage(imagePaths[valueToSet]);

    else {
        valueToSet += 1;
        if (valueToSet == 2) valueToSet = 0;
        applyLikeImage(imagePaths[valueToSet]);
        saveLikeImageInfo(valueToSet);
        if (valueToSet == 0)
            valueToSet = -1;
        LikeShareView(valueToSet, 0, 0);
    }

}

function applyLikeImage(imagePath) {
    document.getElementById("likesImage").src = imagePath;
}

function saveLikeImageInfo(valueToSet) {
    localStorage.setItem(itemData.id + itemData.name + "Likes", valueToSet);
}

function ViewMedia() {
    LikeShareView(0, 0, 1);
}

function ShareMedia() {
    LikeShareView(0, 1, 0);
}

function LikeShareView(likesToAdd, sharesToAdd, viewsToAdd) {
    // If nothing then set it to 0 or 1
    itemData.views = itemData.views + viewsToAdd;
    itemData.likes = itemData.likes + likesToAdd;
    itemData.shares = itemData.shares + sharesToAdd;

    // Save the entire data (including your updates) back to the JSON file
    saveItemData();
}

export { ViewMedia, setLikeImage,addLikeShareEvents };

