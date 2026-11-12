
const TOTAL_SPACES = 100;
let occupiedSpaces = 64;

const occupiedElement = document.getElementById("occupied-spaces");
const availableElement = document.getElementById("available-spaces");
const percentElement = document.getElementById("occupancy-percent");
const progressBar = document.getElementById("occupancy-bar");
const alertElement = document.getElementById("parking-alert");

const entryButton = document.getElementById("entry-btn");
const exitButton = document.getElementById("exit-btn");

// Update parking statistics
function updateDashboard() {
    const availableSpaces = TOTAL_SPACES - occupiedSpaces;
    const occupancyPercent = (occupiedSpaces / TOTAL_SPACES) * 100;

    occupiedElement.textContent = occupiedSpaces;
    availableElement.textContent = availableSpaces;
    percentElement.textContent = `${occupancyPercent}%`;
    progressBar.style.width = `${occupancyPercent}%`;

    if (occupiedSpaces === TOTAL_SPACES) {
        alertElement.textContent = "החניון מלא! לא ניתן להכניס רכבים נוספים.";
        alertElement.classList.add("full");
    } else if (occupiedSpaces >= 80) {
        alertElement.textContent = "שימו לב: החניון כמעט מלא!";
        alertElement.classList.remove("full");
    } else {
        alertElement.textContent = "החניון פעיל ויש מקומות פנויים.";
        alertElement.classList.remove("full");
    }

    entryButton.disabled = occupiedSpaces === TOTAL_SPACES;
    exitButton.disabled = occupiedSpaces === 0;
}

// Simulate vehicle entry
entryButton.addEventListener("click", function () {
    if (occupiedSpaces < TOTAL_SPACES) {
        occupiedSpaces++;
        updateDashboard();
    }
});

// Simulate vehicle exit
exitButton.addEventListener("click", function () {
    if (occupiedSpaces > 0) {
        occupiedSpaces--;
        updateDashboard();
    }
});

// Load images from Apache
async function loadVehicleImages() {
    try {
        const response = await fetch("/images-list/", {
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Failed to load images");
        }

        const html = await response.text();
        const parser = new DOMParser();
        const documentHTML = parser.parseFromString(html, "text/html");

        const imageFiles = Array.from(documentHTML.querySelectorAll("a"))
            .map(link => {
                const pathname = new URL(link.href, window.location.origin).pathname;
                return decodeURIComponent(pathname.split("/").pop());
            })
            .filter(name => /\.(jpg|jpeg|png|webp|gif)$/i.test(name))
            .sort();

        const vehicleGrid = document.querySelector(".vehicle-grid");
        const vehicleCount = document.querySelector(".vehicle-count");

        vehicleGrid.replaceChildren();

        imageFiles.forEach((filename, index) => {
            const card = document.createElement("article");
            card.className = "vehicle-card";

            const image = document.createElement("img");
            image.src = `/images/${encodeURIComponent(filename)}`;
            image.alt = `תמונת רכב ${index + 1}`;

            const info = document.createElement("div");
            info.className = "vehicle-info";

            const label = document.createElement("span");
            label.className = "vehicle-label";
            label.textContent = `תמונה ${index + 1}`;

            const title = document.createElement("h3");
            title.textContent = filename;

            const status = document.createElement("span");
            status.className = "status";
            status.textContent = "מאוחסן בשרת";

            info.append(label, title, status);
            card.append(image, info);
            vehicleGrid.appendChild(card);
        });

        vehicleCount.textContent = `${imageFiles.length} תמונות`;

    } catch (error) {
        console.error("Error loading vehicle images:", error);
    }
}

// Initial load and automatic refresh every 3 seconds
updateDashboard();
loadVehicleImages();
setInterval(loadVehicleImages, 3000);
