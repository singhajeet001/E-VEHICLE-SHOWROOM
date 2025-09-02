function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw "HERO" text
    ctx.font = 'bold 48px Orbitron, sans-serif';
    ctx.fillStyle = 'rgba(0, 255, 204, 0.8)';
    ctx.textAlign = 'center';
    ctx.fillText('HERO', canvas.width / 2, canvas.height / 2 + 15);

    requestAnimationFrame(animate);
  }

  animate();
</script>
