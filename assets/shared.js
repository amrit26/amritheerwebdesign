(function(){
 const cfg=window.SITE_CONFIG||{};
 document.querySelectorAll('[data-brand]').forEach(el=>el.textContent=cfg.brandName||'Amrit Heer Web Design');
 const usable=v=>v && !String(v).startsWith('YOUR_');
 document.querySelectorAll('[data-email]').forEach(el=>{ if(usable(cfg.email)){ el.textContent=cfg.email; if(el.tagName==='A') el.href='mailto:'+cfg.email; } });
 document.querySelectorAll('[data-phone]').forEach(el=>{ if(usable(cfg.phoneDisplay)) el.textContent=cfg.phoneDisplay; if(el.tagName==='A' && usable(cfg.phoneHref)) el.href='tel:+'+cfg.phoneHref.replace(/\D/g,''); });
 document.querySelectorAll('[data-whatsapp]').forEach(el=>{ if(usable(cfg.whatsappDigits)) el.href='https://wa.me/'+cfg.whatsappDigits.replace(/\D/g,''); });
 document.querySelectorAll('form[data-lead-form]').forEach(form=>form.addEventListener('submit',e=>{
   e.preventDefault();
   const fd=new FormData(form);
   const body=encodeURIComponent(`Name: ${fd.get('name')||''}
Business: ${fd.get('business')||''}
Phone: ${fd.get('phone')||''}

${fd.get('message')||''}`);
   if(usable(cfg.email)) window.location.href=`mailto:${cfg.email}?subject=Website%20enquiry&body=${body}`;
 }));
})();


// Make the whole pricing card clickable, not only its button.
document.querySelectorAll('.clickable-price-card').forEach(card => {
  const goToContact = () => {
    const packageName = card.dataset.package || '';
    const messageInput = document.querySelector("#contact [name='message']");
    if (messageInput && packageName) {
      const current = messageInput.value.trim();
      if (!current || current.startsWith("I'm interested in")) {
        messageInput.value = `I'm interested in ${packageName}.`;
      }
    }
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => messageInput?.focus(), 450);
  };

  card.addEventListener('click', event => {
    if (event.target.closest('a')) {
      const packageName = card.dataset.package || '';
      const messageInput = document.querySelector("#contact [name='message']");
      if (messageInput && packageName) {
        messageInput.value = `I'm interested in ${packageName}.`;
      }
      return;
    }
    goToContact();
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToContact();
    }
  });
});
