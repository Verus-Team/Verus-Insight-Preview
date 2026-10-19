"use strict";

(() => {
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const $ = selector => document.querySelector(selector);
  const icons = {paper:"▤",code:"</>",model:"◇",dataset:"▦"};
  const dialog = $("#image-dialog");
  let imageTrigger = null;

  function authors(project) {
    $("#paper-title").textContent = project.title;
    $("#authors").innerHTML = `<ul class="author-list">${project.authors.map(author => `<li>${escapeHTML(author.name)}${author.marks ? `<sup>${escapeHTML(author.marks)}</sup>` : ""}</li>`).join("")}</ul><p class="affiliations">${project.affiliations.map(item => `<span><sup>${escapeHTML(item.id)}</sup>${escapeHTML(item.name)}</span>`).join("")}</p><p class="contributions">${project.contributions.map(item => `<span><sup>${escapeHTML(item.mark)}</sup> ${escapeHTML(item.label)}</span>`).join("")}</p>`;
  }

  function resources(items) {
    $("#resources").innerHTML = items.map(item => {
      const content = `<span class="resource-icon" aria-hidden="true">${escapeHTML(icons[item.id])}</span><span><strong>${escapeHTML(item.label)}</strong><small>${escapeHTML(item.caption || (item.published && item.url ? "Explore resource ↗" : "Coming soon"))}</small></span>`;
      // A planned release URL may be visited without claiming the asset is public.
      return item.url && (item.published || item.linkToRelease) ? `<a class="resource-button" href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">${content}</a>` : `<button class="resource-button" type="button" disabled aria-label="${escapeHTML(item.label)}: link pending">${content}</button>`;
    }).join("");
    $("#release-links").innerHTML = items.filter(item => item.id !== "paper" && item.url).map(item => `<a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer"><span class="release-link-icon" aria-hidden="true">${escapeHTML(icons[item.id])}</span><span><strong>${escapeHTML(item.releaseTitle || item.label)}</strong><small>${escapeHTML(item.releaseDescription || item.caption || "Project resource")}</small></span><span class="release-arrow" aria-hidden="true">↗</span></a>`).join("");
  }

  function figures(items) {
    document.querySelectorAll("[data-figure]").forEach(slot => {
      const figure = items[slot.dataset.figure];
      const caption = slot.dataset.caption || figure.alt;
      const priority = slot.dataset.priority === "high";
      slot.innerHTML = `<figure class="research-figure"><button class="figure-button" type="button" data-image="${escapeHTML(figure.image)}" data-original="${escapeHTML(figure.pdf)}" data-title="${escapeHTML(caption)}" aria-label="Enlarge: ${escapeHTML(caption)}"><img src="${escapeHTML(figure.image)}" alt="${escapeHTML(figure.alt)}" width="${figure.width}" height="${figure.height}" ${priority ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async"></button><figcaption><span>${escapeHTML(caption)}</span><a href="${escapeHTML(figure.pdf)}" target="_blank" rel="noopener noreferrer" aria-label="Original ${escapeHTML(figure.downloadLabel || 'PDF')}: ${escapeHTML(caption)}">${escapeHTML(figure.downloadLabel || 'PDF')} ↗</a></figcaption></figure>`;
    });
  }

  function categoryStatistics(statistics) {
    const rows = Object.entries(statistics.categories).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const largest = Math.max(...rows.map(row => row[1]));
    $("#category-counts").innerHTML = `<table class="category-table"><caption>Artifact categories · ${statistics.findings} findings</caption><thead><tr><th scope="col">Category</th><th scope="col">Findings</th></tr></thead><tbody>${rows.map(([name, count]) => `<tr><th scope="row">${escapeHTML(name)}</th><td><span class="category-bar" aria-hidden="true"><span style="width:${count / largest * 100}%"></span></span><span>${count}</span></td></tr>`).join("")}</tbody></table>`;
  }

  function header(key) {
    if (key === "detection") return `<tr><th rowspan="2" scope="col">Model</th><th class="dataset-head" colspan="3" scope="colgroup">Artifact-Bench</th><th rowspan="2" scope="col">RewardData<br>BA ↑</th><th rowspan="2" scope="col">ViF-Bench<br>BA ↑</th><th rowspan="2" scope="col">Verus-Bench<br>BA ↑</th></tr><tr><th scope="col">T1 · BA ↑</th><th scope="col">T2 · Acc. ↑</th><th scope="col">T3 · EM ↑</th></tr>`;
    if (key === "finding") return `<tr><th scope="col" rowspan="3">Model</th><th scope="colgroup" colspan="6" class="dataset-head">Verus-Bench</th><th scope="colgroup" colspan="6" class="dataset-head">RewardData</th></tr><tr>${["Plan","Finding","Plan","Finding"].map(label => `<th scope="colgroup" colspan="3" class="dataset-head">${label}</th>`).join("")}</tr><tr>${Array.from({length:4}, () => ["P ↑","R ↑","F1 ↑"].map(label => `<th scope="col">${label}</th>`).join("")).join("")}</tr>`;
    return `<tr><th scope="col" rowspan="2">Variant</th><th colspan="3" scope="colgroup" class="dataset-head">Verus-Bench</th><th colspan="3" scope="colgroup" class="dataset-head">RewardData</th></tr><tr>${["BA ↑","Plan F1 ↑","Finding F1 ↑","BA ↑","Plan F1 ↑","Finding F1 ↑"].map(label => `<th scope="col">${label}</th>`).join("")}</tr>`;
  }

  function results(tables) {
    const captions = {detection:"Video-level detection results (%)",finding:"Fine-grained planning and finding results (%)",ablation:"Ablation study of Verus-Insight (%)"};
    for (const [key, table] of Object.entries(tables)) {
      let group = "";
      const body = table.rows.map(row => {
        let groupRow = "";
        if (key !== "ablation" && row.group !== group) {
          group = row.group;
          groupRow = `<tr class="group-row"><th colspan="${row.cells.length + 1}">${escapeHTML(group)}</th></tr>`;
        }
        const cells = row.cells.map(cell => `<td>${cell.rank ? `<span class="rank-${escapeHTML(cell.rank)}">${escapeHTML(cell.value)}</span>` : escapeHTML(cell.value)}</td>`).join("");
        return `${groupRow}<tr${row.ours ? ' class="ours"' : ""}><th scope="row">${escapeHTML(row.model)}</th>${cells}</tr>`;
      }).join("");
      $(`#table-${key}`).innerHTML = `<p class="table-scroll-hint">All manuscript rows · Scroll horizontally on smaller screens →</p><div class="table-scroll" role="region" aria-label="${captions[key]}; horizontally scrollable" tabindex="0"><table class="${key}-table"><caption class="sr-only">${captions[key]}</caption><thead>${header(key)}</thead><tbody>${body}</tbody></table></div>`;
    }
  }

  function videos(items) {
    items = items.filter(item => item.src);
    $("#videos").hidden = items.length === 0;
    $("#video-grid").innerHTML = items.map(item => `<article class="video-card"><h3>${escapeHTML(item.title)}</h3>${item.src ? `<video controls playsinline preload="metadata" aria-label="${escapeHTML(item.title)}" ${item.poster ? `poster="${escapeHTML(item.poster)}"` : ""}><source src="${escapeHTML(item.src)}" type="${escapeHTML(item.type || "video/mp4")}">Your browser does not support this video.</video><p class="video-error" hidden>Video unavailable. <a href="${escapeHTML(item.src)}">Open the video file</a>.</p>` : `<div class="video-placeholder"><span aria-hidden="true">▷</span><p>Video coming soon</p></div>`}<p class="video-description">${escapeHTML(item.description)}</p></article>`).join("");
    document.querySelectorAll(".video-card video").forEach(video => {
      const showError = () => { video.nextElementSibling.hidden = false; };
      video.addEventListener("error", showError);
      video.querySelector("source").addEventListener("error", showError);
    });
  }

  function setupTabs() {
    document.querySelectorAll('[role="tablist"]').forEach(list => {
      const tabs = [...list.querySelectorAll('[role="tab"]')];
      const select = (tab, focus) => {
        tabs.forEach(other => {
          const active = other === tab;
          other.setAttribute("aria-selected",String(active));
          other.tabIndex = active ? 0 : -1;
          document.getElementById(other.getAttribute("aria-controls")).hidden = !active;
        });
        if (focus) tab.focus();
      };
      tabs.forEach((tab,index) => {
        tab.addEventListener("click", () => select(tab,false));
        tab.addEventListener("keydown", event => {
          let next;
          if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
          if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = tabs.length - 1;
          if (next !== undefined) {event.preventDefault(); select(tabs[next],true);}
        });
      });
    });
  }

  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-image]");
    if (!trigger) return;
    imageTrigger = trigger;
    $("#dialog-image").src = trigger.dataset.image;
    $("#dialog-image").alt = trigger.querySelector("img").alt;
    $("#image-title").textContent = trigger.dataset.title;
    $("#image-original").href = trigger.dataset.original;
    dialog.classList.remove("zoomed");
    $("#zoom-dialog").textContent = "Zoom in +";
    $("#zoom-dialog").setAttribute("aria-pressed","false");
    dialog.showModal();
    $(".dialog-image-scroll").scrollTo(0,0);
    $("#close-dialog").focus();
  });
  $("#close-dialog").addEventListener("click", () => dialog.close());
  $("#zoom-dialog").addEventListener("click", () => {
    const zoomed = dialog.classList.toggle("zoomed");
    $("#zoom-dialog").textContent = zoomed ? "Fit image −" : "Zoom in +";
    $("#zoom-dialog").setAttribute("aria-pressed",String(zoomed));
  });
  dialog.addEventListener("click", event => {
    const box = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
  });
  dialog.addEventListener("close", () => imageTrigger?.focus({preventScroll:true}));

  async function initialize() {
    try {
      const response = await fetch("data/site-content.json");
      if (!response.ok) throw new Error(`Site data returned HTTP ${response.status}`);
      const data = await response.json();
      authors(data.project);
      resources(data.resources);
      figures(data.figures);
      categoryStatistics(data.benchmark);
      results(data.tables);
      videos(data.videos || []);
      setupTabs();
      $("#load-status").hidden = true;
      document.documentElement.dataset.ready = "true";
      if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
    } catch (error) {
      $("#load-status").textContent = "The page content could not be loaded. Please reload. For a local preview, serve this folder over HTTP using the command in README.md.";
      console.error("Verus-Insight initialization:",error);
    }
  }
  initialize();
})();
