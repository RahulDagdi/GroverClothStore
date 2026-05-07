/**
 * =============================================
 *   FLOATING SOCIAL BUTTONS + SCROLL-TO-TOP
 *   REUSABLE COMPONENT — floating-buttons.js
 * =============================================
 *
 * 📦 HOW TO USE IN ANY PAGE:
 *
 * STEP 1: Copy floating-buttons.js to your project folder.
 *
 * STEP 2: Before closing </body> tag, add:
 * 
 * 
// <!-- floating In=con Whatsapp instagram -->
<script src="floating-buttons.js"></script>
<script>
  FloatingButtons.init({
    instagram: 'https://www.instagram.com/grover_cloth__store',
    whatsapp: 'https://api.whatsapp.com/send/?phone=918619375610&text&type=phone_number&app_absent=0',
  });
</script>

 * =============================================
 */


const FloatingButtons = (() => {

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap');

    /* WRAPPER — flush to right edge of screen */
    #fb-wrapper {
      position: fixed;
      bottom: 28px;
      right: 0;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
      font-family: 'Poppins', sans-serif;
    }

    /* ── SCROLL TO TOP BUTTON ── */
    #fb-scroll-top {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: #111;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(0,0,0,0.28);
      margin-right: 14px;
      /* Hidden by default */
      opacity: 0;
      pointer-events: none;
      transform: scale(0.6) translateY(14px);
      transition: opacity 0.3s ease, transform 0.35s cubic-bezier(.34,1.56,.64,1), background 0.2s;
    }
    #fb-scroll-top.fb-visible {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1) translateY(0);
    }
    #fb-scroll-top:hover {
      background: #333;
      transform: scale(1.08) translateY(-2px);
    }
    #fb-scroll-top svg {
      width: 20px; height: 20px;
      fill: none; stroke: #fff;
      stroke-width: 2.5;
      stroke-linecap: round; stroke-linejoin: round;
    }

    /* ── SOCIAL BUTTON ROW ──
       [  label pill  ] [ icon ▌screen edge ]
       Label on LEFT, Icon on RIGHT
    */
    .fb-btn {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-decoration: none;
      position: relative;
      overflow: visible;
    }

    /* ICON — right side, slightly touching screen edge */
    .fb-icon {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      margin-right: 14px;          /* gap from screen right */
      z-index: 2;
      transition: transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s;
    }
    .fb-btn:hover .fb-icon {
      transform: scale(1.1) rotate(-6deg);
      box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    }
    .fb-icon svg {
      width: 23px;
      height: 23px;
      display: block;
    }

    /* LABEL — on LEFT, hidden → slides in to the right on hover */
    .fb-label {
      background: #fff;
      color: #222;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.03em;
      white-space: nowrap;
      padding: 6px 16px 6px 14px;
      border-radius: 20px 0 0 20px;   /* left-rounded pill */
      margin-right: -12px;             /* tuck behind icon */
      box-shadow: -3px 2px 14px rgba(0,0,0,0.12);
      z-index: 1;
      /* hidden: slid to the right */
      opacity: 0;
      transform: translateX(14px);
      transition: opacity 0.22s ease, transform 0.3s cubic-bezier(.34,1.56,.64,1);
      pointer-events: none;
    }
    .fb-btn:hover .fb-label {
      opacity: 1;
      transform: translateX(0);      /* slides LEFT into view */
    }

    /* ── COLORS ── */
    .fb-ig .fb-icon {
      background: radial-gradient(circle at 30% 107%,
        #fdf497 0%, #fdf497 5%,
        #fd5949 45%, #d6249f 60%,
        #285AEB 90%);
    }
    .fb-wa .fb-icon {
      background: #25D366;
    }

    /* ── ENTER ANIMATIONS ── */
    @keyframes fb-slide-in {
      from { opacity: 0; transform: translateX(70px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .fb-ig { animation: fb-slide-in 0.45s cubic-bezier(.34,1.56,.64,1) 0.1s both; }
    .fb-wa { animation: fb-slide-in 0.45s cubic-bezier(.34,1.56,.64,1) 0.22s both; }

    /* WhatsApp pulse — green theme */
    @keyframes fb-pulse-wa {
      0%   { box-shadow: 0 0 0 0    rgba(37,211,102,0.6); }
      70%  { box-shadow: 0 0 0 14px rgba(37,211,102,0);   }
      100% { box-shadow: 0 0 0 0    rgba(37,211,102,0);   }
    }
    .fb-wa .fb-icon { animation: fb-pulse-wa 2.4s infinite; }

    /* Instagram pulse — pink/purple gradient theme */
    @keyframes fb-pulse-ig {
      0%   { box-shadow: 0 0 0 0    rgba(214,36,159,0.6); }
      35%  { box-shadow: 0 0 0 8px  rgba(253,89,73,0.35); }
      70%  { box-shadow: 0 0 0 15px rgba(40,90,235,0);    }
      100% { box-shadow: 0 0 0 0    rgba(214,36,159,0);   }
    }
    .fb-ig .fb-icon { animation: fb-pulse-ig 2.4s infinite 0.8s; }

    /* Arrow/Scroll-top pulse — dark charcoal theme */
    @keyframes fb-pulse-arrow {
      0%   { box-shadow: 0 0 0 0    rgba(30,30,30,0.65); }
      70%  { box-shadow: 0 0 0 13px rgba(30,30,30,0);    }
      100% { box-shadow: 0 0 0 0    rgba(30,30,30,0);    }
    }
    #fb-scroll-top.fb-visible { animation: fb-pulse-arrow 2.6s infinite 1.6s; }

    /* ── RESPONSIVE ── */
    @media (max-width: 480px) {
      #fb-wrapper      { bottom: 16px; gap: 8px; }
      .fb-icon         { width: 46px; height: 46px; margin-right: 10px; }
      .fb-icon svg     { width: 25px; height: 25px; }
      #fb-scroll-top   { width: 40px; height: 40px; margin-right: 10px; }
      .fb-label        { font-size: 11px; padding: 5px 13px 5px 11px; }
    }
  `;

  function buildHTML(opts) {
    return `
      <div id="fb-wrapper">

        <!-- Scroll To Top -->
        <button id="fb-scroll-top" title="Back to top" aria-label="Scroll to top">
          <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
        </button>

        <!-- Instagram: label LEFT → icon RIGHT -->
        <a href="${opts.instagram}" target="_blank" rel="noopener" class="fb-btn fb-ig" aria-label="Follow us on Instagram">
          <span class="fb-label">Follow us</span>
          <span class="fb-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5.5" fill="white" opacity="0.15"/>
              <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="4.2" stroke="white" stroke-width="2"/>
              <circle cx="17.3" cy="6.7" r="1.25" fill="white"/>
            </svg>
          </span>
        </a>

        <!-- WhatsApp: label LEFT → icon RIGHT -->
        <a href="${opts.whatsapp}" target="_blank" rel="noopener" class="fb-btn fb-wa" aria-label="Chat on WhatsApp">
          <span class="fb-label">Chat</span>
          <span class="fb-icon">
            <svg viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.51L4 29l7.697-1.81A12.94 12.94 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm6.406 16.747c-.27.757-1.576 1.448-2.14 1.49-.563.044-1.09.265-3.676-.766-3.11-1.24-5.09-4.413-5.243-4.618-.152-.205-1.24-1.651-1.24-3.148s.786-2.234 1.065-2.54c.278-.305.607-.38.81-.38.202 0 .404.002.582.011.186.01.437-.07.683.521.27.636.914 2.234.995 2.397.08.163.133.353.026.569-.105.215-.158.348-.31.537-.152.189-.32.422-.456.567-.152.163-.31.34-.134.665.177.325.786 1.296 1.686 2.1 1.16 1.033 2.138 1.352 2.463 1.504.326.152.515.127.704-.077.19-.203.81-.946 1.027-1.27.215-.325.43-.27.726-.163.296.108 1.882.888 2.204 1.05.323.163.538.244.617.38.08.136.08.787-.19 1.544z"/>
            </svg>
          </span>
        </a>

      </div>
    `;
  }

  function initScroll() {
    const btn = document.getElementById('fb-scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('fb-visible', window.scrollY > 300);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function init(options = {}) {
    const opts = Object.assign({
      instagram: 'https://instagram.com/',
      whatsapp:  'https://wa.me/',
    }, options);

    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const div = document.createElement('div');
    div.innerHTML = buildHTML(opts);
    document.body.appendChild(div.firstElementChild);

    initScroll();
  }

  return { init };

})();