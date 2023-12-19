document.addEventListener('DOMContentLoaded', function () {
    // Handle the "More" button click to add more media fields
    document.getElementById('addMediaField').addEventListener('click', function () {
        const mediaFields = document.getElementById('mediaFields');
        const newMediaField = document.createElement('input');
        newMediaField.type = 'text';
        newMediaField.name = 'tutorialMedia[]';
        newMediaField.required = true;
        mediaFields.appendChild(newMediaField);
    });

    // Handle the change in tutorial type to update category options
    document.getElementById('tutorialType').addEventListener('change', function () {
        const selectedType = this.value;
        const categorySelect = document.getElementById('tutorialCategory');
        
        // Clear existing options
        while (categorySelect.firstChild) {
            categorySelect.removeChild(categorySelect.firstChild);
        }

        // Add options based on the selected type
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = 'Select a category';
        defaultOption.disabled = true;
        defaultOption.selected = true;
        categorySelect.appendChild(defaultOption);

        if (selectedType === 'app') {
            const appCategories = ['Category A', 'Category B', 'Category C'];
            appCategories.forEach(function (category) {
                const option = document.createElement('option');
                option.value = category;
                option.text = category;
                categorySelect.appendChild(option);
            });
        } else if (selectedType === 'game') {
            const gameCategories = ['Category X', 'Category Y', 'Category Z'];
            gameCategories.forEach(function (category) {
                const option = document.createElement('option');
                option.value = category;
                option.text = category;
                categorySelect.appendChild(option);
            });
        } else if (selectedType === 'tutorial') {
            const tutorialCategories = ['Tutorial 1', 'Tutorial 2', 'Tutorial 3'];
            tutorialCategories.forEach(function (category) {
                const option = document.createElement('option');
                option.value = category;
                option.text = category;
                categorySelect.appendChild(option);
            });
        }
    });
});



const imageUploadInput = document.getElementById('imageUpload');
const uploadedImage = document.getElementById('uploadedImage');
// Define a variable to hold the uploaded image data
let uploadedImageData = null;

// Function to handle image upload
const handleImageUpload = (file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
        uploadedImageData = e.target.result;
    };

    reader.readAsDataURL(file);
};


imageUploadInput.addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();

    if (file) {
        handleImageUpload(file);
    }

    reader.onload = function (e) {
        uploadedImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
});


////////////////// this code handles how to upload image in a folder on your server

const titleInput = document.getElementById('title');
// Add similar references for other form fields

const cancelButton = document.getElementById('cancelButton');
const saveButton = document.getElementById('saveButton');

// Define the action when the "Cancel" button is clicked
cancelButton.addEventListener('click', function () {
    // Clear the form fields and the uploaded image
    titleInput.value = '';
    // Clear other form fields similarly
    uploadedImage.src = '';
});

// Define the action when the "Save" button is clicked
saveButton.addEventListener('click', function () {
    // Here, you need to send the uploaded image to your server
    const file = imageUploadInput.files[0];
    if (file) {

        // Get the file name and extension
        const fileName = file.name;
      

        // Create a new FormData object
        const formData = new FormData();

        formData.append('image', file);

        

        // Use the Fetch API to send the image to your server
        fetch('http://localhost:5500/upload/Images/Uploads/'+fileName, {
            method: 'POST',
            body: formData,
            headers: {
                //   'Content-Type':'image/jpeg'  // not working
                // 'Content-Type':'application/vnd.openxmlformats-officedocument.wordprocessingml.document'// for docx
                //  'Content-Type':'image/png' // not working
                  'Content-Type': 'application/pdf' //for pdf files (working)
            }
        
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // The image was saved successfully on the server
                    // You can handle further actions here
                } else {
                    // Handle the case where image upload failed
                }
            })
            .catch(error => {
                // Handle network or other errors
            });
    }
});
