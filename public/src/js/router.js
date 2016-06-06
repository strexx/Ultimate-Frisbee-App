/*********************************************************
	ROUTER MODULE [with router lib: Routie]
*********************************************************/
UFA.router = ( () => {
    function init () {

      if(window.location.hash)
        UFA.ux.toggleClass(window.location.hash);

      // Check if hash has changed and toggle actives on links
      window.addEventListener("hashchange", function () {
          UFA.ux.toggleClass(window.location.hash);
      });

    }

    return {
        init: init
    };

})();
