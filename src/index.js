const nav_main_search_form = document.querySelector("#nav_main_search_form");
const search_button = document.querySelector("#search_button");
const error_message = document.querySelector("#nav_main_message");
const artist_name = document.querySelector("#artist_name");
const artist_name2 = document.querySelector("#artist_name2");
const presentation_image = document.querySelector("#presentation_image");
const song1 = document.querySelector("#song1");
const contenedor = document.querySelector("#results_main");
const artist1 = document.querySelector("#artist1");
nav_main_search_form.addEventListener("submit", buscarcancion);

function buscarcancion(e) {
  e.preventDefault();
  const cancion = document.querySelector("#input_search").value;

  if (cancion === "") {
    //Muestra error
    error_message.classList.remove("none");

    setTimeout(() => {
      error_message.classList.add("none");
    }, 3000);

    return;
  }

  class API {
    constructor(cancion) {
      this.cancion = cancion;
    }

    getArtists() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "68959ff746msh3dee35f6358911ep10119ejsn7d366054cce1",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      };
      fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/artist/${cancion}`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === "404") {
            showError("Busqueda no encontrada");
            return;
          }

          showSongs(data);
        })
        .catch((err) => console.error(err));
    }
  }

  function showSongs(data) {
    const { name, picture, picture_big, tracklist } = data;
    fetch(tracklist)
      .then((response) => response.json())
      .then((more_data) => {
        if (more_data.cod === "404") {
          showError("Busqueda no encontrada");
          return;
        }

        details(more_data);
      })
      .catch((err) => console.error(err));
    artist_name.textContent = name;
    artist_name2.textContent = name;
    presentation_image.src = `${picture_big}`;
    smallImage.src = `${picture}`;
    artist1.textContent = name;

    descriptionSong.textContent = name;
  }

  function details(more_data) {
    contador = 0;
    const { data } = more_data;
    let array = [data];

    let results = document.createElement("div");
    results.classList.add("results_main_item");
    array.forEach((contenido) =>
      contenido.forEach((dentro) => {
        results.innerHTML = `<div class="results_main_item_image">
        
        <img
          src="${dentro.album.cover_big}"
          alt=""
        />
      </div>
      <div class="results_name_item_description">
        <b class="results_name_item_description_tittle">${dentro.title}</b>
        <p class="results_name_item_description_artist">${dentro.artist.name}</p>
      </div>`;
        contenedor.appendChild(results);
      })
    );

    const {
      data: {
        0: {
          title,
          contributors: {
            0: { picture_big },
          },
        },
      },
    } = more_data;
    song1.textContent = title;
    nameSong.textContent = title;
    image_album.src = `${picture_big}`;
  }

  //Consultado API
  const search = new API(cancion);
  search.getArtists();
}
