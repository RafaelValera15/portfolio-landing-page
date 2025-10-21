const form = document.getElementById("suggestionForm");
const snackInput = document.getElementById("snackInput");
const locationSelect = document.getElementById("locationSelect");
const suggestionsList = document.getElementById("suggestionsList");
const message = document.getElementById("message");

let suggestions = [];

// Load suggestions from local storage
const savedSuggestions = localStorage.getItem("suggestions");
if (savedSuggestions) {
  suggestions = JSON.parse(savedSuggestions);
  renderSuggestions();
}

// Handle form submit
form.addEventListener("submit", function(event) {
  event.preventDefault();
  const snack = snackInput.value.trim();
  const location = locationSelect.value; //get selected location

  if (snack && location) {
    // prevent duplicates per location
    const exists = suggestions.some(
      (s) => s.snack === snack && s.location === location
    );
    
    if (exists) {
      message.textContent = "Item already suggested!";
      message.className = "error";
    } else {
      suggestions.push( {snack, location} );
      localStorage.setItem("suggestions", JSON.stringify(suggestions)); //save to local storage
      snackInput.value = "";
      locationSelect.value = ""; //reset location dropdown
      renderSuggestions();

      message.textContent = "Snack added successfully!";
      message.className = "success";
    }
  }
});

// Render suggestions
function renderSuggestions() {
  suggestionsList.innerHTML = suggestions
    .map(s => `<p>${s.snack} (${s.location})</p>`)
    .join("");
}
