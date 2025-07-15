document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number');
    let started = false;
  
    const animateCounters = () => {
      if (started) return;
      started = true;
  
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
  
        let count = 0;
        const updateCounter = () => {
          count += step;
          if (count >= target) {
            counter.innerText = target + (target >= 1000 ? '+' : '');
          } else {
            counter.innerText = count;
            requestAnimationFrame(updateCounter);
          }
        };
        updateCounter();
      });
    };
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.5 });
  
    const statsSection = document.getElementById('stats');
    if (statsSection) {
      observer.observe(statsSection);
    } else {
      console.error("⚠️ L'élément #stats est introuvable dans le DOM !");
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  });

  // Copier l'IBAN
  function copyIBAN() {
    const text = document.getElementById('iban').textContent;
    navigator.clipboard.writeText(text).then(() => {
      alert("IBAN copié dans le presse-papiers !");
    });
  }