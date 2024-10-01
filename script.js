const destinations = [
    "Fast Food 3", "Fast Food 2", "Mall 2", "Church",
    "Police Station 2", "Mall 1", "Fast Food 1", "Police Station 1"
];
const locations = [95, 85, 78, 60, 50, 35, 16, 5];

function selectDestination(letter) {
    const destinationInput = document.getElementById('destination-letter');
    destinationInput.value = letter;
}

function findNearestDestination() {
    const userLocation = parseInt(document.getElementById('location').value);
    const destinationLetter = document.getElementById('destination-letter').value.toUpperCase();
    const resultElement = document.getElementById('result');

    if (isNaN(userLocation) || userLocation < 0 || userLocation > 100) {
        resultElement.textContent = "Invalid location entered. Please enter a number between 0 and 100.";
        return;
    }

    let choice;
    switch (destinationLetter) {
        case 'A':
            choice = 1;
            break;
        case 'B':
            choice = 2;
            break;
        case 'C':
            choice = 3;
            break;
        case 'D':
            choice = 4;
            break;
        default:
            resultElement.textContent = "Invalid destination letter entered. Please enter A, B, C, or D.";
            return;
    }

    let nearestDestinations = [];
    let nearestDistance = 101;

    for (let i = 0; i < destinations.length; i++) {
        if ((choice === 1 && destinations[i].includes("Police Station")) ||
            (choice === 2 && destinations[i].includes("Fast Food")) ||
            (choice === 3 && destinations[i].includes("Mall")) ||
            (choice === 4 && destinations[i].includes("Church"))) {

            const distance = Math.abs(locations[i] - userLocation);

            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestDestinations = [destinations[i]];
            } else if (distance === nearestDistance) {
                nearestDestinations.push(destinations[i]);
            }
        }
    }

    if (nearestDestinations.length > 0) {
        resultElement.innerHTML = `Nearest destination(s):<br>`;
        nearestDestinations.forEach(destination => {
            resultElement.innerHTML += `
                <div class="bg-white p-4 rounded-lg shadow-md mt-4 transition transform hover:scale-105">
                    <div class="flex items-center">
                        <svg class="h-6 w-6 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                        <span class="font-semibold">${destination}</span>
                    </div>
                    <div class="text-gray-600">${nearestDistance} km away</div>
                </div>`;
        });
    } else {
        resultElement.textContent = "No matching destination found.";
    }
}