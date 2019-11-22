class Point
{
    constructor(posx, posy)
    {
        this.posx = posx;
        this.posy = posy;
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
    var Ox = 100; // Origin X
    var Oy = 100; // Origin Y

    var offset = (360/edgeCount) * 2;
    var theta = offset;

    var hobermanGroupList = [];
    for(var i = 0; i < edgeCount; i++)
    {
        var Bposx = radius * Math.cos(theta/2);
        var Bposy = radius * Math.sin(theta/2);

        var mother = new Point(Bposx, Bposy);

        var alpha = radius * Math.cos(theta/2);
        var Aposx = Bposx * Math.cos(theta) + Ox;
        var Aposy = Bposy * Math.sin(theta) + Oy;

        var childa = new Point(Aposx, Aposy);

        var toRadians = Math.PI / 180;
        var Cposx = Ox + Bposx - Math.tan(45 * toRadians - (theta / 4));
        var Cposy = Oy;

        var childc = new Point(Cposx, Cposy);

        var hobermanGroup = new HobermanGroup(mother, childa, childc);

        hobermanGroupList.push(hobermanGroup);

        // theta = theta + offset;
    }
    return hobermanGroupList;
}

function clearCanvas(context, canvas)
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    var w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
}

InitAndStart();

function InitAndStart()
{
    // var edgeCount = document.getElementByClassName('container__settings__options__field__edge-count').value;
    // var radius = document.getElementByClassName('container__settings__options__field__radius').value;
    var edgeCount  = 8;
    var radius = 100;
    var hobermanGroupList = SetupHoberman(edgeCount, radius);
    renderLoop(hobermanGroupList);
}

function renderLoop(hobermanGroupList)
{
    draw(hobermanGroupList);
    // update();
}

function draw(hobermanGroupList)
{
    // debugger;
    const canvas = document.querySelector(".container__canvas");
    if (canvas.getContext)
    {
        var ctx = canvas.getContext('2d');
        clearCanvas(ctx, canvas);
        for(var i = 0; i < hobermanGroupList.length; i++)
        {
            hobermanGroupList[i].DrawLines(ctx);
        }
    }
}
