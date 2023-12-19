// Add JavaScript functionality here if needed

/*

To store data to google sheet
1. Go to google sheet->sign in -> Develop new sheetand rename it.
2. Add fields in it. e.g username and feeback in my case
3. Set the permissions to anyone with line->Editor or viewer.
4. Go to sheedb.api open first link->Create free api->Create new api
4.2. Copy the url of your spread sheet like https://docs.google.com/spreadsheets/d/135ump_ulDMlQR7sxidAzR9KJ0XHYF5BX44Gf-lQtRlE/edit#gid=0
 paste it and create new api
4.3. You may need to authenticate or login using a google account.
4.4 Then copy the api link to clip board 
5. Open html file and paste the link to your form as <form action="https://sheetdb.io/api/v1/hatfrnrxco64q" method="post" >
6. Now add following code to your js file to submit your data to sheet (Line 32 to 60)
  

*/

const notificationShowButton= document.getElementById("notification-show-link");
const notificationCloseButton=document.getElementById("close-notification-popup");


// Example: Submit feedback form
// Open the feedback pop-up when the "Feedback" link is clicked
document.getElementById('feedback-link').addEventListener('click', function () {
    document.getElementById('feedback-popup').style.display = 'block';
});

// Close the feedback pop-up when the close button is clicked
document.getElementById('close-feedback-popup').addEventListener('click', function () {
    document.getElementById('feedback-popup').style.display = 'none';
});

/////////// -----------------------------------------------------------------------------------
////       this section will handle that when you click on contact button in menu bar you will 
//////////////be scrolled down to contacts section 

function scrollToContactSection(elementLink,elementSection) {
// Get a reference to the "Contact/feedback" link
var contactLink = document.getElementById(elementLink);

// Get a reference to the contact/feedback section
var contactSection = document.getElementById(elementSection);

// Add a click event listener to the "Contact" link
contactLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Scroll smoothly to the contact section
    contactSection.scrollIntoView({
        behavior: 'smooth'
    });
});

}
	
	// Call the function when the page loads 
window.onload = function() {
    scrollToContactSection('contact-link','contact');
};


// or simply call it as it is 
// scrollToContactSection();

CheckIfNotificationShown();


//////////////// following code handles show and close of notifications block 

notificationShowButton.addEventListener('click',function()
{
         enableDisableNotificationWithOverlay('block');
}
);

notificationCloseButton.addEventListener('click',function()
{
    enableDisableNotificationWithOverlay('none');
}
);


function enableDisableNotificationWithOverlay(valueToSet){
    document.getElementById("notification-block").style.display=valueToSet;
    document.getElementById("screen-overlay").style.display=valueToSet;
}


function CheckIfNotificationShown(){
    if(sessionStorage.getItem("NotificationInfo")=="shown"){
                   enableDisableNotificationWithOverlay('none');
    }
    else{
        enableDisableNotificationWithOverlay('block');
        sessionStorage.setItem("NotificationInfo","shown");
    }
}


///////////////// following ets data deom sheet db /////
const apiUrl = 'https://sheetdb.io/api/v1/oh854skblnjmn';

// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Get the table body element to insert data
        const tableBody = document.querySelector('#notification-table tbody');

        // Clear existing data
        tableBody.innerHTML = '';

        // Iterate through the data and create table rows
        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.Title}</td>
                 <td>${entry.Notification}</td>
            `;
            tableBody.appendChild(row);
            
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the fetchData function to load data when the page loads
//window.addEventListener('load', fetchData);



