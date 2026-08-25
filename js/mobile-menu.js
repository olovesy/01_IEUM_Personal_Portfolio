(function () {
  document.documentElement.classList.add("js-enabled");

  var header = document.getElementById("header");
  if (!header) return;

  var headerInner = header.querySelector(".pc > .container");
  var desktopNav = header.querySelector(".nav");
  var mypageLink = header.querySelector(".subnav a");
  if (!headerInner || !desktopNav) return;

  var button = document.createElement("button");
  button.className = "mobile-menu-button";
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "mobile-menu-panel");
  button.innerHTML = '<span class="mobile-menu-icon" aria-hidden="true"><span></span><span></span><span></span></span><span>메뉴</span>';

  var overlay = document.createElement("button");
  overlay.className = "mobile-menu-overlay";
  overlay.type = "button";
  overlay.setAttribute("aria-label", "메뉴 닫기");
  overlay.tabIndex = -1;

  var panel = document.createElement("aside");
  panel.className = "mobile-menu-panel";
  panel.id = "mobile-menu-panel";
  panel.setAttribute("aria-label", "모바일 메뉴");
  panel.setAttribute("aria-hidden", "true");

  var heading = document.createElement("div");
  heading.className = "mobile-menu-heading";
  heading.innerHTML = '<strong>전체 메뉴</strong><button class="mobile-menu-close" type="button">닫기</button>';

  var list = document.createElement("nav");
  list.className = "mobile-menu-list";
  list.setAttribute("aria-label", "모바일 주요 메뉴");

  desktopNav.querySelectorAll("a").forEach(function (link) {
    list.appendChild(link.cloneNode(true));
  });

  if (mypageLink) {
    var mobileMypage = mypageLink.cloneNode(true);
    mobileMypage.classList.add("mobile-menu-mypage");
    list.appendChild(mobileMypage);
  }

  panel.appendChild(heading);
  panel.appendChild(list);
  headerInner.appendChild(button);
  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  var closeButton = panel.querySelector(".mobile-menu-close");

  function openMenu() {
    button.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
    overlay.classList.add("is-open");
    panel.classList.add("is-open");
    document.body.classList.add("mobile-menu-open");
    closeButton.focus();
  }

  function closeMenu() {
    button.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    overlay.classList.remove("is-open");
    panel.classList.remove("is-open");
    document.body.classList.remove("mobile-menu-open");
    button.focus();
  }

  button.addEventListener("click", openMenu);
  closeButton.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
  panel.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && panel.classList.contains("is-open")) closeMenu();
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768 && panel.classList.contains("is-open")) closeMenu();
  });
})();
