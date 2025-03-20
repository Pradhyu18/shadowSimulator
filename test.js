const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Function to draw the ice cream cone
function drawIceCreamCone(cx, cy, radius, coneHeight) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // 🎨 Draw Ice Cream Scoop (Circle)
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI); 
    ctx.fillStyle = "pink"; // Ice cream color
    ctx.fill();
    ctx.stroke();

    // 🍦 Draw Cone (Triangle)
    ctx.beginPath();
    ctx.moveTo(cx - radius, cy); // Left side of the cone
    ctx.lineTo(cx + radius, cy); // Right side of the cone
    ctx.lineTo(cx, cy + coneHeight); // Bottom tip of the cone
    ctx.closePath();
    ctx.fillStyle = "saddlebrown"; // Cone color
    ctx.fill();
    ctx.stroke();
}

// 🎯 Example: Call the function with a user-defined radius
drawIceCreamCone(150, 100, 50, 100);
