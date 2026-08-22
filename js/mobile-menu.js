(function () {
    var headerContainer = document.querySelector('#header .pc > .container');
    var nav = document.querySelector('#header .nav');

    if (!headerContainer || !nav) return;

    var links = Array.prototype.slice.call(nav.querySelectorAll('a')).map(function (link) {
        return {
            href: link.getAttribute('href'),
            label: link.textContent.trim()
        };
    });

    var menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'mobile-menu-button';
    menuButton.setAttribute('aria-controls', 'mobile-menu-panel');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<span class="mobile-menu-button__lines" aria-hidden="true"><i></i><i></i><i></i></span><span>메뉴</span>';

    var panel = document.createElement('div');
    panel.id = 'mobile-menu-panel';
    panel.className = 'mobile-menu-panel';
    panel.setAttribute('aria-hidden', 'true');

    var panelInner = document.createElement('div');
    panelInner.className = 'mobile-menu-panel__inner';
    panelInner.innerHTML = '<div class="mobile-menu-panel__header"><h2>메뉴</h2><button type="button" class="mobile-menu-close" aria-label="메뉴 닫기">닫기</button></div>';

    var menuList = document.createElement('ul');
    menuList.className = 'mobile-menu-list';

    links.forEach(function (item) {
        var listItem = document.createElement('li');
        var link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.label;
        listItem.appendChild(link);
        menuList.appendChild(listItem);
    });


    var mypageItem = document.createElement('li');
    mypageItem.className = 'mobile-menu-list__mypage';
    mypageItem.innerHTML = '<a href="mypage.html">마이페이지</a>';
    menuList.appendChild(mypageItem);

    panelInner.appendChild(menuList);
    panel.appendChild(panelInner);
    document.body.appendChild(panel);
    headerContainer.insertBefore(menuButton, nav);

    var closeButton = panel.querySelector('.mobile-menu-close');

    function setMenu(open) {
        menuButton.setAttribute('aria-expanded', String(open));
        panel.setAttribute('aria-hidden', String(!open));
        document.body.classList.toggle('mobile-menu-open', open);
        if (open) closeButton.focus();
        else menuButton.focus();
    }

    menuButton.addEventListener('click', function () {
        setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    closeButton.addEventListener('click', function () {
        setMenu(false);
    });

    panel.addEventListener('click', function (event) {
        if (event.target === panel) setMenu(false);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
            setMenu(false);
        }
    });
}());
