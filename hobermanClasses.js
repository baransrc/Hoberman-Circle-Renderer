class Point
{
    constructor(posx, posy)
    {
        this.posx = posx;
        this.posy = posy;
    }

    getPosx()
    {
        return this.posx;
    }

    getPosy()
    {
        return this.posy;
    }

    MoveToPosition(origin, travelDistance)
    {
        // Calculating Distance:
        var distanceX = origin.posx - this.posx;
        var distanceY = origin.posy - this.posy;
        var distance = Math.sqrt((distx*distx) + (disty*disty));

        // Calculating Angle:
        var angleRadians = Math.atan2(disty, distx);
        var angleDegrees = Math.atan2(disty, distx) * 180 / Math.PI; // Not used for now, may be needed in the future.

        // Calculating New Distance:
        var newDistance = distance - travelDistance;
        if (newDistance < 0) newDistance = 0;

        // Applying New X and Y Positions:
        this.posx = newDistance * Math.cos(angleRadians);
        this.posy = newDistance * Math.sin(angleRadians);
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

    var hobermanPointsList = [];

    for(var i = 0; i < edgeCount; i++)
    {
        var hobermanPoints = new HobermanGroup;
        var posx = radius * Math.cos(alpha);
        var posy = radius * Math.sin(alpha);

        alpha = alpha + offset;

        var pointB = new Point(posx, posy);

        // var edge_b = 2 * Math.sin(offset/2) * radius;
        // var edge_c = Math.sqrt(radius * ( 1 - 2 * Math.sin(offset/2)));
        // var edge_h = (edge_b * edge_c) / radius;
        // var edge_p = Math.sqrt(pow(edge_c,2) - pow(edge_h,2));
        // var edge_k = pow(edge_h,2)/ edge_p;

        var pointA = new Point(posx * Math.sin(alpha/2), posy * Math.cos(alpha/2));

        hobermanPoints.PointA = pointA;
        hobermanPoints.PointB = pointB;
        hobermanPointsList.push(hobermanPoints);
    }
    var prev = hobermanPointsList[hobermanPointsList.length - 1];
    for(var i = 0; i < hobermanPointsList.length; i++)
    {
        hobermanPointsList[i].PointC = prev.PointA;
        if(i == hobermanPointsList.length){
            prev = hobermanPointsList[0];
        }
        else{
            prev = hobermanPointsList[i];
        }
    }
    return hobermanPointsList;
}

function clearCanvas(context, canvas)
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
}


while(true)
{
    InitAndStart();
}

function InitAndStart()
{
    // var edgeCount = document.getElementByClassName('container__settings__options__field__edge-count').value;
    // var radius = document.getElementByClassName('container__settings__options__field__radius').value;
    var edgeCount  = 8;
    var radius = 50;
    var hobermanPointsList = SetupHoberman(edgeCount, radius);
    renderLoop(hobermanPointsList);
}

function renderLoop(hobermanPointsList)
{
    draw(hobermanPointsList);
    // update();
}

function draw(hobermanPointsList)
{
    // var canvas = document.getElementsByClassName('container__canvas');
    const canvas = document.querySelector(".container__canvas");
    if (canvas.getContext)
    {
        // var ctx = canvas.getContext('2d');
        // clearCanvas(ctx, canvas);
        // var X = canvas.width / 2;
        // var Y = canvas.height / 2;
        // var R = 50;
        // ctx.beginPath();
        // ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
        // ctx.lineWidth = 3;
        // ctx.strokeStyle = '#FF0000';
        // ctx.stroke();
        for(var i = 0;hobermanPointsList.length; i++)
        {
            var ctx = canvas.getContext('2d');
            clearCanvas(ctx, canvas);
            ctx.beginPath();
            ctx.lineTo(hobermanPointsList.PointA.getPosx(), hobermanPointsList.PointA.getPosy());
            ctx.moveTo(hobermanPointsList.PointB.getPosx(), hobermanPointsList.PointB.getPosy());

            ctx.moveTo(hobermanPointsList.PointB.getPosx(), hobermanPointsList.PointB.getPosy());
            ctx.lineTo(hobermanPointsList.PointC.getPosx(), hobermanPointsList.PointC.getPosy());
            ctx.strokeStyle = '#FF0000';
            ctx.stroke();
        }
    }
}
