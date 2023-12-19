// document.getElementById('whatsappShareButton').addEventListener('click', function() {
//     // Share via WhatsApp
//     const urlToShare = window.location.href;
//     const shareMessage = 'Check out this link: ' + urlToShare;
//     const whatsappLink = 'whatsapp://send?text=' + encodeURIComponent(shareMessage);
//     window.open(whatsappLink, '_blank');
// });

// document.getElementById('gmailShareButton').addEventListener('click', function() {
//     // Share via Gmail
//     const urlToShare = window.location.href;
//     const shareMessage = 'Check out this link: ' + urlToShare;
//     const gmailLink = 'https://mail.google.com/mail/?view=cm&fs=1&to=&su=Subject&body=' + encodeURIComponent(shareMessage);
//     window.open(gmailLink, '_blank');
// });

// document.getElementById('facebookShareButton').addEventListener('click', function() {
//     // Share via Facebook
//     const urlToShare = window.location.href;
//     const facebookLink = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(urlToShare);
//     window.open(facebookLink, '_blank');
// });

// document.getElementById('instagramShareButton').addEventListener('click', function() {
//     // Share via Instagram
//     // You can provide instructions to the user to share on Instagram manually
//     alert('To share on Instagram, open the Instagram app and paste the link.');
// });

// document.getElementById('twitterShareButton').addEventListener('click', function() {
//     // Share via Twitter
//     const urlToShare = window.location.href;
//     const twitterLink = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(urlToShare);
//     window.open(twitterLink, '_blank');
// });

// document.getElementById('linkedinShareButton').addEventListener('click', function() {
//     // Share via Twitter
//     const urlToShare = window.location.href;
//     const linkedinLink = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(urlToShare);
//     window.open(linkedinLink, '_blank');
// });


// document.getElementById('copyLinkButton').addEventListener('click', function() {
//     // Copy the link to the clipboard
//     const urlToShare = window.location.href;
//     const dummyInput = document.createElement('input');
//     document.body.appendChild(dummyInput);
//     dummyInput.setAttribute('value', urlToShare);
//     dummyInput.select();
//     document.execCommand('copy');
//     document.body.removeChild(dummyInput);
//     alert('Link copied to clipboard');
// });

// Add click event listeners for each sharing button
const sharingButtons = [
    'whatsappShareButton', 'gmailShareButton', 'facebookShareButton',
    'instagramShareButton', 'twitterShareButton', 'linkedinShareButton', 'copyLinkButton'
];

sharingButtons.forEach(buttonId => {
    document.getElementById(buttonId).addEventListener('click', function () {
        const urlToShare = window.location.href;
        const shareMessage = 'Check out this link: ' + urlToShare;
        let shareLink = '';

        if (buttonId === 'whatsappShareButton') {
            shareLink = 'whatsapp://send?text=' + encodeURIComponent(shareMessage);
            // shareLink = 'whatsapp://send?text=' + encodeURIComponent(urlToShare);
        } else if (buttonId === 'gmailShareButton') {
            shareLink = 'https://mail.google.com/mail/?view=cm&fs=1&to=&su=Subject&body=' + encodeURIComponent(shareMessage);
            // shareLink = 'mailto:?subject=Check this out&body=' + encodeURIComponent(urlToShare);
        } else if (buttonId === 'facebookShareButton') {
            shareLink = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(urlToShare);
           
        } else if (buttonId === 'instagramShareButton') {
            // Replace with your Instagram share link
            alert('To share on Instagram, open the Instagram app and paste the link.');
            // shareLink = 'https://www.instagram.com/';
        } else if (buttonId === 'twitterShareButton') {
            shareLink = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(urlToShare);
        } else if (buttonId === 'linkedinShareButton') {
            shareLink = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(urlToShare);
        } else if (buttonId === 'copyLinkButton') {
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = urlToShare;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert('Link copied to clipboard');
        }

        if (shareLink) {
            window.open(shareLink, '_blank');
        }

       increaseShares();
    });
});


function increaseShares(){
 
    window.parent.postMessage('addShare', '*');
}
