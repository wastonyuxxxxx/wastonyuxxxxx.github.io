(() => {
  const root = document.body.dataset.staticRoot || "./";
  const go = (path = "") => window.location.assign(`${root}${path}`);
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("wa-theme", theme); } catch { /* no storage */ }
  };
  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
  document.querySelector(".mark")?.addEventListener("click", () => go());

  const dotTargets = ["proj-0", "proj-1", "experiments", "experiments", "experiments", "experiments", "experiments", "experiments"];
  document.querySelectorAll(".dot button").forEach((button, index) => {
    button.addEventListener("click", () => {
      document.getElementById(dotTargets[index])?.scrollIntoView({
        behavior: reduceMotion() ? "auto" : "smooth",
        block: "center",
      });
    });
  });

  const overlay = document.querySelector(".menu-overlay");
  const openMenu = () => {
    overlay?.classList.add("is-open");
    overlay?.setAttribute("aria-hidden", "false");
  };
  const closeMenu = () => {
    overlay?.classList.remove("is-open", "projects-open");
    overlay?.setAttribute("aria-hidden", "true");
  };
  document.querySelector(".menu-btn")?.addEventListener("click", openMenu);
  overlay?.querySelector(".menu-close")?.addEventListener("click", closeMenu);

  const mainItems = overlay?.querySelectorAll(".menu-item.m-main") ?? [];
  mainItems[0]?.addEventListener("click", () => go());
  mainItems[1]?.addEventListener("click", () => overlay?.classList.toggle("projects-open"));
  mainItems[2]?.addEventListener("click", () => {
    closeMenu();
    if (document.getElementById("about")) {
      document.getElementById("about")?.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth" });
    } else {
      go("#about");
    }
  });

  const projectPaths = ["projects/photo-abstract-editorial/", "projects/starlink/"];
  overlay?.querySelectorAll(".menu-item.m-sub").forEach((item, index) => {
    item.addEventListener("click", () => go(projectPaths[index]));
  });

  const tools = [
    ["Course Video Understanding", "语音转录 + 关键帧 + 结构化笔记流水线", "把长视频中的音频内容和画面证据组织为可检索、可复习的课程资料。"],
    ["iCost Bill Converter", "LLM 分类 + 本地规则 + 低置信度人工复核", "将原始账单转化为可用的个人记账数据，并保留可复核依据。"],
    ["iCourse Support", "浏览器会话 + 下载状态检查 + 安全续传", "为个人已获访问权限的课程内容建立下载状态管理、恢复和校验流程。"],
    ["AutoTheme", "PowerShell + 计划任务 + 系统状态同步", "让 Windows 深浅色主题在固定时间自动切换。"],
    ["Files Organization", "先验证内容，再决定移动、保留或删除", "把文件整理变成可验证、可恢复的流程。"],
    ["LaTeX Resume Builder", "版式约束 + LaTeX 排版 + 渲染检查", "从结构化信息生成稳定的一页简历 PDF。"],
  ];
  const showTool = (tool) => {
    const shade = document.createElement("div");
    shade.className = "modal-overlay";
    shade.innerHTML = `<div class="modal-panel" role="dialog" aria-modal="true" aria-label="${tool[0]}"><button class="modal-close" aria-label="Close">×</button><div class="m-top"><span class="exp-icon">✦</span><h3></h3></div><span class="logic-chip"></span><div class="m-block"><h4>About</h4><p></p></div></div>`;
    shade.querySelector("h3").textContent = tool[0];
    shade.querySelector(".logic-chip").textContent = tool[1];
    shade.querySelector(".m-block p").textContent = tool[2];
    const close = () => shade.remove();
    shade.querySelector(".modal-close")?.addEventListener("click", close);
    shade.addEventListener("mousedown", (event) => { if (event.target === shade) close(); });
    document.body.append(shade);
  };
  document.querySelectorAll(".exp-card").forEach((card, index) => card.addEventListener("click", () => showTool(tools[index])));

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelector(".modal-overlay")?.remove();
      closeMenu();
    }
  });
})();
