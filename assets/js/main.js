/* ============================================================
   柳卿烟 · 个人博客  ——  交互脚本
   原生 JS，零依赖。所有功能均为渐进增强：
   脚本失效时页面依然可正常阅读与导航。
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var LS = {
    theme: "lqy-theme",
    hue: "lqy-hue",
    texture: "lqy-texture"
  };

  function store(key, val) {
    try {
      if (val === null) localStorage.removeItem(key);
      else localStorage.setItem(key, val);
    } catch (e) { /* 隐私模式下忽略 */ }
  }
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  /* ---------- 1. 主题切换（浅色 / 深色 / 跟随系统） ---------- */

  var THEMES = ["light", "dark", "system"];
  var ICONS = {
    light: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-13a1 1 0 0 1 1 1v1.5a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 14a1 1 0 0 1 1 1V20a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM4 12a1 1 0 0 1 1-1h1.5a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Zm13.5 0a1 1 0 0 1 1-1H20a1 1 0 1 1 0 2h-1.5a1 1 0 0 1-1-1ZM6.34 6.34a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 1 1-1.41 1.41L6.34 7.76a1 1 0 0 1 0-1.42Zm9.9 9.9a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 1 1-1.41 1.41l-1.07-1.06a1 1 0 0 1 0-1.41Zm2.48-9.9a1 1 0 0 1 0 1.42l-1.06 1.06a1 1 0 1 1-1.41-1.41l1.06-1.07a1 1 0 0 1 1.41 0Zm-9.9 9.9a1 1 0 0 1 0 1.41L7.76 18.7a1 1 0 0 1-1.42-1.41l1.07-1.06a1 1 0 0 1 1.41 0Z"/></svg>',
    dark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.3 3a1 1 0 0 1 .35 1.06 6.5 6.5 0 0 0 7.3 8.06 1 1 0 0 1 1.13 1.4A9 9 0 1 1 11.4 2.9a1 1 0 0 1 .9.1Z"/></svg>',
    system: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-6v2h3a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2h3v-2H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v8h14V7H5Z"/></svg>'
  };
  var LABELS = { light: "浅色模式", dark: "深色模式", system: "跟随系统" };

  function currentTheme() {
    var s = read(LS.theme);
    return THEMES.indexOf(s) >= 0 ? s : "system";
  }
  function resolvedTheme(pref) {
    if (pref !== "system") return pref;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function paintThemeBtn() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var pref = currentTheme();
    btn.innerHTML = ICONS[pref];
    var title = LABELS[pref] + "（点击切换）";
    btn.title = title;
    btn.setAttribute("aria-label", title);
  }
  function applyTheme(pref) {
    root.setAttribute("data-theme", resolvedTheme(pref));
    if (pref === "system") store(LS.theme, null);
    else store(LS.theme, pref);
    paintThemeBtn();
  }

  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    paintThemeBtn();
    themeBtn.addEventListener("click", function () {
      var next = THEMES[(THEMES.indexOf(currentTheme()) + 1) % THEMES.length];
      applyTheme(next);
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (currentTheme() === "system") {
      root.setAttribute("data-theme", resolvedTheme("system"));
    }
  });

  /* ---------- 2. 色相（主题色）切换 ---------- */

  var HUES = [
    { v: 315, name: "樱粉" },
    { v: 350, name: "绯红" },
    { v: 30, name: "暖橘" },
    { v: 160, name: "薄荷" },
    { v: 205, name: "青空" },
    { v: 265, name: "紫罗兰" }
  ];

  var savedHue = read(LS.hue);
  if (savedHue) root.style.setProperty("--h", savedHue);

  var huePop = document.getElementById("hue-popover");
  var hueBtn = document.getElementById("hue-toggle");
  if (huePop) {
    huePop.innerHTML = HUES.map(function (h) {
      return '<button type="button" class="hue-chip" data-hue="' + h.v + '" title="' + h.name + '">' +
        '<span class="hue-chip__dot" style="background:hsl(' + h.v + ' 62% 52%)"></span>' + h.name + "</button>";
    }).join("");
    huePop.addEventListener("click", function (e) {
      var b = e.target.closest(".hue-chip");
      if (!b) return;
      var v = b.getAttribute("data-hue");
      root.style.setProperty("--h", v);
      store(LS.hue, v);
      huePop.classList.remove("is-open");
      if (hueBtn) hueBtn.setAttribute("aria-expanded", "false");
    });
  }
  if (hueBtn && huePop) {
    hueBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = huePop.classList.toggle("is-open");
      hueBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!huePop.contains(e.target) && e.target !== hueBtn) {
        huePop.classList.remove("is-open");
        hueBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 3. 纹理开关 ---------- */

  if (read(LS.texture) === "off") root.setAttribute("data-texture", "off");
  var texBtn = document.getElementById("texture-toggle");
  if (texBtn) {
    var syncTex = function () {
      var off = root.getAttribute("data-texture") === "off";
      texBtn.setAttribute("aria-pressed", off ? "false" : "true");
      texBtn.title = off ? "开启背景纹理" : "关闭背景纹理";
    };
    syncTex();
    texBtn.addEventListener("click", function () {
      var off = root.getAttribute("data-texture") === "off";
      if (off) {
        root.removeAttribute("data-texture");
        store(LS.texture, null);
      } else {
        root.setAttribute("data-texture", "off");
        store(LS.texture, "off");
      }
      syncTex();
    });
  }

  /* ---------- 4. 顶栏吸顶 + 阅读进度 ---------- */

  var navbar = document.getElementById("navbar");
  var progress = document.getElementById("scroll-progress");
  var toTop = document.getElementById("to-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (navbar) navbar.classList.toggle("is-stuck", y > 24);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + "%";
    }
    if (toTop) toTop.classList.toggle("is-shown", y > 420);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 5. 首屏打字机 ---------- */

  var typer = document.getElementById("banner-typer");
  if (typer) {
    var lines = (typer.getAttribute("data-lines") || "").split("|").filter(Boolean);
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lines.length && !reduce) {
      var li = 0, ci = 0, del = false;
      var tick = function () {
        var cur = lines[li];
        if (!del) {
          ci++;
          typer.textContent = cur.slice(0, ci);
          if (ci >= cur.length) { del = true; return setTimeout(tick, 2200); }
        } else {
          ci--;
          typer.textContent = cur.slice(0, ci);
          if (ci <= 0) { del = false; li = (li + 1) % lines.length; return setTimeout(tick, 320); }
        }
        setTimeout(tick, del ? 34 : 92);
      };
      setTimeout(tick, 700);
    } else {
      typer.textContent = lines[0] || "";
    }
  }

  /* ---------- 6. 图片灯箱 ---------- */

  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    document.addEventListener("click", function (e) {
      var img = e.target.closest("[data-zoom]");
      if (!img) return;
      e.preventDefault();
      lbImg.src = img.getAttribute("data-zoom") || img.src;
      lbImg.alt = img.alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
    var closeLb = function () {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    lightbox.addEventListener("click", closeLb);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLb();
    });
  }

  /* ---------- 7. 文章目录高亮 ---------- */

  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  if (tocLinks.length) {
    var targets = tocLinks.map(function (a) {
      return document.getElementById(decodeURIComponent(a.getAttribute("href").slice(1)));
    });
    var spy = function () {
      var best = -1, bestTop = -Infinity;
      targets.forEach(function (t, i) {
        if (!t) return;
        var top = t.getBoundingClientRect().top - 120;
        if (top <= 0 && top > bestTop) { bestTop = top; best = i; }
      });
      if (best < 0) best = 0;
      tocLinks.forEach(function (a, i) { a.classList.toggle("is-active", i === best); });
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  /* ---------- 8. 搜索（本地索引 + 键盘操作） ---------- */

  var overlay = document.getElementById("search-overlay");
  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  var index = null, indexPromise = null, active = -1, items = [];

  // 索引里的 url 是相对站点根目录的（如 posts/foo.html），
  // 需要补上当前页面所在层级的前缀，否则文章页里会拼成 posts/posts/foo.html
  var rootPrefix = overlay
    ? (overlay.getAttribute("data-index") || "search.json").replace(/search\.json$/, "")
    : "";

  function href(url) {
    return rootPrefix + url;
  }

  function loadIndex() {
    if (indexPromise) return indexPromise;
    var url = (overlay && overlay.getAttribute("data-index")) || "search.json";
    indexPromise = fetch(url, { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error("index " + r.status); return r.json(); })
      .then(function (d) { index = Array.isArray(d) ? d : (d.items || []); return index; })
      .catch(function () { index = []; return index; });
    return indexPromise;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function hl(text, q) {
    var safe = escapeHtml(text);
    if (!q) return safe;
    var re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
    return safe.replace(re, "<em>$1</em>");
  }

  function render(q) {
    if (!results) return;
    q = (q || "").trim().toLowerCase();
    if (!q) {
      results.innerHTML = '<li class="search-empty">输入关键词，回车打开第一条结果</li>';
      items = []; active = -1;
      return;
    }
    var hits = index.filter(function (p) {
      return (p.title + " " + (p.tags || []).join(" ") + " " + p.description + " " + (p.body || ""))
        .toLowerCase().indexOf(q) >= 0;
    }).slice(0, 12);

    if (!hits.length) {
      results.innerHTML = '<li class="search-empty">没有找到与「' + escapeHtml(q) + '」相关的文章</li>';
      items = []; active = -1;
      return;
    }
    items = hits; active = 0;
    results.innerHTML = hits.map(function (p, i) {
      return '<li><a href="' + href(p.url) + '" class="' + (i === 0 ? "is-active" : "") + '">' +
        "<b>" + hl(p.title, q) + "</b><p>" + hl(p.description, q) + "</p></a></li>";
    }).join("");
  }

  function move(dir) {
    if (!items.length) return;
    active = (active + dir + items.length) % items.length;
    Array.prototype.forEach.call(results.querySelectorAll("a"), function (a, i) {
      a.classList.toggle("is-active", i === active);
      if (i === active) a.scrollIntoView({ block: "nearest" });
    });
  }

  function openSearch() {
    if (!overlay) return;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (input) { input.value = ""; }
    loadIndex().then(function () { render(""); });
    setTimeout(function () { if (input) input.focus(); }, 40);
  }
  function closeSearch() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-search-open]").forEach(function (b) {
    b.addEventListener("click", openSearch);
  });
  if (overlay) {
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeSearch(); });
  }
  if (input) {
    input.addEventListener("input", function () { render(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") {
        if (items[active]) window.location.href = href(items[active].url);
      } else if (e.key === "Escape") { closeSearch(); }
    });
  }

  document.addEventListener("keydown", function (e) {
    var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) ||
      document.activeElement.isContentEditable;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      overlay && overlay.classList.contains("is-open") ? closeSearch() : openSearch();
    } else if (e.key === "/" && !typing && !(overlay && overlay.classList.contains("is-open"))) {
      e.preventDefault();
      openSearch();
    } else if (e.key === "Escape" && overlay && overlay.classList.contains("is-open")) {
      closeSearch();
    }
  });

  /* ---------- 9. 标签 / 分类筛选 ---------- */

  function readParam(name) {
    var m = new RegExp("[?&]" + name + "=([^&#]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  function applyFilter() {
    var tag = readParam("tag");
    var cat = readParam("category");
    var key = tag || cat;
    if (!key) return;
    var nodes = document.querySelectorAll("[data-filter-tags], [data-filter-category]");
    var shown = 0;
    nodes.forEach(function (n) {
      var hay = (n.getAttribute("data-filter-tags") || "") + "|" + (n.getAttribute("data-filter-category") || "");
      var ok = hay.toLowerCase().indexOf(key.toLowerCase()) >= 0;
      n.style.display = ok ? "" : "none";
      if (ok) shown++;
    });
    var note = document.getElementById("filter-note");
    if (note) {
      if (shown === 0) {
        note.innerHTML = "没有匹配「" + escapeHtml(key) + "」的内容。";
      } else {
        note.innerHTML = "正在筛选：" + (tag ? "标签" : "分类") +
          ' <strong>' + escapeHtml(key) + "</strong> · 共 " + shown + " 项 · " +
          '<a href="./">清除筛选</a>';
      }
      note.hidden = false;
    }
    document.querySelectorAll(".m3-chip--tonal").forEach(function (c) {
      c.classList.toggle("m3-chip--active", c.getAttribute("data-filter-key") === key);
    });
  }
  applyFilter();

  /* ---------- 11. 评论（giscus）主题联动 ---------- */

  function giscusTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function syncGiscus() {
    var frame = document.querySelector("iframe.giscus-frame");
    if (!frame) return;
    try {
      frame.contentWindow.postMessage(
        { giscus: { setConfig: { theme: giscusTheme() } } }, "https://giscus.app");
    } catch (e) { /* iframe 就绪前可能失败，静默 */ }
  }
  new MutationObserver(function () { syncGiscus(); })
    .observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  window.addEventListener("load", function () {
    setTimeout(syncGiscus, 1200);
    setTimeout(syncGiscus, 3200);
  });

  /* ---------- 12. 樱花飘落 ---------- */

  (function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var cv = document.createElement("canvas");
    cv.id = "sakura-canvas";
    cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    var ctx = cv.getContext("2d");
    if (!ctx) return;
    var W = 0, H = 0, petals = [], tick = 0, hue = 315;

    function resize() {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function Petal(init) { this.reset(init); }
    Petal.prototype.reset = function (init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : -24;
      this.s = 4.5 + Math.random() * 7;
      this.vy = 0.35 + Math.random() * 0.85;
      this.vx = -0.35 + Math.random() * 0.7;
      this.ph = Math.random() * Math.PI * 2;
      this.rot = Math.random() * Math.PI * 2;
      this.vr = (-0.5 + Math.random()) * 0.02;
      this.o = 0.28 + Math.random() * 0.38;
    };
    var N = Math.min(16, Math.max(7, Math.round(window.innerWidth / 100)));
    for (var i = 0; i < N; i++) petals.push(new Petal(true));

    function readHue() {
      var v = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue("--h"), 10);
      if (!isNaN(v)) hue = v;
    }
    readHue();

    var running = true;
    window.addEventListener("beforeprint", function () { running = false; });
    window.addEventListener("afterprint", function () { running = true; });
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
    });

    function frame() {
      requestAnimationFrame(frame);
      if (!running) return;
      tick++;
      if (tick % 90 === 0) readHue();
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        p.ph += 0.02;
        p.rot += p.vr;
        p.x += p.vx + Math.sin(p.ph) * 0.55;
        p.y += p.vy;
        if (p.y > H + 24 || p.x < -32 || p.x > W + 32) p.reset(false);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.o;
        ctx.fillStyle = "hsl(" + hue + " 78% 80%)";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.s, p.s * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    requestAnimationFrame(frame);
  })();

  /* ---------- 10. 页脚年份 ---------- */

  document.querySelectorAll("[data-year]").forEach(function (n) {
    n.textContent = new Date().getFullYear();
  });
})();
