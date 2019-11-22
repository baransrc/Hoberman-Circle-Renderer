const $edge_count = document.querySelector(".container__settings__options__field__edge-count");
const $radius = document.querySelector(".container__settings__options__field__radius");
const $openness = document.querySelector(".container__settings__options__field__openness");

<script src="functionality.js"></script>
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
