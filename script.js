// 1. FIND THE HTML ELEMENTS FIRST
const bobaButton = document.getElementById("boba-btn");
const scoreDisplay = document.getElementById("score");
const buyAutoButton = document.getElementById("buy-auto-btn");
const autoDisplay = document.getElementById("auto-count");

// NEW: Find the Factory elements
const buyFactoryButton = document.getElementById("buy-factory-btn");
const factoryDisplay = document.getElementById("factory-count");

// 2. LOAD SAVED DATA (Or use defaults if it's the first time playing)
let bobaCount = parseInt(localStorage.getItem("savedBoba")) || 0;
let autoBrewers = parseInt(localStorage.getItem("savedBrewers")) || 0;
let autoCost = parseInt(localStorage.getItem("savedCost")) || 10;

// NEW: Load Factory data
let factories = parseInt(localStorage.getItem("savedFactories")) || 0;
let factoryCost = parseInt(localStorage.getItem("savedFactoryCost")) || 500;

// 3. THE FIX: FORCE THE SCREEN TO UPDATE IMMEDIATELY ON LOAD
scoreDisplay.textContent = bobaCount;
autoDisplay.textContent = autoBrewers;
buyAutoButton.textContent = "Buy Auto-Brewer (Cost: " + autoCost + " Boba)";

// NEW: Force Factory screen update
factoryDisplay.textContent = factories;
buyFactoryButton.textContent = "Buy Boba Factory (Cost: " + factoryCost + " Boba)";

// 4. MAIN CLICKING MECHANIC
// FIX: Added 'event' inside the parentheses here!
bobaButton.addEventListener("click", function (event) {
    // 1. Adds Score 
    bobaCount = bobaCount + 1;
    scoreDisplay.textContent = bobaCount;

    // Brand new <span> tag 
    const floatText = document.createElement("span");

    /* Add CSS clas to it */
    floatText.classList.add("floating-number");
    floatText.textContent = "+1";

    // Position exactly where mouse is
    floatText.style.left = event.clientX + "px";
    floatText.style.top = event.clientY + "px";

    // Puts it into the HTML body
    document.body.appendChild(floatText);

    // Sets a timer to delete after 1 second
    setTimeout(function () {
        floatText.remove();
    }, 1000);
});

// 5. BUYING UPGRADE 1 (Auto-Brewer)
buyAutoButton.addEventListener("click", function () {
    if (bobaCount >= autoCost) {
        bobaCount = bobaCount - autoCost;
        autoBrewers = autoBrewers + 1;
        autoCost = Math.floor(autoCost * 1.5);

        scoreDisplay.textContent = bobaCount;
        autoDisplay.textContent = autoBrewers;
        buyAutoButton.textContent = "Buy Auto-Brewer (Cost: " + autoCost + " Boba)";
    } else {
        alert("Not enough Boba! You need " + autoCost + " to buy an Auto-Brewer.");
    }
});

// 6. BUYING UPGRADE 2 (The Factory)
buyFactoryButton.addEventListener("click", function () {
    if (bobaCount >= factoryCost) {
        bobaCount = bobaCount - factoryCost;
        factories = factories + 1;
        factoryCost = Math.floor(factoryCost * 1.5);

        scoreDisplay.textContent = bobaCount;
        factoryDisplay.textContent = factories;
        buyFactoryButton.textContent = "Buy Boba Factory (Cost: " + factoryCost + " Boba)";
    } else {
        alert("Not enough Boba! You need " + factoryCost + " to buy a Factory.");
    }
});

// 7. PASSIVE INCOME & AUTO-SAVE LOOP (Runs every 1 second)
setInterval(function () {
    // Add passive income (Brewers give 1, Factories give 10)
    bobaCount = bobaCount + autoBrewers + (factories * 10);
    scoreDisplay.textContent = bobaCount;

    // Save everything to browser vault
    localStorage.setItem("savedBoba", bobaCount);
    localStorage.setItem("savedBrewers", autoBrewers);
    localStorage.setItem("savedCost", autoCost);
    localStorage.setItem("savedFactories", factories);
    localStorage.setItem("savedFactoryCost", factoryCost);
}, 1000);