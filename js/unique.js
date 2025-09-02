<script>
document.addEventListener('DOMContentLoaded', () => {
  // select only in-page links (href beginning with '#')
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id], header[id]'); // header included

  if (navLinks.length === 0 || sections.length === 0) {
    console.log('No in-page nav links or sections with id found. Ensure href="#..." and sections have id attributes.');
    return;
  }

  // IntersectionObserver options: trigger when section crosses about middle of viewport
  const obsOptions = {
    root: null,
    rootMargin: '0px 0px -45% 0px', // triggers when top of section is ~45% from top
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const matchingLink = document.querySelector(`nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        // remove active from all, then set on matching (keeps single active)
        navLinks.forEach(l => l.classList.remove('active'));
        if (matchingLink) matchingLink.classList.add('active');
      }
    });
  }, obsOptions);

  sections.forEach(sec => observer.observe(sec));

  // Optional: ensure clicking nav links scrolls smoothly and set focus
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // default behavior with CSS `html { scroll-behavior: smooth; }` is enough
      // but ensure active class for immediate feedback:
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Fallback for very old browsers (no IntersectionObserver)
  if (!('IntersectionObserver' in window)) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top <= window.innerHeight * 0.45 && top >= -window.innerHeight * 0.55) {
          current = section.id;
        }
      });
      if (current) {
        navLinks.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`nav a[href="#${current}"]`);
        if (match) match.classList.add('active');
      }
    });
  }
});
</script>
