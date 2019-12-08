var DISTANCE_AB = 0;
var DISTANCE_CB = 0;
var POSITION_C = 0;
var CURRENT_RADIUS = 0;
var EPSILON = 0;
var ALPHA = 0;
var THETA = 0;

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

    DrawLines(context, color)
    {
        // Begin Drawing:
        context.beginPath();

        // Draw Edge BA:
        context.moveTo(this.PointB.x, this.PointB.y);
        context.fillRect(this.PointB.x - 2.5, this.PointB.y- 2.5,5,5);
        context.fillStyle = "#DC143C";
        context.lineTo(this.PointA.x, this.PointA.y);
        context.fillRect(this.PointA.x - 2.5, this.PointA.y - 2.5,5,5);
        context.fillStyle = "#7CFC00";

        // Draw Edge BC:
        context.moveTo(this.PointB.x, this.PointB.y);
        context.lineTo(this.PointC.x, this.PointC.y);
        context.fillRect(this.PointC.x - 2.5, this.PointC.y - 2.5,5,5);
        context.fillStyle = "#1E90FF";

        // Enable Lines, Adjust Line Color and Width:
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
    }
}

function FormHobermanCircle(edgeCount, radius, closednessUnit, canvas)
{
    // Calculate the Origin:
    var Ox = canvas.width / 2;
    var Oy = canvas.height / 2;
    var origin = new Point(Ox, Oy);

    // Calculate single angle in polygon with count = edgeCount:
    var theta = (360 / edgeCount);
    THETA = theta;

    // Degree to Radians:
    var toRadians = Math.PI / 180;

    var toDegrees = 180 / Math.PI;

    // Theta in Terms of radians:
    var thetaRadian = theta * toRadians;

    // Calculate Distance Between Point A and B:
    var distanceAB = radius * Math.sin(thetaRadian/2);

    // Calculate Angles Alpha and Epsilon:
    //      Epsilon is the Angle between A and line perpendicular to hypotenuse drawn from point B.
    //      Alpha is the one third of the angle ABC^.
    var alpha = 45 * toRadians - (thetaRadian / 4);
    ALPHA = alpha  * toDegrees;
    
    // Calculate Distance Between Points C and B:
    var distanceCB = Math.tan(alpha) * distanceAB;

    // Define Closedness:
    //      As you may have noticed, closedness is a value between 0 and radius / 2.
    var closedness = (closednessUnit * (radius - distanceCB));

    // Calculate Point B:
    var Bx = (radius - closedness) * Math.cos(thetaRadian/2);
    var By = (radius - closedness) * Math.sin(thetaRadian/2);

    var epsilon = Math.acos(By / distanceAB);   
    EPSILON = epsilon * toDegrees;

    // Apply Distance of AB and CB to Global Variables:
    DISTANCE_AB = distanceAB;
    DISTANCE_CB = distanceCB;

    // Calculate Distance of A From The Origin:
    var distanceOA = Bx + (distanceAB * Math.sin(epsilon));

    // Calculate Distance of B from The Origin:
    var distanceOB = Math.sqrt(Math.pow(Bx, 2) + Math.pow(By, 2));

    // Calculate Point A:
    var Ax = distanceOA * Math.cos(thetaRadian);
    var Ay = distanceOA * Math.sin(thetaRadian);

    // Calculate Point C:
    var Cx = Bx - (distanceCB * Math.sin(alpha + epsilon));
    var Cy = 0;

    // Calculate Distance of C from The Origin:
    var distanceOC = Math.sqrt(Math.pow(Cx, 2) + Math.pow(Cy, 2));

    // Calculate Current Radius:
    CURRENT_RADIUS = Math.max(distanceOA, distanceOB, distanceOC);

    // For Debug:
    POSITION_C = new Point(Cx,Cy);

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

function DrawHobermanCircle(hobermanGroupList, canvas)
{
    if (!canvas.getContext) return;

    var context = canvas.getContext('2d');
    var color1 = "#969696";
    var color2 = "#262626";

    ClearCanvas(context, canvas);
    
    var length = hobermanGroupList.length;

    var colors = [];

    if ((length / 2) % 2  == 0)
    {
        colors.push(color1);
        colors.push(color2);
    }

    else 
    {
        colors.push(color1);
    }
   

    for (var i = 0; i < length; i++)
    {
        var color = colors[i % colors.length];
        hobermanGroupList[i].DrawLines(context, color);
    }
}
