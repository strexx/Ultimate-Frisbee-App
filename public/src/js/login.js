/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.login = (() => {
    // Global vars
    var submit = document.querySelector('.submit'),
        placeholder = document.querySelector('.submit i'),
        feedback = document.querySelector('.feedback');

    submit.addEventListener("click", loginSubmit, false);

    function loginSubmit(e) {
      placeholder.classList.remove("fa-long-arrow-right");
      placeholder.classList.add("fa-check");
      feedback.classList.add("is-visible");
    }

    return {
        loginSubmit: loginSubmit
    };

})();
