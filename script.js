const $edge_count = document.querySelector(".container__settings__options__field__edge-count");
const $radius = document.querySelector(".container__settings__options__field__radius");
const $openness = document.querySelector(".container__settings__options__field__openness");
const $canvas = document.querySelector(".container__canvas");

function OnEdgeCountOrRadiusChanged(event)
{
    var input = event.target.value;

    if (isNaN(input)) event.target.value = 5;
    if (event.target.value <= 0) event.target.value = 1;

    var edgeCount = $edge_count.value;
    var radius = $radius.value;

    console.log(edgeCount + "  " + radius); // Comment-out if needed.
    
    // Use edgeCount and radius
    // Setup Hoberman Environment
    // Draw Hoberman
}

function OnOpennessChanged(event)
{
    var openness = event.target.value / 100;

    // Calculate distances to origin for each point
    // Multiply distance of each point with openness and take that value, say travelDistance
    // For each point call MoveToPoint with parameters origin and travelDistance

    // Then, draw Hoberman.
}

// Add Event Listeners:
$edge_count.addEventListener('input', OnEdgeCountOrRadiusChanged);
$radius.addEventListener('input', OnEdgeCountOrRadiusChanged);
$openness.addEventListener('input', OnOpennessChanged);