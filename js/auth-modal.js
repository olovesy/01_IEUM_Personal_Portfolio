(function () {
  var openButtons = document.querySelectorAll("[data-auth-open]");
  var backdrop = document.querySelector(".auth-modal-backdrop");
  var activeModal = null;
  var lastTrigger = null;

  if (!openButtons.length || !backdrop) return;

  function openModal(id, trigger) {
    var modal = document.getElementById(id);
    if (!modal) return;
    activeModal = modal;
    lastTrigger = trigger;
    backdrop.hidden = false;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("auth-modal-open");
    var firstInput = modal.querySelector("input, button, a");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.hidden = true;
    activeModal.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.body.classList.remove("auth-modal-open");
    activeModal = null;
    if (lastTrigger) lastTrigger.focus();
  }

  openButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openModal(button.getAttribute("data-auth-open"), button);
    });
  });

  document.querySelectorAll("[data-auth-close]").forEach(function (button) {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeModal) closeModal();
  });

  var loginForm = document.getElementById("demo-login-form");
  var status = document.getElementById("auth-demo-status");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      loginForm.reset();
      closeModal();
      if (status) status.textContent = "포트폴리오용 로그인 화면을 확인했습니다. 입력 정보는 저장되지 않았습니다.";
    });
  }
})();
