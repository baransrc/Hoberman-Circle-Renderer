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

    RotateAround(pivot, angle)
    {
        // Calculating sine and cosines:
        var angleSin = Math.sin(angle);
        var angleCos = Math.cos(angle);

        // Translating pivot to 0,0:
        this.posx = this.posx - pivot.posx;
        this.posy = this.posy - pivot.posy;

        // Rotating the point:
        var newX = this.posx * angleCos - this.posy * angleSin;
        var newY = this.posx * angleSin + this.posy * angleCos;
        
        // Translate point back to its pivot:
        this.posx = newX + pivot.posx;
        this.posy = newY + pivot.posy;
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
        // Begin Drawing:
        context.beginPath();

        // Draw Edge BA:
        context.moveTo(this.Mother.posx, this.Mother.posy);
        context.lineTo(this.ChildA.posx, this.ChildA.posy);

        // Draw Edge BC:
        context.moveTo(this.Mother.posx, this.Mother.posy);
        context.lineTo(this.ChildC.posx, this.ChildC.posy);

        // Enable Lines, Adjust Line Color and Width:
        context.strokeStyle = '#969696';
        context.lineWidth = 2;
        context.stroke();
    }
}

function SetupHobermanCircle(edgeCount, radius)
{
    // Calculating Origin:
    var Ox = 500;
    var Oy = 500;
    var origin = new Point(Ox, Oy);

    // Calculating single angle in polygon with count = edgeCount:
    var theta = (360/(edgeCount));

    // Degree to Radians:
    var toRadians = Math.PI / 180;

    // Theta In terms of radians:
    var thetaRadian = theta * toRadians;

    var currentAngle = 0;
    var hobermanGroupList = [];
    
    for (var i = 0; i < edgeCount; i++)
    {
        // Calculate Current Angle in Radians:
        var currentAngleRadians = currentAngle * toRadians;

        // Calculate Point B:
        var Bx = radius * Math.cos(thetaRadian/2);
        var By = radius * Math.sin(thetaRadian/2);
        
        // Calculate Point A:
        var Ax = Bx * Math.cos(thetaRadian);
        var Ay = Bx * Math.sin(thetaRadian);

        // Calculate Point C:
        var Cx = Bx - Math.tan(45 * toRadians - (thetaRadian / 4)) * By;
        var Cy = 0;

        // Define Points A, B and C:
        var pointB = new Point(Bx + Ox, By + Oy);
        var pointA = new Point(Ax + Ox, Ay + Oy);
        var pointC = new Point(Cx + Ox, Cy + Oy);

        // // Rotate the points:
        pointB.RotateAround(origin, currentAngleRadians);
        pointA.RotateAround(origin, currentAngleRadians);
        pointC.RotateAround(origin, currentAngleRadians);

        // Form and Store Hoberman Group formed by Points A, B and C:
        var hobermanGroup = new HobermanGroup(pointB, pointA, pointC);
        hobermanGroupList.push(hobermanGroup);

        // Increment Rotation Angle:
        currentAngle = theta + currentAngle;
    }

    return hobermanGroupList;
}

function ClearCanvas(context, canvas)
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    var width = canvas.width;
    
    canvas.width = 1;
    canvas.width = width;
}

function SetupHobermanEnvironment()
{
    var edgeCount  = 10;
    var radius = 150;
    var hobermanGroupList = SetupHobermanCircle(edgeCount, radius);
    
    DrawHobermanCircle(hobermanGroupList);
}

function DrawHobermanCircle(hobermanGroupList)
{
    const canvas = document.querySelector(".container__canvas");

    if (canvas.getContext)
    {
        var context = canvas.getContext('2d');
        
        ClearCanvas(context, canvas);
        
        for(var i = 0; i < hobermanGroupList.length; i++)
        {
            hobermanGroupList[i].DrawLines(context);
        }
    }
}

SetupHobermanEnvironment();