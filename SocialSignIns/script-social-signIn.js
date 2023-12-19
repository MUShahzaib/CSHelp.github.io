// Initialize Google Sign-In
function renderButton() {
    gapi.signin2.render('g-signin2', {
        'scope': 'profile',
        'width': 300,
        'height': 50,
        'longtitle': true
    });
}

// Handle Google Sign-In callback
function onSignIn(googleUser) {
    // Get the user's Google profile information
    var profile = googleUser.getBasicProfile();
    console.log('Google ID: ' + profile.getId());
    console.log('Google Name: ' + profile.getName());
    console.log('Google Email: ' + profile.getEmail());

    // Handle the user's information appropriately for your website
}

// Initialize Facebook Login
// window.fbAsyncInit = function() {
//     FB.init({
//         appId: '{YOUR_FACEBOOK_APP_ID}',
//         cookie: true,
//         xfbml: true,
//         version: 'v10.0'
//     });
// };

// // Check Facebook Login status
// function checkLoginState() {
//     FB.getLoginStatus(function(response) {
//         if (response.status === 'connected') {
//             // Get the user's Facebook profile information
//             FB.api('/me?fields=id,name,email', function(response) {
//                 console.log('Facebook ID: ' + response.id);
//                 console.log('Facebook Name: ' + response.name);
//                 console.log('Facebook Email: ' + response.email);

//                 // Handle the user's information appropriately for your website
//             });
//         }
//     });
//}
