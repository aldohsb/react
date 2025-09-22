
// Hover parallax lighting
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.setProperty('--mx', x + 'px');
    card.style.setProperty('--my', y + 'px');
  });
  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--mx');
    card.style.removeProperty('--my');
  });

  // Click ripple
  card.addEventListener('click', (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const span = document.createElement('span');
    span.className = 'rfx';
    span.style.left = x + 'px';
    span.style.top = y + 'px';
    card.appendChild(span);
    setTimeout(()=> span.remove(), 700);
  });
});

// Simple client-side filter
const search = document.getElementById('search');
const cards = Array.from(document.querySelectorAll('.card'));
if (search){
  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    cards.forEach(c => {
      const text = c.textContent.toLowerCase();
      c.style.display = text.includes(q) ? '' : 'none';
    });
  });
}
