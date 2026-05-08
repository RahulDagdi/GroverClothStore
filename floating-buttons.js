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
 * <!-- floating Icons Whatsapp Instagram -->
 * <script src="floating-buttons.js"></script>
 * <script>
 *   FloatingButtons.init({
 *     instagram: 'https://www.instagram.com/grover_cloth__store',
 *     whatsapp: 'https://api.whatsapp.com/send/?phone=918619375610&text&type=phone_number&app_absent=0',
 *   });
 * </script>
 *
 * =============================================
 */

const FloatingButtons = (() => {
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&display=swap');

    /* ── WRAPPER — horizontal row, bottom right ── */
    #fb-wrapper {
      position: fixed;
      bottom: 24px;
      right: 10px;
      z-index: 9999;
      display: grid;
      flex-direction: row;
      align-items: flex-end;
      gap: 10px;
      font-family: 'Poppins', sans-serif;
    }

    /* ── EACH BUTTON — icon on top, label below ── */
    .fb-btn, #fb-scroll-top-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      text-decoration: none;
      cursor: pointer;
    }

    /* ── ICON CIRCLE ── */
    .fb-icon, #fb-scroll-top {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(0,0,0,0.22);
      border: none;
      cursor: pointer;
      transition: transform 0.28s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s;
    }

    .fb-icon svg, #fb-scroll-top svg {
      width: 22px;
      height: 22px;
      display: block;
    }

    .fb-icon i {
      font-size: 22px;
      color: white;
      line-height: 1;
    }

    .fb-btn:hover .fb-icon,
    #fb-scroll-top-wrap:hover #fb-scroll-top {
      transform: scale(1.12) translateY(-3px);
      box-shadow: 0 8px 28px rgba(0,0,0,0.28);
    }

    /* ── LABEL — always visible below icon ── */
    .fb-label {
      background: #fff;
      color: #222;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.04em;
      white-space: nowrap;
      padding: 3px 10px;
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      text-align: center;
    }

    #fb-scroll-label {
      background: #fff;
      color: #222;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.04em;
      white-space: nowrap;
      padding: 3px 10px;
      border-radius: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      text-align: center;
      font-family: 'Poppins', sans-serif;
    }

    /* ── SCROLL TO TOP: hidden until scroll ── */
    #fb-scroll-top-wrap {
      opacity: 0;
      pointer-events: none;
      transform: scale(0.7) translateY(10px);
      transition: opacity 0.3s ease, transform 0.35s cubic-bezier(.34,1.56,.64,1);
    }
    #fb-scroll-top-wrap.fb-visible {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1) translateY(0);
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
    #fb-scroll-top {
      background: #111;

    }
    #fb-scroll-top svg {
      fill: none;
      stroke: #fff;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* ── ENTER ANIMATIONS ── */
    @keyframes fb-slide-in {
      from { opacity: 0; transform: translateY(40px) scale(0.8); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    #fb-scroll-top-wrap.fb-visible { animation: fb-slide-in 0.4s cubic-bezier(.34,1.56,.64,1) both; }
    .fb-ig { animation: fb-slide-in 0.45s cubic-bezier(.34,1.56,.64,1) 0.1s both; }
    .fb-wa { animation: fb-slide-in 0.45s cubic-bezier(.34,1.56,.64,1) 0.22s both; }

    /* ── ALL THREE PULSE TOGETHER — same keyframe, same timing ── */
    @keyframes fb-pulse-all {
      0%   { box-shadow: 0 4px 18px rgba(0,0,0,0.22), 0 0 0 0    rgba(100,100,100,0.5); }
      70%  { box-shadow: 0 4px 18px rgba(0,0,0,0.22), 0 0 0 14px rgba(100,100,100,0); }
      100% { box-shadow: 0 4px 18px rgba(0,0,0,0.22), 0 0 0 0    rgba(100,100,100,0); }
    }

    /* WhatsApp — green pulse */
    @keyframes fb-pulse-wa {
      0%   { box-shadow: 0 4px 18px rgba(0,0,0,0.2), 0 0 0 0    rgba(37,211,102,0.65); }
      70%  { box-shadow: 0 4px 18px rgba(0,0,0,0.2), 0 0 0 14px rgba(37,211,102,0);   }
      100% { box-shadow: 0 4px 18px rgba(0,0,0,0.2), 0 0 0 0    rgba(37,211,102,0);   }
    }
    /* Instagram — pink pulse */
    @keyframes fb-pulse-ig {
      0%   { box-shadow: 0 4px 18px rgba(0,0,0,0.2), 0 0 0 0    rgba(214,36,159,0.65); }
      70%  { box-shadow: 0 4px 18px rgba(0,0,0,0.2), 0 0 0 14px rgba(214,36,159,0);   }
      100% { box-shadow: 0 4px 18px rgba(0,0,0,0.2), 0 0 0 0    rgba(214,36,159,0);   }
    }
    /* Scroll top — dark pulse */
    @keyframes fb-pulse-arrow {
      0%   { box-shadow: 0 4px 18px rgba(0,0,0,0.28), 0 0 0 0    rgba(30,30,30,0.65); }
      70%  { box-shadow: 0 4px 18px rgba(0,0,0,0.28), 0 0 0 14px rgba(30,30,30,0);   }
      100% { box-shadow: 0 4px 18px rgba(0,0,0,0.28), 0 0 0 0    rgba(30,30,30,0);   }
    }

    /* Same duration + delay = pulse together */
    .fb-wa .fb-icon           { animation: fb-pulse-wa    2.4s infinite; }
    .fb-ig .fb-icon           { animation: fb-pulse-ig    2.4s infinite; }
    #fb-scroll-top-wrap.fb-visible #fb-scroll-top { animation: fb-pulse-arrow 2.4s infinite; }

    /* ── RESPONSIVE ── */
    @media (max-width: 480px) {
      #fb-wrapper    { bottom: 14px; right: 12px; gap: 12px; }
      .fb-icon,
      #fb-scroll-top { width: 40px; height: 40px; }
      .fb-icon i     { font-size: 19px; }
      .fb-icon svg,
      #fb-scroll-top svg { width: 19px; height: 19px; }
      .fb-label,
      #fb-scroll-label { font-size: 9px; padding: 2px 8px; }
    }
  `;
  //  <span id="fb-scroll-label">Top</span>
  function buildHTML(opts) {
    return `
      <div id="fb-wrapper">

        <!-- Scroll To Top -->
       <div id="fb-scroll-top-wrap" 
     title="Back to top" 
     aria-label="Scroll to top" 
     style="margin-bottom:15px;">

    <button id="fb-scroll-top">
        <span class="fb-icon">
            <i class="fa-solid fa-arrow-up"></i>
        </span>
    </button>

</div>

        <!-- Instagram -->
        <a href="${opts.instagram}" target="_blank" rel="noopener" class="fb-btn fb-ig" aria-label="Follow us on Instagram">
          <span class="fb-icon">
            <i class="fab fa-instagram"></i>
          </span>
          <span class="fb-label">Follow us</span>
        </a>

        <!-- WhatsApp -->
        <a href="${opts.whatsapp}" target="_blank" rel="noopener" class="fb-btn fb-wa" aria-label="Chat on WhatsApp">
          <span class="fb-icon">
            <i class="fab fa-whatsapp"></i>
          </span>
          <span class="fb-label">Chat</span>
        </a>

      </div>
    `;
  }

  function initScroll() {
    const wrap = document.getElementById("fb-scroll-top-wrap");
    const btn  = document.getElementById("fb-scroll-top");
    if (!wrap || !btn) return;
    window.addEventListener(
      "scroll",
      () => {
        wrap.classList.toggle("fb-visible", window.scrollY > 300);
      },
      { passive: true }
    );
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function init(options = {}) {
    const opts = Object.assign(
      {
        instagram: "https://instagram.com/",
        whatsapp:  "https://wa.me/",
      },
      options
    );

    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    const div = document.createElement("div");
    div.innerHTML = buildHTML(opts);
    document.body.appendChild(div.firstElementChild);

    initScroll();
  }

  return { init };
})();