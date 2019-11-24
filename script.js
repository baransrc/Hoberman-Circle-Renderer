const $edge_count = document.querySelector(".container__settings__options__field__edge-count");
const $radius = document.querySelector(".container__settings__options__field__radius");
const $closedness = document.querySelector(".container__settings__options__field__closedness");
const $canvas = document.querySelector(".container__canvas");
const $closedness_label = document.querySelector(".container__settings__options__field__closedness-label");

var hobermanGroupList;
var origin;

function ChangeFields()
{
    if (isNaN($closedness.value)) $closedness.value = 0;
    if ($closedness.value < 0) $closedness.value = 0;

    $closedness_label.innerHTML = "CLOSEDNESS - " + $closedness.value + "%";

    if (isNaN($edge_count.value)) $edge_count.value = 3;
    if ($edge_count.value <= 0) $edge_count.value = 1;

    $edge_count.value = Math.round($edge_count.value); 

    if (isNaN($radius.value)) $radius.value = 1;
    if ($radius.value <= 0) $radius.value = 1;
}

function SetupAndDrawHobermanCircle()
{
    // Get inputs from fields:
    var edgeCount = $edge_count.value;
    var radius = $radius.value;
    var closedness = $closedness.value / 100;
    
    // Form and Draw Hoberman Circle:
    hobermanGroupList = FormHobermanCircle(edgeCount, radius, closedness, $canvas);
    DrawHobermanCircle(hobermanGroupList, $canvas);
}

function OnInputFieldsChanged(event)
{
    ChangeFields();
    SetupAndDrawHobermanCircle();
}

function Initialize()
{
    $edge_count.value = 3;
    $radius.value = 250;
    $closedness.value = 0;

    ChangeFields();
    SetupAndDrawHobermanCircle();
}

// Add Event Listeners:
$edge_count.addEventListener('input', OnInputFieldsChanged);
$radius.addEventListener('input', OnInputFieldsChanged);
$closedness.addEventListener('input', OnInputFieldsChanged);

// Function Calls:
Initialize();