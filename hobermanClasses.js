var DISTANCE_AB = 0;
var DISTANCE_CB = 0;
var CURRENT_RADIUS = 0;

class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    RotateAround(pivot, angle)
    {
        // Calculating sine and cosines:
        var angleSin = Math.sin(angle);
        var angleCos = Math.cos(angle);

        // Translating pivot to 0,0:
        this.x = this.x - pivot.x;
        this.y = this.y - pivot.y;

        // Rotating the point:
        var newX = this.x * angleCos - this.y * angleSin;
        var newY = this.x * angleSin + this.y * angleCos;
        
        // Translate point back to its pivot:
        this.x = newX + pivot.x;
        this.y = newY + pivot.y;
    }
}

class HobermanGroup
{
    constructor(PointB, PointA, PointC)
    {
        this.PointB = PointB;
        this.PointA = PointA;
        this.PointC = PointC;
    }

    DrawLines(context)
    {
        // Begin Drawing:
        context.beginPath();

        // Draw Edge BA:
        context.moveTo(this.PointB.x, this.PointB.y);
        context.lineTo(this.PointA.x, this.PointA.y);

        // Draw Edge BC:
        context.moveTo(this.PointB.x, this.PointB.y);
        context.lineTo(this.PointC.x, this.PointC.y);

        // Enable Lines, Adjust Line Color and Width:
        context.strokeStyle = '#969696';
        context.lineWidth = 2;
        context.stroke();
    }
}

function FormHobermanCircle(edgeCount, radius, closednessUnit, canvas)
{
    // Define Closedness:
    //      As you may have noticed, closedness is a value between 0 and radius / 2.
    var closedness = (closednessUnit * radius) / 2;

    // Calculate the Origin:
    var Ox = canvas.width / 2;
    var Oy = canvas.height / 2;
    var origin = new Point(Ox, Oy);

    // Calculate single angle in polygon with count = edgeCount:
    var theta = (360 / edgeCount);

    // Degree to Radians:
    var toRadians = Math.PI / 180;

    // Theta in Terms of radians:
    var thetaRadian = theta * toRadians;

    // Calculate Point B:
    var Bx = (radius - closedness) * Math.cos(thetaRadian/2);
    var By = (radius - closedness) * Math.sin(thetaRadian/2);
    
    // Calculate Distance Between Point A and B:
    var distanceAB = radius * Math.sin(thetaRadian/2);

    // Calculate Angles Alpha and Epsilon:
    //      Epsilon is the Angle between A and line perpendicular to hypotenuse drawn from point B.
    //      Alpha is the one third of the angle ABC^.
    var alpha = 45 * toRadians - (thetaRadian / 4);
    var epsilon = Math.acos(By / distanceAB);

    // Calculate Distance Between Points C and B:
    var distanceCB = Math.tan(alpha) * distanceAB;

    // Apply Distance of AB and CB to Global Variables:
    DISTANCE_AB = distanceAB;
    DISTANCE_CB = distanceCB;

    // Calculate Distance between B and Origin (It corresponds to current radius of the circle):
    CURRENT_RADIUS = Math.sqrt(Math.pow(Bx, 2) + Math.pow(By, 2));

    // Calculate Distance of A From The Origin:
    var distanceOA = Bx + (distanceAB * Math.sin(epsilon));

    // Calculate Point A:
    var Ax = distanceOA * Math.cos(thetaRadian);
    var Ay = distanceOA * Math.sin(thetaRadian);

    // Calculate Point C:
    var Cx = Bx - (distanceCB * Math.sin(alpha + epsilon));
    var Cy = 0;

    // Define Initial Angle:
    var currentAngle = 0;

    // Define The List That Will Store Hoberman Groups Formed By 3 Points:
    var hobermanGroupList = [];

    // Define Sign Which Will Be Used to Create Other Chain of Hoberman Circle:
    var sign = 1;
    
    for (var j = 0; j < 2; j++) 
    {
        for (var i = 0; i < edgeCount; i++)
        {
            // Calculate Current Angle in Radians:
            var currentAngleRadians = currentAngle * toRadians;
    
            // Define Points A, B and C:
            var pointB = new Point(Bx + Ox, sign * By + Oy);
            var pointA = new Point(Ax + Ox, sign * Ay + Oy);
            var pointC = new Point(Cx + Ox, sign * Cy + Oy);
    
            // Rotate the points:
            pointB.RotateAround(origin, currentAngleRadians);
            pointA.RotateAround(origin, currentAngleRadians);
            pointC.RotateAround(origin, currentAngleRadians);
    
            // Form and Store Hoberman Group formed by Points A, B and C:
            var hobermanGroup = new HobermanGroup(pointB, pointA, pointC);
            hobermanGroupList.push(hobermanGroup);
    
            // Increment Rotation Angle:
            currentAngle = theta + currentAngle;
        }
        
        // Flip the Sign and Refresh Starting Angle:
        sign = -1 * sign;
        currentAngle = 0;
    }

    return hobermanGroupList;
}

function ClearCanvas(context, canvas)
{
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function SetupHobermanEnvironment(edgeCount, radius)
{
    var hobermanGroupList = SetupHobermanCircle(edgeCount, radius);
    
    DrawHobermanCircle(hobermanGroupList);
}

function DrawHobermanCircle(hobermanGroupList, canvas)
{
    if (!canvas.getContext) return;

    var context = canvas.getContext('2d');
    
    ClearCanvas(context, canvas);
    
    var length = hobermanGroupList.length;

    for (var i = 0; i < length; i++)
    {
        hobermanGroupList[i].DrawLines(context);
    }
}
