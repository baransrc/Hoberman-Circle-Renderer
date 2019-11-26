const $settings = document.querySelector(".container__settings");
const $edge_count = document.querySelector(".container__settings__options__field__edge-count");
const $radius = document.querySelector(".container__settings__options__field__radius");
const $closedness = document.querySelector(".container__settings__options__field__closedness");
const $canvas = document.querySelector(".container__canvas-container__canvas");
const $closedness_label = document.querySelector(".container__settings__options__field__closedness-label");
const $output = document.querySelector(".container__canvas-container__output");
const $output_text = document.querySelector(".container__canvas-container__output__text"); 

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

function AdjustCanvasSize()
{
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var width = windowWidth - $settings.clientWidth;
    var height = windowHeight - $output.clientHeight;

    $canvas.width = (width > 0) ? width : 0;
    $canvas.height = (height > 0) ? height : 0;

    console.log($canvas.width, $canvas.height);
}

function PrintOutput()
{
    var currentRadius = Number(CURRENT_RADIUS).toFixed(4);
    var distanceAB = Number(DISTANCE_AB).toFixed(4);
    var distanceCB = Number(DISTANCE_CB).toFixed(4);

    var outputString = "CURRENT RADIUS - " + currentRadius + "&#10;" + "DISTANCE AB - " + distanceAB + "&#10;" + "DISTANCE CB - " + distanceCB;

    $output_text.innerHTML = outputString;
}

function OnWindowResize()
{
    AdjustCanvasSize();
    Start();
}

function OnInputFieldsChanged(event)
{
    Start();
}

function Start()
{
    ChangeFields();
    SetupAndDrawHobermanCircle();
    PrintOutput();
}

function Initialize(edgeCount = 3, radius = 250, closedness = 0)
{
    $edge_count.value = edgeCount;
    $radius.value = radius;
    $closedness.value = closedness;

    AdjustCanvasSize(window);
    Start();
}

function OnLoad()
{
    var settings = document.querySelector(".container__settings");
    var output = document.querySelector(".container__canvas-container__output");
    var canvas = document.querySelector(".container__canvas-container__canvas");

    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var width = windowWidth - settings.clientWidth;
    var height = windowHeight - output.clientHeight;

    canvas.width = (width > 0) ? width : 0;
    canvas.height = (height > 0) ? height : 0;

    Start();
}

// Add Event Listeners:
$edge_count.addEventListener('input', OnInputFieldsChanged);
$radius.addEventListener('input', OnInputFieldsChanged);
$closedness.addEventListener('input', OnInputFieldsChanged);
window.addEventListener('resize', OnWindowResize);
window.addEventListener('load', OnLoad);

// Function Calls:
Initialize(edgeCount = 8);


