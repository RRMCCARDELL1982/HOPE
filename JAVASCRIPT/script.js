// JavaScript code
document.addEventListener("DOMContentLoaded", function() {
    // Check if the vendButton element exists
    const vendButton = document.getElementById("vendButton");
    if (vendButton) {
        // Add event listener only if vendButton exists
        vendButton.addEventListener("click", function() {
            // Navigate to a new page
            window.location.href = "VEND_WAIT_PAGE.html"; // Change "VEND_WAIT_PAGE.html" to the URL of the new page

            // Make an HTTP request to your Azure Function when the button clicked
            fetch('https://groundzeromv.azurewebsites.net', {
                method: 'POST',
                body: JSON.stringify({ /* Add any data you want to send to the function */ }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Display success message to the user
                    console.log('Vending machine action triggered successfully!');
                } else {
                    // Display error message to the user
                    console.error('Error triggering vending machine action:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error triggering vending machine action:', error);
            });
        });
    } else {
        console.error("vendButton element not found");
    }
});

// Define constants for communication
const ADDR = 0xFF;
const FRAME_NUMBER = 0x00;
const HEADER = 0x55; // Assuming this is the header for the vending machine
const CMD_START_VEND = 0x41; // Command to start vending
const DATA_LENGTH = 0x02; // Data length for the start vending command
const COIN_LANE = 0x01; // Example coin lane
const DELIVERY_QUANTITY = 0x01; // Example delivery quantity

// Function to send the vending command
function startVending() {
    // Construct the data frame
    const dataFrame = [
        ADDR,
        FRAME_NUMBER,
        HEADER,
        CMD_START_VEND,
        DATA_LENGTH,
        COIN_LANE,
        DELIVERY_QUANTITY
    ];

    // Calculate the checksum
    const checksum = calculateChecksum(dataFrame);

    // Send the data frame over UART
    // You would need to implement the UART communication
    sendOverUART(dataFrame, checksum);
}

// Function to calculate the checksum
function calculateChecksum(dataFrame) {
    let sum = 0;
    for (let i = 0; i < dataFrame.length; i++) {
        sum += dataFrame[i];
    }
    return sum & 0xFF; // Take only the lower 8 bits
}

// Function to send data over UART
function sendOverUART(dataFrame, checksum) {
    // Here you would need to implement the logic to send data over UART
    // You might use a library or interface provided by your environment
    console.log("Sending data over UART:", dataFrame, checksum);
    // Example: uart.sendData(dataFrame, checksum);
}

// Example usage:
startVending();

// Function to send signal to the controller board
function sendSignalToController() {
    // Construct the data frame
    const dataFrame = [
        ADDR,
        FRAME_NUMBER,
        HEADER,
        CMD_START_VEND,
        DATA_LENGTH,
        COIN_LANE,
        DELIVERY_QUANTITY
    ];

    // Calculate the checksum
    const checksum = calculateChecksum(dataFrame);

    // Send the data frame over AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "backend_endpoint"); // Replace "backend_endpoint" with the URL of your backend server
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Signal sent successfully");
            } else {
                console.error("Error sending signal:", xhr.status);
            }
        }
    };
    xhr.send(JSON.stringify({ dataFrame: dataFrame, checksum: checksum }));
}

// Example usage:
document.getElementById("vendButton").addEventListener("click", function() {
    // Send signal to the controller board when the vendButton is clicked
    sendSignalToController();
});
// Function to redirect to another page after a delay
function redirectToNextPageAfterDelay() {
    // Set a timeout to redirect after 30 seconds (30000 milliseconds)
    setTimeout(function() {
        window.location.href = "index.html"; // Change "NEXT_PAGE.html" to the URL of the next page
    }, 30000); // Adjust the delay time as needed
}

// Call the function to initiate the redirection
redirectToNextPageAfterDelay();

