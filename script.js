const carouselElement = document.getElementById("moviesCarousel");
const carouselInner = document.getElementById("moviesCarouselInner");
const indicators = document.getElementById("movieIndicators");
const source = document.getElementById("movieSource");

const prevButton = document.getElementById("prevMovie");
const nextButton = document.getElementById("nextMovie");

if (carouselElement && carouselInner && indicators && source &&
    prevButton &&
    nextButton
) {

    const movies = Array.from(source.children);

    let moviesPerSlide = 4;
    let carousel;

    function getMoviesPerSlide() {
        if (window.innerWidth < 576) {
            return 1;
        }

        if (window.innerWidth < 992) {
            return 2;
        }

        if (window.innerWidth >= 1800) {
            return 2;
        }

        return 4;
    }

    function createMovieCard(movie) {
        const column = document.createElement("div");

        column.className = "movie-col";

        const card = movie.cloneNode(true);

        card.addEventListener("click", function () {
            window.location.href = card.dataset.link;
        });

        column.appendChild(card);

        return column;
    }

    function buildCarousel() {

        const newMoviesPerSlide = getMoviesPerSlide();

        if (
            newMoviesPerSlide === moviesPerSlide &&
            carouselInner.children.length > 0
        ) {
            return;
        }

        moviesPerSlide = newMoviesPerSlide;

        if (carousel) {
            carousel.dispose();
            carousel = null;
        }

        carouselInner.innerHTML = "";
        indicators.innerHTML = "";

        const totalSlides = Math.ceil(movies.length / moviesPerSlide);

        for (let i = 0; i < totalSlides; i++) {

            const carouselItem = document.createElement("div");

            carouselItem.className = "carousel-item";

            if (i === 0) {
                carouselItem.classList.add("active");
            }

            const row = document.createElement("div");

            row.className = "row movie-row";

            const start = i * moviesPerSlide;
            const end = Math.min(
                start + moviesPerSlide,
                movies.length
            );

            for (let j = start; j < end; j++) {

                const column = createMovieCard(movies[j]);

                row.appendChild(column);
            }

            carouselItem.appendChild(row);
            carouselInner.appendChild(carouselItem);

            const indicator = document.createElement("button");

            indicator.type = "button";
            indicator.dataset.bsTarget = "#moviesCarousel";
            indicator.dataset.bsSlideTo = i;
            indicator.ariaLabel = `Slide ${i + 1}`;

            if (i === 0) {
                indicator.classList.add("active");
                indicator.setAttribute("aria-current", "true");
            }

            indicators.appendChild(indicator);
        }

        carousel = new bootstrap.Carousel(carouselElement, {
            interval: false,
            wrap: true,
            touch: true
        });
    }

    prevButton.addEventListener("click", function () {
        carousel.prev();
    });

    nextButton.addEventListener("click", function () {
        carousel.next();
    });

    let resizeTimer;

    window.addEventListener("resize", function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

            const newMoviesPerSlide = getMoviesPerSlide();

            if (newMoviesPerSlide !== moviesPerSlide) {
                buildCarousel();
            }

        }, 150);
    });

    buildCarousel();
}

const sessionType = document.getElementById("sessionType");
const buyTicketButton = document.getElementById("buyTicketButton");

if (sessionType && buyTicketButton) {

    buyTicketButton.disabled = true;

    sessionType.addEventListener("change", function () {

        if (this.value !== "") {
            buyTicketButton.disabled = false;
        } else {
            buyTicketButton.disabled = true;
        }

    });

    buyTicketButton.addEventListener("click", function () {

        if (sessionType.value === "") {
            alert("Selecione o tipo de sessão primeiro.");
            return;
        }

        const movieTitleElement =
            document.querySelector(".movie-details-info h1");

        const movieTitle = movieTitleElement
            ? movieTitleElement.textContent.trim()
            : "Filme";

        const posterElement =
            document.querySelector(".movie-details-image img");

        const poster = posterElement
            ? posterElement.getAttribute("src")
            : "";

        const tipoSessao =
            sessionType.value.toUpperCase();

        localStorage.setItem("filmeSelecionado", movieTitle);
        localStorage.setItem("posterSelecionado", poster);
        localStorage.setItem("sessionType", tipoSessao);

        window.location.href = "ingresso.html";

    });

}