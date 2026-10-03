(function(){
    document.querySelectorAll('img[data-fallback]').forEach(img => {
      img.addEventListener('error', () => {
        if (img.dataset.fallbackUsed) return;
        img.dataset.fallbackUsed = '1';
        img.src = img.dataset.fallback;
      });
    });

    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    menuBtn?.addEventListener('click',()=>{ const open=navLinks.classList.toggle('open'); menuBtn.setAttribute('aria-expanded',String(open)); });
    navLinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

    const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const trackedSections = sectionLinks
      .map(link => ({ link, section: document.querySelector(link.getAttribute('href')) }))
      .filter(item => item.section);
    if ('IntersectionObserver' in window && trackedSections.length) {
      const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          trackedSections.forEach(({link, section}) => {
            const active = section === entry.target;
            link.classList.toggle('is-active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-25% 0px -62% 0px', threshold: 0 });
      trackedSections.forEach(({section}) => navObserver.observe(section));
    }

    document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{
      const item = btn.closest('.faq-item');
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded',String(open));
      btn.querySelector('span:last-child').textContent = open ? '−' : '+';
    }));

    const queryInput = document.getElementById('queryInput');
    const result1 = document.getElementById('result1');
    const result2 = document.getElementById('result2');
    const result3 = document.getElementById('result3');
    const resultCount = document.getElementById('resultCount');
    const samples = {
      'person with a black backpack':['Person with black backpack','Person near west gate','Same target • cross-scene'],
      'white van near the entrance':['White van • entrance','Van approaching gate','Same target • cross-scene'],
      'person carrying a box':['Person carrying a box','Person at dispatch door','Same target • cross-scene'],
      'blue vehicle at the gate':['Blue vehicle • gate','Vehicle on access road','Same target • cross-scene'],
      'white vehicle near the loading area':['White vehicle • Loading bay','Vehicle approaching gate','Same target • cross-scene']
    };
    function runSearch(){
      const q=queryInput.value.trim().toLowerCase();
      const match=samples[q] || ['Relevant target match','Related camera result','AcuSearch follow-up'];
      result1.textContent=match[0]; result2.textContent=match[1]; result3.textContent=match[2]; resultCount.textContent='4 relevant matches';
    }
    document.getElementById('searchBtn')?.addEventListener('click',runSearch);
    document.querySelectorAll('.suggestion').forEach(s=>s.addEventListener('click',()=>{queryInput.value=s.textContent.trim();runSearch();}));

    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries)=>entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target);} }),{threshold:.12});
      revealEls.forEach(el=>obs.observe(el));
    } else { revealEls.forEach(el=>el.classList.add('is-visible')); }
  })();
