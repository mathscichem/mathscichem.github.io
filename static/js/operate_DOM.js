function typs_update() {
  let container = document.getElementById("types");
  for (var i = 0; i < APP.typs.length; i++) {
    let new_types = document.createElement("div");
    new_types.className = "type";
    new_types.innerHTML = APP.typs[i];
    new_types.addEventListener("click", function () {
      app_update(this.innerHTML);
    });
    container.append(new_types);
  }
}

function app_update(typ) {
  window_load(false, 0);

  function to_app(url) {
    window.location = url;
  }

  function types_have(types, find) {
    let return_f = false;
    for (var i = 0; i < types.length; i++) {
      if (types[i] == find) return_f = true;
    }
    return return_f;
  }

  let container = document.getElementById("container");
  container.innerHTML = "";
  for (var i = 0; i < APP.apps.length; i++) {
    if (types_have(APP.apps[i].types, typ) || typ == true) {
      let new_flow = document.createElement("div");
      new_flow.className = "flow-element";
      if (APP.apps[i].full_line == true) new_flow.className += " full-line";
      let new_img = document.createElement("img");
      new_img.src = APP.apps[i].img;
      new_flow.append(new_img);
      let new_title = document.createElement("h2");
      new_title.innerHTML = APP.apps[i].title;
      if (APP.apps[i].hot == true) {
        let new_hot = document.createElement("sup");
        new_hot.className = "hot-tag";
        new_hot.innerHTML = `&nbsp;HOT`;
        new_title.append(new_hot);
      }
      new_flow.append(new_title);
      let new_p = document.createElement("p");
      new_p.innerText = APP.apps[i].description;
      new_flow.append(new_p);
      new_flow.url = APP.apps[i].url;
      new_flow.addEventListener("click", function () {
        to_app(this.url);
      });
      container.append(new_flow);
    }
  }
  window_load(true, 900);
}

function shuffleApps() {
  const shuffledArray = [APP.apps[0], ...APP.apps.slice(1)];
  for (let i = shuffledArray.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i - 1)) + 1;
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  APP.apps = shuffledArray;
}

window.addEventListener("load", function () {
  typs_update();
  shuffleApps();
  app_update(true);
});
