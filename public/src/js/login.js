/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.login = (() => {
    // Global vars
    var loginSubmitBtn = document.querySelector('.login_submit'),
        placeholder = document.querySelector('.login_submit i'),
        feedback = document.querySelector('.feedback');

    function init() {
      loginSubmitBtn.addEventListener("click", loginSubmit, false);
    }

    function loginSubmit(e) {
      placeholder.classList.remove("fa-long-arrow-right");
      placeholder.classList.add("fa-check");
      feedback.classList.remove("errorMsg");
      feedback.classList.add("is-visible");
    }

    return {
        init: init,
        loginSubmit: loginSubmit
    };

})();
