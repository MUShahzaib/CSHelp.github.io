
var wrongCount=0;
// Generate a random 5-character CAPTCHA
function generateCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz@#!%*^$()?/><';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        captcha += characters[randomIndex];
    }
    return captcha;
}

// Initialize CAPTCHA
function initCaptcha() {
    const captchaText = document.getElementById('captcha-text');
    const captcha = generateCaptcha();
    captchaText.textContent = captcha;
}

initCaptcha();

// Verify CAPTCHA
document.getElementById('verify-button').addEventListener('click', function() {
    const captchaText = document.getElementById('captcha-text').textContent;
    const captchaInput = document.getElementById('captcha-input').value;

    if (captchaText === captchaInput) {
        disableCaptcha();
        alert('CAPTCHA is correct!');     
        // add download file code here
    } else {

        document.getElementById('captcha-input').value = '';
        wrongCount++;
        if(wrongCount>=2){
            window.location.href="https://www.wrongCaptchaBot.com";
        }

        else  {
            alert('CAPTCHA is incorrect. Please try again. You are left with '+(2-wrongCount)+" chances");
            initCaptcha();
        }
    }
});

function disableCaptcha(){
 
    window.parent.postMessage('closeCaptcha', '*');
}
    

