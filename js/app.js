/* ==========================================
   MacaoFun - 澳門活動策展平台
   主要 JavaScript 邏輯
   ========================================== */

// ── 活動資料庫 ──
const EVENTS = [
  {
    id: 1,
    title: "澳門國際音樂節 2025",
    category: "music",
    categoryLabel: "音樂",
    date: "2025-10-15",
    dateLabel: "10月15日 - 11月2日",
    time: "19:30",
    venue: "澳門文化中心",
    district: "南灣",
    price: 280,
    priceLabel: "MOP 280 起",
    desc: "匯聚世界頂尖音樂家的年度盛會，古典樂、爵士樂與當代音樂交融，在大灣區最璀璨的夜空下共鳴。",
    tags: ["古典音樂", "爵士樂", "室內樂"],
    emoji: "🎵",
    colorClass: "color-music",
    aiPick: true,
    aiReason: "根據您的歷史喜好，您可能對古典音樂類活動感興趣",
    featured: true,
    hot: true
  },
  {
    id: 2,
    title: "大三巴夜間文化導賞",
    category: "culture",
    categoryLabel: "文化",
    date: "2025-10-20",
    dateLabel: "每週六晚",
    time: "20:00",
    venue: "大三巴牌坊",
    district: "澳門半島",
    price: 0,
    priceLabel: "免費",
    desc: "在燈光映照下，走進澳門四百年歷史，葡式建築與中式文化在石板路上交織，資深導賞員帶你重新認識這座城市。",
    tags: ["歷史", "世遺", "夜間活動"],
    emoji: "🏛️",
    colorClass: "color-culture",
    aiPick: true,
    aiReason: "深受本地居民及文化愛好者好評",
    featured: false,
    hot: false
  },
  {
    id: 3,
    title: "路氹美食節",
    category: "food",
    categoryLabel: "美食",
    date: "2025-10-25",
    dateLabel: "10月25日 - 10月27日",
    time: "12:00 - 22:00",
    venue: "路氹城廣場",
    district: "路氹",
    price: 0,
    priceLabel: "免費入場",
    desc: "50+ 澳門本地餐廳與街頭食攤匯聚，澳門土生葡菜、廣東小食、國際料理一次過品嚐，配合現場音樂表演。",
    tags: ["美食", "土生葡菜", "街頭小食"],
    emoji: "🍜",
    colorClass: "color-food",
    aiPick: true,
    aiReason: "週末家庭活動熱門推薦",
    featured: false,
    hot: true
  },
  {
    id: 4,
    title: "當代藝術展：灣區想象",
    category: "art",
    categoryLabel: "藝術",
    date: "2025-10-10",
    dateLabel: "10月10日 - 12月15日",
    time: "10:00 - 18:00",
    venue: "澳門藝術博物館",
    district: "澳門半島",
    price: 50,
    priceLabel: "MOP 50",
    desc: "大灣區新生代藝術家聯展，探索城市化、身份認同與技術變遷的視覺對話，互動裝置藝術令人耳目一新。",
    tags: ["當代藝術", "裝置藝術", "大灣區"],
    emoji: "🎨",
    colorClass: "color-art",
    aiPick: false,
    aiReason: "",
    featured: false,
    hot: false
  },
  {
    id: 5,
    title: "澳門格蘭披治大賽車",
    category: "sports",
    categoryLabel: "體育",
    date: "2025-11-20",
    dateLabel: "11月20日 - 11月23日",
    time: "全日",
    venue: "東望洋賽車跑道",
    district: "澳門半島",
    price: 350,
    priceLabel: "MOP 350 起",
    desc: "澳門最具標誌性的年度體育盛事，世界頂級車手在城市街道賽道上角逐，震撼的引擎轟鳴聲響徹全城。",
    tags: ["賽車", "F3", "年度盛事"],
    emoji: "🏎️",
    colorClass: "color-sports",
    aiPick: false,
    aiReason: "",
    featured: false,
    hot: true
  },
  {
    id: 6,
    title: "媽閣廟傳統節慶活動",
    category: "festival",
    categoryLabel: "節慶",
    date: "2025-10-31",
    dateLabel: "10月31日",
    time: "09:00 - 21:00",
    venue: "媽閣廟",
    district: "澳門半島",
    price: 0,
    priceLabel: "免費",
    desc: "延續數百年的傳統廟會文化，祭祀儀式、傳統音樂表演、舞獅舞龍，感受澳門深厚的民間信仰與風俗。",
    tags: ["傳統文化", "廟會", "非遺"],
    emoji: "🏮",
    colorClass: "color-festival",
    aiPick: false,
    aiReason: "",
    featured: false,
    hot: false
  },
  {
    id: 7,
    title: "氹仔老城夜市",
    category: "night",
    categoryLabel: "夜生活",
    date: "2025-10-01",
    dateLabel: "每晚開放",
    time: "18:00 - 00:00",
    venue: "氹仔官也街",
    district: "氹仔",
    price: 0,
    priceLabel: "免費入場",
    desc: "在葡式建築圍繞下的露天夜市，手工藝品、澳門特色紀念品、現調飲品，配合本地樂隊現場演出，週末限定。",
    tags: ["夜市", "手工藝", "氹仔"],
    emoji: "🌙",
    colorClass: "color-night",
    aiPick: false,
    aiReason: "",
    featured: false,
    hot: false
  },
  {
    id: 8,
    title: "世遺路線步行之旅",
    category: "tour",
    categoryLabel: "導覽",
    date: "2025-10-01",
    dateLabel: "每日上午",
    time: "09:30",
    venue: "議事亭前地出發",
    district: "澳門半島",
    price: 120,
    priceLabel: "MOP 120",
    desc: "專業英語、普通話導覽員帶領，2.5小時深度遊覽澳門歷史城區22個世遺景點，配備官方認可的沉浸式解說。",
    tags: ["世遺", "步行", "導覽"],
    emoji: "🗺️",
    colorClass: "color-tour",
    aiPick: false,
    aiReason: "",
    featured: false,
    hot: false
  },
  {
    id: 9,
    title: "本地獨立音樂市集",
    category: "music",
    categoryLabel: "音樂",
    date: "2025-10-18",
    dateLabel: "10月18日 - 10月19日",
    time: "14:00 - 21:00",
    venue: "塔石廣場",
    district: "澳門半島",
    price: 0,
    priceLabel: "免費",
    desc: "支持本地音樂人！20+ 本澳獨立樂隊輪番演出，黑膠唱片市集、樂器攤位、音樂周邊，一個充滿活力的音樂社區節。",
    tags: ["獨立音樂", "市集", "本地"],
    emoji: "🎸",
    colorClass: "color-music",
    aiPick: false,
    aiReason: "",
    featured: false,
    hot: false
  }
];

// ── 狀態管理 ──
const state = {
  currentCategory: 'all',
  searchQuery: '',
  sortBy: 'date',
  savedEvents: new Set(),
  displayCount: 6,
  language: 'zh'
};

// ── DOM 工具函數 ──
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── 初始化 ──
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initCategories();
  initSort();
  renderAIPicks();
  renderEvents();
  initMobileNav();
  initScrollEffects();
});

// ── 搜尋功能 ──
function initSearch() {
  const inputs = $$('input[data-search]');
  inputs.forEach(input => {
    input.addEventListener('input', debounce((e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      state.displayCount = 6;
      renderEvents();
    }, 300));
  });
}

// ── 分類篩選 ──
function initCategories() {
  $$('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.category;
      state.displayCount = 6;
      renderEvents();
    });
  });
}

// ── 排序 ──
function initSort() {
  const sel = $('select[data-sort]');
  if (sel) {
    sel.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderEvents();
    });
  }
}

// ── 篩選 & 排序邏輯 ──
function getFilteredEvents() {
  let events = [...EVENTS];

  if (state.currentCategory !== 'all') {
    events = events.filter(e => e.category === state.currentCategory);
  }

  if (state.searchQuery) {
    events = events.filter(e =>
      e.title.toLowerCase().includes(state.searchQuery) ||
      e.desc.toLowerCase().includes(state.searchQuery) ||
      e.venue.toLowerCase().includes(state.searchQuery) ||
      e.district.toLowerCase().includes(state.searchQuery) ||
      e.tags.some(t => t.toLowerCase().includes(state.searchQuery))
    );
  }

  events.sort((a, b) => {
    if (state.sortBy === 'price-asc') return a.price - b.price;
    if (state.sortBy === 'price-desc') return b.price - a.price;
    if (state.sortBy === 'hot') return (b.hot ? 1 : 0) - (a.hot ? 1 : 0);
    return new Date(a.date) - new Date(b.date);
  });

  return events;
}

// ── AI 精選渲染 ──
function renderAIPicks() {
  const container = $('#ai-picks-container');
  if (!container) return;

  const picks = EVENTS.filter(e => e.aiPick);
  const [featured, ...rest] = picks;

  container.innerHTML = '';

  // 大卡
  container.appendChild(createEventCard(featured, { dark: true, featured: true, showAiBadge: true }));

  // 小卡
  const smallWrap = document.createElement('div');
  smallWrap.style.cssText = 'display:contents';
  rest.forEach(e => {
    container.appendChild(createEventCard(e, { dark: true, showAiBadge: true }));
  });
}

// ── 活動列表渲染 ──
function renderEvents() {
  const container = $('#events-container');
  const countEl = $('#events-count');
  if (!container) return;

  const events = getFilteredEvents();
  const visible = events.slice(0, state.displayCount);

  if (countEl) {
    countEl.innerHTML = `共找到 <strong>${events.length}</strong> 個活動`;
  }

  container.innerHTML = '';

  if (events.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <div class="icon">🔍</div>
        <h3>找不到相關活動</h3>
        <p>試試其他關鍵字或分類</p>
      </div>`;
    return;
  }

  visible.forEach(e => container.appendChild(createEventCard(e)));

  const loadMoreBtn = $('#load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = events.length > state.displayCount ? 'inline-flex' : 'none';
    loadMoreBtn.onclick = () => {
      state.displayCount += 3;
      renderEvents();
    };
  }
}

// ── 建立活動卡片 ──
function createEventCard(event, opts = {}) {
  const { dark = false, featured = false, showAiBadge = false } = opts;
  const isSaved = state.savedEvents.has(event.id);

  const card = document.createElement('article');
  card.className = `event-card${dark ? ' dark' : ''}${featured ? ' featured' : ''}`;
  card.setAttribute('data-id', event.id);
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', event.title);

  const priceClass = event.price === 0 ? 'card-price free' : 'card-price';
  const hotBadge = event.hot ? '<span class="card-ai-chip">🔥 熱門</span>' : '';
  const aiBadge = showAiBadge ? '<span class="card-ai-chip">✨ AI 精選</span>' : '';

  card.innerHTML = `
    <div class="card-img-placeholder ${event.colorClass}">
      <span>${event.emoji}</span>
      <span class="card-category-chip">${event.categoryLabel}</span>
      ${hotBadge || aiBadge}
    </div>
    <div class="card-body">
      <h3>${event.title}</h3>
      <p class="card-desc">${event.desc}</p>
      <div class="card-meta">
        <span>📅 ${event.dateLabel}</span>
        <span>📍 ${event.venue}</span>
      </div>
      <div class="card-footer">
        <span class="${priceClass}">${event.priceLabel}</span>
        <button class="save-btn${isSaved ? ' saved' : ''}" aria-label="收藏" data-save="${event.id}">
          ${isSaved ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  `;

  // 收藏功能
  card.querySelector('[data-save]').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSave(event.id, e.currentTarget);
  });

  // 點擊跳轉
  card.addEventListener('click', () => openEventDetail(event));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openEventDetail(event);
  });

  return card;
}

// ── 收藏切換 ──
function toggleSave(id, btn) {
  if (state.savedEvents.has(id)) {
    state.savedEvents.delete(id);
    btn.classList.remove('saved');
    btn.textContent = '🤍';
    showToast('已取消收藏');
  } else {
    state.savedEvents.add(id);
    btn.classList.add('saved');
    btn.textContent = '❤️';
    showToast('已加入收藏 ❤️');
  }
}

// ── 活動詳情（Lightbox） ──
function openEventDetail(event) {
  const existing = $('#event-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'event-modal';
  modal.style.cssText = `
    position:fixed; inset:0; z-index:300;
    background:rgba(26,26,46,0.85);
    backdrop-filter:blur(8px);
    display:flex; align-items:center; justify-content:center;
    padding:24px; animation:fadeIn 0.2s ease;
  `;

  const priceClass = event.price === 0 ? 'card-price free' : 'card-price';

  modal.innerHTML = `
    <style>@keyframes fadeIn{from{opacity:0}to{opacity:1}}</style>
    <div style="
      background:white; border-radius:20px; max-width:580px; width:100%;
      max-height:90vh; overflow-y:auto; position:relative;
    ">
      <div class="card-img-placeholder ${event.colorClass}" style="aspect-ratio:16/7;border-radius:20px 20px 0 0;font-size:5rem;">
        ${event.emoji}
        <span class="card-category-chip">${event.categoryLabel}</span>
        ${event.aiPick ? '<span class="card-ai-chip">✨ AI 精選</span>' : ''}
      </div>
      <div style="padding:28px">
        <h2 style="margin-bottom:10px">${event.title}</h2>
        ${event.aiPick ? `<div class="ai-badge" style="margin-bottom:16px">🤖 ${event.aiReason}</div>` : ''}
        <p style="color:var(--text-sub);margin-bottom:20px;line-height:1.7">${event.desc}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
          <div style="background:var(--gray-light);padding:14px;border-radius:12px">
            <div style="font-size:11px;color:var(--gray-dark);font-weight:700;letter-spacing:.5px;margin-bottom:4px">日期時間</div>
            <div style="font-weight:600">${event.dateLabel}</div>
            <div style="font-size:13px;color:var(--text-sub)">${event.time}</div>
          </div>
          <div style="background:var(--gray-light);padding:14px;border-radius:12px">
            <div style="font-size:11px;color:var(--gray-dark);font-weight:700;letter-spacing:.5px;margin-bottom:4px">地點</div>
            <div style="font-weight:600">${event.venue}</div>
            <div style="font-size:13px;color:var(--text-sub)">${event.district}</div>
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px">
          ${event.tags.map(t => `<span style="background:var(--gray-light);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;color:var(--text-sub)">#${t}</span>`).join('')}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:12px;color:var(--gray-dark)">票價</div>
            <div class="${priceClass}" style="font-size:1.2rem">${event.priceLabel}</div>
          </div>
          <button onclick="showToast('即將開放購票功能 🎫')" style="
            background:var(--red);color:white;padding:12px 28px;
            border-radius:12px;font-size:14px;font-weight:700;
            cursor:pointer;border:none;
            transition:background 0.2s;
          " onmouseover="this.style.background='var(--red-dark)'" onmouseout="this.style.background='var(--red)'">
            ${event.price === 0 ? '免費參加' : '立即購票'}
          </button>
        </div>
      </div>
      <button id="modal-close" style="
        position:absolute;top:16px;right:16px;
        width:36px;height:36px;border-radius:50%;
        background:rgba(0,0,0,0.4);color:white;
        font-size:18px;display:flex;align-items:center;justify-content:center;
        cursor:pointer;border:none;
      ">✕</button>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  const close = () => {
    modal.remove();
    document.body.style.overflow = '';
  };
  $('#modal-close').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
  });
}

// ── 手機導航 ──
function initMobileNav() {
  const openBtn = $('#mobile-nav-open');
  const nav = $('#mobile-nav');
  const closeBtn = $('#mobile-nav-close');
  if (!openBtn || !nav) return;

  openBtn.addEventListener('click', () => nav.classList.add('open'));
  closeBtn?.addEventListener('click', () => nav.classList.remove('open'));
}

// ── 滾動效果 ──
function initScrollEffects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  $$('.event-card, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ── Toast 通知 ──
function showToast(msg) {
  const existing = $('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ── Debounce ──
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
