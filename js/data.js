window.onload = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "data/data.json");
  request.send();
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(this.responseText);
      setProjectsData(data);
      setHomeData(data);
      setBackGrounds(data["background_images"]);
      setFilters(data["filters"]);
      filterData(data);
      setCerts(data["certifications"]);
    }
  };
  function setHomeData(data) {
    let homeElement = document.querySelector(".first-content");
    homeElement.querySelector("h2").innerText = data["home"]["name"];
    homeElement.querySelector("p").innerText = data["home"]["description"];
    homeElement
      .querySelector("img")
      .setAttribute("src", "img/" + data["home"]["imageURL"]);
  }

  function setAboutData(data) {
    let aboutElement = document.querySelector(".second-content");
    aboutElement.querySelector(".left-content h2").innerText =
      data["about"]["header"];
    aboutElement.querySelector(".left-content p").innerText =
      data["about"]["paragraph"];

    aboutElement
      .querySelector(".right-image img")
      .setAttribute("src", `${"img/" + data["about"]["image"]}`);
  }

  function setProjectsData(data) {
    let projectsElement = document.querySelector("#projcets");
    for (let i = 0; i < data["projects"].length; i++) {
      let el = document.createElement("div");
      el.innerHTML = `
              <div class="col-md-4 col-sm-6 single-project" data-filter=${data[
                "projects"
              ][i]["filter"].replaceAll(" ", "_")}>
                <div class="item">
                  <div class="thumb">
                    <a
                      data-lightbox="image-1"
                      ><div class="hover-effect">
                        <div class="hover-content">
                          <h2>${data["projects"][i]["name"]}</h2>
                          <p style="color: white; margin-bottom: 20px">
                            ${data["projects"][i]["description"]}
                          </p>
                         ${
                           data["projects"][i]["url"] == ""
                             ? ""
                             : `<a target="_blank" class="buttons" href=${data["projects"][i]["url"]}>Code</a>`
                         }
                         ${
                           data["projects"][i]["url2"] == ""
                             ? ""
                             : `<a target="_blank" class="buttons" style="margin-right:0;" href=${data["projects"][i]["url2"]}>${data["projects"][i]["button2"]}</a>`
                         }
                        </div>
                      </div></a
                    >
                    <div class="image">
                      <img src=${"img/" + data["projects"][i]["image"]} />
                    </div>
                  </div>
                </div>
              </div>
`;
      projectsElement.appendChild(el);
    }
  }
  function setBackGrounds(data) {
    document.getElementById(
      "1"
    ).style.cssText = `background-image:url(img/${data["about"]});`;
    document.getElementById(
      "2"
    ).style.cssText = `background-image:url(img/${data["projects"]});`;
    document.getElementById(
      "3"
    ).style.cssText = `background-image:url(img/${data["certifications"]});`;
    document.getElementById(
      "4"
    ).style.cssText = `background-image:url(img/${data["contact"]});`;
  }

  function setFilters(data) {
    let el = document.querySelector(".filter");
    for (let i = 0; i < data.length; i++) {
      let div = document.createElement("div");
      div.innerHTML = `<a class="single-filter">${data[i]}</a>`;
      el.appendChild(div);
    }
  }

  function filterData(data) {
    let filterElements = document.querySelectorAll(".single-filter");
    let projects = document.querySelectorAll(".single-project");
    console.log(projects[0].dataset.filter.replaceAll("_", " "));
    for (let i = 0; i < filterElements.length; i++) {
      filterElements[i].addEventListener("click", (target) => {
        console.log(target.target.innerText);

        if (target.target.classList.contains("active")) {
          filterElements[0].click();
          if (target.target.innerText != "All") {
            target.target.classList.remove("active");
          }
        } else {
          filterElements.forEach((e) => {
            e.classList.remove("active");
          });
          target.target.classList.add("active");

          projects.forEach((t) => {
            if (target.target.innerText.toLowerCase() == "all") {
              t.style.display = "block";
            } else if (
              t.dataset.filter.replaceAll("_", " ").toLowerCase() ==
              target.target.innerText.toLowerCase()
            ) {
              t.style.display = "block";
            } else {
              t.style.display = "none";
            }
          });
        }
      });
    }
  }

  function setCerts(data) {
    let el = document.getElementById("certs");
    console.log(el);
    data.forEach((c) => {
      let div = document.createElement("div");
      div.innerHTML = `
      <div class="col-md-4 col-sm-6 ">
                <div class="item">
                  <div class="thumb">
                    <a
                      data-lightbox="image-1"
                      ><div class="hover-effect">
                        <div class="hover-content">
                          <h2>${c["name"]}</h2>
                          <p style="color: white; margin-bottom: 20px">
                            ${c["description"]}
                          </p>
                         <a target="_blank" class="buttons" href=${
                           c["url"]
                         }>View Certificate</a>
                        </div>
                      </div></a
                    >
                    <div class="image">
                      <img src=${"img/" + c["image"]} />
                    </div>
                  </div>
                </div>
              </div>
              `;
      el.appendChild(div);
    });
  }
};
