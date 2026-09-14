/* ============================================================
   柳卿烟 · 个人博客  ——  交互脚本（koharu / Shoka 风格）
   原生 JS，零依赖。所有功能均为渐进增强：
   脚本失效时页面依然可正常阅读与导航。
   ============================================================ */
(function () {
  "use strict";

  var root = document.documentElement;
  var LS = {
    theme: "lqy-theme"
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

  /* ---------- 1. 主题切换（浅色 / 深色二态 + View Transition 圆形扩散） ---------- */

  function currentTheme() {
    return read(LS.theme) === "dark" ? "dark" : "light";
  }
  function resolvedTheme() {
    var saved = read(LS.theme);
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme(mode) {
    root.setAttribute("data-theme", mode);
    store(LS.theme, mode === "dark" ? "dark" : "light");
  }

  // 初始化：NOFLASH 已在 <head> 设置了 data-theme，这里只补 no-JS 情况
  if (!root.getAttribute("data-theme")) {
    root.setAttribute("data-theme", resolvedTheme());
  }

  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function (e) {
      var next = currentTheme() === "dark" ? "light" : "dark";
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // View Transitions：从点击位置圆形扩散（koharu 的标志性切换动画）
      if (!document.startViewTransition || reduce) {
        applyTheme(next);
        return;
      }
      var x = e.clientX || window.innerWidth / 2;
      var y = e.clientY || 0;
      var vt = document.startViewTransition(function () { applyTheme(next); });
      vt.ready.then(function () {
        var radius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        document.documentElement.animate(
          {
            clipPath: [
              "circle(0px at " + x + "px " + y + "px)",
              "circle(" + radius + "px at " + x + "px " + y + "px)"
            ]
          },
          {
            duration: 480,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)"
          }
        );
      }).catch(function () { /* 动画失败不影响切换 */ });
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (!read(LS.theme)) {
      root.setAttribute("data-theme", resolvedTheme());
    }
  });

  /* ---------- 2. 顶栏吸顶 + 阅读进度 ---------- */

  var header = document.getElementById("site-header");
  var progress = document.getElementById("scroll-progress");
  var toTop = document.getElementById("to-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) {
      if (y > 24) header.setAttribute("data-scrolled", "");
      else header.removeAttribute("data-scrolled");
    }
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + "%";
    }
    if (toTop) toTop.classList.toggle("is-visible", y > 420);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 3. 复制链接（cover 按钮 + 文章页按钮） ---------- */

  function bindCopy(btn, getText, okLabel, failLabel) {
    if (!btn || btn.dataset.copyReady) return;
    btn.dataset.copyReady = "true";
    btn.addEventListener("click", function () {
      var value = getText();
      var done = function () {
        var live = btn.querySelector('[aria-live]');
        if (live) live.textContent = okLabel;
        btn.title = okLabel;
        setTimeout(function () {
          if (live) live.textContent = "";
          btn.title = failLabel;
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done, function () {
          window.prompt(failLabel, value);
        });
      } else {
        window.prompt(failLabel, value);
      }
    });
  }

  document.querySelectorAll(".cover-copy-link").forEach(function (btn) {
    bindCopy(btn, function () { return window.location.href; },
      btn.dataset.copiedLabel || "已复制", btn.dataset.copyLabel || "复制页面链接");
  });

  var copyLink = document.getElementById("copy-link");
  if (copyLink) {
    bindCopy(copyLink, function () { return copyLink.dataset.url || window.location.href; },
      "已复制", "复制链接");
  }

  /* ---------- 4. 图片灯箱 ---------- */

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

  /* ---------- 5. 文章目录高亮 ---------- */

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

  /* ---------- 6. 搜索（本地索引 + 键盘操作） ---------- */

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
    return safe.replace(re, "<mark>$1</mark>");
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

  /* ---------- 7. 标签 / 分类筛选 ---------- */

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
  }
  applyFilter();

  /* ---------- 8. 评论（giscus）主题联动 ---------- */

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

  /* ---------- 9. 进场动画（reveal） ---------- */

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-shown");
          ro.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-shown"); });
  }

  /* ---------- 10. 页脚年份 ---------- */

  document.querySelectorAll("[data-year]").forEach(function (n) {
    n.textContent = new Date().getFullYear();
  });
})();
