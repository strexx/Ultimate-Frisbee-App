/*********************************************************
	DATA REQUEST
*********************************************************/
UFA.login = (() => {
    // Global vars
    var submit = document.querySelector('.submit'),
        placeholder = document.querySelector('.submit i');

    submit.addEventListener("click", loginSubmit, false);

    function loginSubmit(e) {
      placeholder.classList.remove("fa-long-arrow-right");
      placeholder.classList.add("fa-check");
    }

    return {
        submitted: submitted
    };

})();
