(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (window.self !== window.top) return;
  if (window.__wlPortalNavInitialized || document.getElementById('wl-portal-dock')) return;
  window.__wlPortalNavInitialized = true;

  function resolvePortalRoot() {
    const script = document.currentScript || document.querySelector('script[src*="portal-nav.js"]');
    if (script && script.src) {
      try {
        const scriptUrl = new URL(script.src, window.location.href);
        if (/\/assets\/portal-nav\.js$/i.test(scriptUrl.pathname)) {
          return new URL('..', scriptUrl).href;
        }
      } catch {
        // Fallback below
      }
    }
    const segs = window.location.pathname.split('/').filter(Boolean);
    const knownSubs = new Set(['code-library', 'ayroui', 'goi-ten']);
    const subIdx = segs.findIndex((seg) => knownSubs.has(seg));
    if (subIdx >= 0) {
      const prefix = segs.slice(0, subIdx).join('/');
      return `${window.location.origin}/${prefix ? `${prefix}/` : ''}`;
    }
    return `${window.location.origin}/`;
  }

  const portalRoot = resolvePortalRoot();
  const normalizePath = (url) => {
    try {
      return new URL(url).pathname.replace(/\/+$/, '') || '/';
    } catch {
      return '/';
    }
  };

  const ICONS = {
    home: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    code: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    layout: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
    wheel: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.5"/><path d="M12 3v6.5"/><path d="m19.8 7.5-5.6 3.25"/><path d="m19.8 16.5-5.6-3.25"/><path d="M12 21v-6.5"/><path d="m4.2 16.5 5.6-3.25"/><path d="m4.2 7.5 5.6 3.25"/></svg>',
    chevronUp: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
  };

  const currentPath = window.location.pathname;
  const rootPath = normalizePath(portalRoot);
  const apps = [
    {
      id: 'home',
      label: 'Trang chủ Portal',
      meta: 'Tổng quan 3 web app',
      icon: ICONS.home,
      href: portalRoot,
      match: (p) => p === rootPath || p === `${rootPath}/index.html`,
    },
    {
      id: 'code-library',
      label: 'Code Library',
      meta: '220 HTML · CSS · JS thuần',
      icon: ICONS.code,
      href: `${portalRoot}code-library/`,
      match: (p) => p.includes('/code-library'),
    },
    {
      id: 'ayroui',
      label: 'Ayro UI',
      meta: '259 mẫu Bootstrap 5',
      icon: ICONS.layout,
      href: `${portalRoot}ayroui/`,
      match: (p) => p.includes('/ayroui'),
    },
    {
      id: 'goi-ten',
      label: 'Gọi Tên Ngẫu Nhiên',
      meta: 'Vòng quay & trò chơi lớp học',
      icon: ICONS.wheel,
      href: `${portalRoot}goi-ten/`,
      match: (p) => p.includes('/goi-ten'),
    },
  ];

  const activeApp = apps.find((item) => item.id !== 'home' && item.match(currentPath)) || apps[0];

  function mount() {
    if (document.getElementById('wl-portal-dock')) return;
    const targetParent = document.body || document.documentElement;
    if (!targetParent) return;

    const host = document.createElement('div');
    host.id = 'wl-portal-dock';
    host.style.cssText = [
      'position:fixed',
      'right:18px',
      'bottom:18px',
      'z-index:45',
      'display:block',
      'font-family:"Be Vietnam Pro",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',
    ].join(';');

    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host { all: initial; }
        .wrap {
          position: relative;
          font-family: "Be Vietnam Pro", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          color: #f8fafc;
        }
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 40px;
          padding: 0 14px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.32);
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #f8fafc;
          box-shadow: 0 10px 28px rgba(2, 6, 23, 0.32);
          cursor: pointer;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          line-height: 1;
          transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease;
        }
        .pill:hover {
          transform: translateY(-1px);
          border-color: rgba(96, 165, 250, 0.7);
          background: rgba(15, 23, 42, 0.98);
        }
        .pill:focus-visible,
        .item:focus-visible {
          outline: 3px solid #60a5fa;
          outline-offset: 2px;
        }
        .pill-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.22);
          flex-shrink: 0;
        }
        .pill-caret {
          display: inline-flex;
          opacity: 0.78;
          transition: transform 0.16s ease;
        }
        .wrap[data-open="true"] .pill-caret {
          transform: rotate(180deg);
        }
        .menu {
          position: absolute;
          right: 0;
          bottom: calc(100% + 10px);
          width: 268px;
          padding: 8px;
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.26);
          background: rgba(15, 23, 42, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 20px 44px rgba(2, 6, 23, 0.45);
          display: none;
          flex-direction: column;
          gap: 4px;
        }
        .wrap[data-open="true"] .menu {
          display: flex;
        }
        .menu-head {
          padding: 6px 10px 4px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #94a3b8;
        }
        .item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-radius: 11px;
          text-decoration: none;
          color: #e2e8f0;
          border: 1px solid transparent;
          transition: background 0.14s ease, color 0.14s ease;
        }
        .item:hover {
          background: rgba(51, 65, 85, 0.72);
          color: #ffffff;
        }
        .item.active {
          background: rgba(37, 99, 235, 0.24);
          border-color: rgba(96, 165, 250, 0.45);
          color: #ffffff;
        }
        .item-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          background: rgba(148, 163, 184, 0.14);
          color: #cbd5e1;
          flex-shrink: 0;
        }
        .item.active .item-icon {
          background: rgba(56, 189, 248, 0.2);
          color: #7dd3fc;
        }
        .item-body {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .item-title {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.25;
        }
        .item-meta {
          font-size: 11px;
          color: #94a3b8;
          line-height: 1.25;
        }
        .item.active .item-meta {
          color: #bae6fd;
        }
        @media (prefers-reduced-motion: reduce) {
          .pill,
          .pill-caret,
          .item {
            transition: none;
          }
          .pill:hover {
            transform: none;
          }
        }
      </style>
      <div class="wrap" data-open="false">
        <div class="menu" id="wl-portal-menu" role="menu" aria-label="Chuyển đổi ứng dụng Portal">
          <div class="menu-head">Chuyển nhanh 3 Web App</div>
          ${apps
            .map(
              (item) => `
            <a class="item ${item.id === activeApp.id ? 'active' : ''}" href="${item.href}" role="menuitem">
              <span class="item-icon" aria-hidden="true">${item.icon}</span>
              <span class="item-body">
                <span class="item-title">${item.label}</span>
                <span class="item-meta">${item.meta}</span>
              </span>
            </a>`
            )
            .join('')}
        </div>
        <button type="button" class="pill" id="wl-portal-toggle" aria-expanded="false" aria-controls="wl-portal-menu" title="Chuyển giữa Trang chủ và 3 Web App">
          <span class="pill-dot" aria-hidden="true"></span>
          <span>Portal</span>
          <span class="pill-caret" aria-hidden="true">${ICONS.chevronUp}</span>
        </button>
      </div>
    `;

    targetParent.appendChild(host);

    const wrap = shadow.querySelector('.wrap');
    const toggle = shadow.getElementById('wl-portal-toggle');

    const setOpen = (open) => {
      wrap.setAttribute('data-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    toggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = wrap.getAttribute('data-open') === 'true';
      setOpen(!isOpen);
    });

    document.addEventListener('click', (event) => {
      if (!host.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    });

    const syncFullscreen = () => {
      const fs = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
      host.style.display = fs ? 'none' : 'block';
    };
    document.addEventListener('fullscreenchange', syncFullscreen);
    document.addEventListener('webkitfullscreenchange', syncFullscreen);
    syncFullscreen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
