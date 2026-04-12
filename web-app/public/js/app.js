document.addEventListener('click', function(e){
  const target = e.target.closest('[data-analytics]');
  if(!target) return;
  const ev = target.dataset.analytics;
  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event: 'nav_click', action: ev, timestamp: Date.now()});
});
