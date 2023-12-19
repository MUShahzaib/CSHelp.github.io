async function fetchData(dataUrl) {

    try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok (Status: ${response.status})`);
        }
        var jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to save the entire data back to the JSON file
function saveDataToJSONFile(data) {

    const filePath = localStorage.getItem("FileWritePath");
    fetch(filePath, {
        method: 'POST', // Use POST to update data
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the updated data as JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON only if response is OK
        })
        .then(responseData => {
            console.log('Data received from server:', responseData);
            // Optionally, reload the questions or update the UI here
        })
        .catch(error => console.error('Error saving data:', error));
}


export { fetchData, saveDataToJSONFile };
