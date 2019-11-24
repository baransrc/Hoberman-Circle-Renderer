const $edge_count = document.querySelector(".container__settings__options__field__edge-count");
const $radius = document.querySelector(".container__settings__options__field__radius");
const $closedness = document.querySelector(".container__settings__options__field__closedness");
const $canvas = document.querySelector(".container__canvas");

var hobermanGroupList;
var origin;

function CheckFields()
{
    if (isNaN($closedness.value)) $closedness.value = 1;
    if ($closedness.value <= 0) $closedness.value = 1;

    if (isNaN($edge_count.value)) $edge_count.value = 3;
    if ($edge_count.value <= 0) $edge_count.value = 1;

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
    CheckFields();
    SetupAndDrawHobermanCircle();
}

function Initialize()
{
    $edge_count.value = 3;
    $radius.value = 250;
    $closedness.value = 0;

    SetupAndDrawHobermanCircle();
}

// Add Event Listeners:
$edge_count.addEventListener('input', OnInputFieldsChanged);
$radius.addEventListener('input', OnInputFieldsChanged);
$closedness.addEventListener('input', OnInputFieldsChanged);

// Function Calls:
Initialize();