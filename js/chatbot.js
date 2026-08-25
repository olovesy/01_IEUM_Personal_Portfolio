(function () {
  var chatbot = document.querySelector(".chatbot");
  if (!chatbot) return;

  var toggle = chatbot.querySelector(".chatbot-toggle");
  var panel = chatbot.querySelector(".chatbot-panel");
  var close = chatbot.querySelector(".chatbot-close");
  var answer = chatbot.querySelector(".chatbot-answer");
  var firstOption = chatbot.querySelector(".chatbot-options button");

  function openChatbot() {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    firstOption.focus();
  }

  function closeChatbot() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  toggle.addEventListener("click", function () {
    if (panel.classList.contains("is-open")) closeChatbot();
    else openChatbot();
  });

  close.addEventListener("click", closeChatbot);

  chatbot.querySelectorAll(".chatbot-options button").forEach(function (button) {
    button.addEventListener("click", function () {
      answer.hidden = false;
      answer.innerHTML = "<p>" + button.dataset.answer + "</p><a href=\"" + button.dataset.link + "\">" + button.dataset.label + "</a>";
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && panel.classList.contains("is-open")) closeChatbot();
  });

  document.addEventListener("click", function (event) {
    if (panel.classList.contains("is-open") && !chatbot.contains(event.target)) closeChatbot();
  });
})();
