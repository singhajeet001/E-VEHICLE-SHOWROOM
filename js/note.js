// Draw HERO text
ctx.font = 'bold 100px "Segoe UI", sans-serif'; // modern bold font
ctx.fillStyle = '#ff1a1a'; // vibrant red
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// Stylish glow effect
ctx.shadowColor = '#ff4d4d';
ctx.shadowBlur = 25;

// Optional stroke (adds definition to text)
ctx.lineWidth = 2;
ctx.strokeStyle = '#ffffff';
ctx.strokeText('HERO', canvas.width / 2, canvas.height / 2);

// Fill the text
ctx.fillText('HERO', canvas.width / 2, canvas.height / 2);
