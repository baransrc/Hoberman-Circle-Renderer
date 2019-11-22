class Point
{
    constructor(posx, posy)
    {
        this.x = posx;
        this.y = posy;
    }

    MoveToPosition(origin, travelDistance)
    {
        // Calculating Distance:
        var distanceX = origin.posx - this.x;
        var distanceY = origin.posy - this.y;
        var distance = Math.sqrt((distx*distx) + (disty*disty));

        // Calculating Angle:
        var angleRadians = Math.atan2(disty, distx);
        var angleDegrees = Math.atan2(disty, distx) * 180 / Math.PI; // Not used for now, may be needed in the future.

        // Calculating New Distance:
        var newDistance = distance - travelDistance;
        if (newDistance < 0) newDistance = 0;

        // Applying New X and Y Positions:
        this.x = newDistance * Math.cos(angleRadians);
        this.y = newDistance * Math.sin(angleRadians);
    }
}

class HobermanGroup
{
    constructor(Mother, ChildA, ChildC)
    {
        this.Mother = Mother;
        this.ChildA = ChildA;
        this.ChildC = ChildC;
    }

    DrawLines(context)
    {
        context.beginPath();
        context.moveTo(this.Mother.posx, this.Mother.posy);
        context.lineTo(this.ChildA.posx, this.ChildA.posy);

        context.moveTo(this.Mother.posx, this.Mother.posy);
        context.lineTo(this.ChildC.posx, this.ChildC.posy);

        context.strokeStyle = '#FF0000';
        context.stroke();
    }
}

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