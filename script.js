// Preencha com os contatos reais antes de publicar.
// WhatsApp: código do país + DDD + número, apenas dígitos.
// Instagram: nome de usuário sem @ ou endereço em instagram.com.
window.BARBEARIA_CONTACTS = Object.freeze({
  whatsapp: '5546999999999',
  instagram: 'https://www.instagram.com/'
});


const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));
const contacts = window.BARBEARIA_CONTACTS || {};
const phone = String(contacts.whatsapp || '').replace(/\D/g, '');
const instagram = String(contacts.instagram || '').trim().replace(/^@/, '');
const contactNotice = document.querySelector('#contact-notice');
let noticeTimeout;
function showContactNotice(network) {
  clearTimeout(noticeTimeout);
  contactNotice.textContent = `O contato do ${network} ainda não foi informado para esta prévia.`;
  contactNotice.hidden = false;
  noticeTimeout = setTimeout(() => { contactNotice.hidden = true; }, 5000);
}
function connectButton(button, url, network) {
  if (!url) {
    button.addEventListener('click', () => showContactNotice(network));
    return;
  }
  const link = document.createElement('a');
  for (const attribute of button.attributes) link.setAttribute(attribute.name, attribute.value);
  link.removeAttribute('type');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.innerHTML = button.innerHTML;
  button.replaceWith(link);
}
document.querySelectorAll('[data-book], [data-contact="whatsapp"]').forEach(button => {
  const service = button.dataset.book;
  const message = service
    ? (service.startsWith('Plano ')
      ? `Olá! Gostaria de saber mais sobre o ${service} da Barbearia Central.`
      : `Olá! Gostaria de agendar ${service.toLowerCase()} na Barbearia Central. Quais horários estão disponíveis?`)
    : 'Olá! Gostaria de agendar um horário na Barbearia Central.';
  const url = /^\d{10,15}$/.test(phone) ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : null;
  connectButton(button, url, 'WhatsApp');
});
document.querySelectorAll('[data-contact="instagram"]').forEach(button => {
  let url = null;
  if (/^[a-zA-Z0-9._]{1,30}$/.test(instagram)) {
    url = `https://www.instagram.com/${instagram}/`;
  } else {
    try {
      const address = new URL(instagram);
      if (address.protocol === 'https:' && ['instagram.com', 'www.instagram.com'].includes(address.hostname)) url = address.href;
    } catch { /* Contato incompleto: mantém o aviso da prévia. */ }
  }
  connectButton(button, url, 'Instagram');
});
const ticker = document.querySelector('.ticker');
const tickerToggle = document.querySelector('.ticker-toggle');
tickerToggle.addEventListener('click', () => {
  const paused = ticker.classList.toggle('is-paused');
  tickerToggle.setAttribute('aria-pressed', String(paused));
  tickerToggle.setAttribute('aria-label', paused ? 'Retomar faixa animada' : 'Pausar faixa animada');
  tickerToggle.firstElementChild.textContent = paused ? '▶' : 'Ⅱ';
});
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
