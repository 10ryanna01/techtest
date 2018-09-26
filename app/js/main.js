// loaded a pure/plain js call out instead of JQ.

const ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'products.json');
  ourRequest.onload = function () {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      const data = JSON.parse(ourRequest.responseText);
      createHTML(data);
    } else {
      console.log("tried connected to the server, but it returned an error.");
    }
  }; // fail safe incase build requests a json from another external feed

  ourRequest.onerror = function () {
    console.log("Connection error");
  };
  ourRequest.send();

  function createHTML(productsData) {
    const rawTemplate = document.getElementById("productsTemplate").innerHTML;
    const compiledTemplate = Handlebars.compile(rawTemplate);
    const ourGeneratedHTML = compiledTemplate(productsData);

    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = ourGeneratedHTML;
  }