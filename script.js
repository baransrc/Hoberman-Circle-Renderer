const $edge_count = document.querySelector(".container__settings__options__field__edge-count");
const $radius = document.querySelector(".container__settings__options__field__radius");
const $openness = document.querySelector(".container__settings__options__field__openness");

<script src="hobermanClasses.js"><script/>

function SetupHoberman(edgeCount, radius)
{
    var offset = (360/edgeCount) *2;
    var alpha = 0;

    for(int i = 0; i < edgeCount; i++)
    {
        var posx = radius * cos(alpha);
        var posy = radius * sin(alpha);

        alpha = alpha + offset;

        var PointB = (posx, posy);

        // var edge_b = 2 * Math.sin(offset/2) * radius;
        // var edge_c = Math.sqrt(radius * ( 1 - 2 * Math.sin(offset/2)));
        // var edge_h = (edge_b * edge_c) / radius;
        // var edge_p = Math.sqrt(pow(edge_c,2) - pow(edge_h,2));
        // var edge_k = pow(edge_h,2)/ edge_p;

        var PointA = Point(posx * Math.sin(alpha/2), posy * Math.cos(alpha/2));
    }
}

function clearCanvas(context, canvas)
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
}

function draw()
{
    var canvas = document.getElement('circle');
    var radius = document.getElementById('myRange').value;
    if (canvas.getContext)
    {
        var ctx = canvas.getContext('2d');
        clearCanvas(ctx, canvas);
        var X = canvas.width / 2;
        var Y = canvas.height / 2;
        var R = radius;
        ctx.beginPath();
        ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#FF0000';
        ctx.stroke();
    }
}
