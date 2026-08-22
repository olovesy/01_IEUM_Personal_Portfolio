(function () {
  var endpoint = "/api/trpc/posts.home?input=" + encodeURIComponent(JSON.stringify({ json: null }));
  function escapeHtml(value) { return String(value || "").replace(/[&<>\"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" })[c]; }); }
  function date(value) { return value ? new Date(value).toLocaleDateString("ko-KR") : ""; }
  fetch(endpoint).then(function (response) { return response.json(); }).then(function (payload) {
    var data = payload && payload.result && payload.result.data && (payload.result.data.json || payload.result.data);
    if (!data) return;
    var latest = data.latest || [];
    var popular = data.popular || [];
    var notices = document.getElementById("latest-notices");
    if (notices && latest.length) notices.innerHTML = latest.slice(0, 3).map(function (post) { return '<article class="data_card"><span>' + escapeHtml(post.categoryName) + '</span><h3>' + escapeHtml(post.title) + '</h3><p>' + escapeHtml(post.excerpt || post.content) + '</p><small>' + escapeHtml(post.authorName || "이음 회원") + ' · ' + date(post.createdAt) + '</small></article>'; }).join("");
    var latestList = document.getElementById("latest-list");
    var popularList = document.getElementById("popular-list");
    if (latestList) latestList.innerHTML = latest.slice(0, 5).map(function (post) { return '<p><b>' + escapeHtml(post.categoryName) + '</b> ' + escapeHtml(post.title) + '<small>' + date(post.createdAt) + '</small></p>'; }).join("") || "등록된 정보가 없습니다.";
    if (popularList) popularList.innerHTML = popular.slice(0, 5).map(function (post) { return '<p><b>' + escapeHtml(post.categoryName) + '</b> ' + escapeHtml(post.title) + '<small>조회 ' + (post.views || 0) + '</small></p>'; }).join("") || "등록된 게시글이 없습니다.";
  }).catch(function () { console.warn("게시글 데이터를 불러오지 못했습니다."); });
})();
