const boton = document.getElementById("volver-arriba");

if (boton) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > window.innerHeight) {
            boton.classList.add("visible");
        }

        else {
            boton.classList.remove("visible");
        }
    });

    boton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function actualizarBotonVolverArriba() {
    boton.classList.toggle(
        "visible",
        window.scrollY > window.innerHeight
    );
}

window.addEventListener(
    "scroll",
    actualizarBotonVolverArriba
);

actualizarBotonVolverArriba();

function iniciarReloj() {
    const reloj = document.getElementById("reloj");
    const saludo = document.getElementById("saludo");

    if (!reloj || !saludo) {
        return;
    }

    function actualizarReloj() {
        const ahora = new Date();

        const horaChile = ahora.toLocaleString("es-CL", {
            timeZone: "America/Santiago",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

        reloj.textContent = `Hora en Chile: ${horaChile}`;

        const hora = Number(
            ahora.toLocaleString("en-US", {
                timeZone: "America/Santiago",
                hour: "numeric",
                hour12: false
            })
        );

        if (hora >= 6 && hora < 12) {
            saludo.textContent =
                "Anon-chan te da los buenos días!";
        } else if (hora >= 12 && hora < 20) {
            saludo.textContent =
                "Anon-chan te desea una buena tarde!";
        } else {
            saludo.textContent =
                "Anon-chan te desea una buena noche!";
        }
    }

    actualizarReloj();
    setInterval(actualizarReloj, 1000);
}

function iniciarFiltrosAnimanga() {
    const selectorTipo =
        document.getElementById("animanga-tipo");

    const selectorCategoria =
        document.getElementById("animanga-categoria");

    /*
    Este script es global. Si no estamos en AniManga,
    simplemente no hacemos nada.
    */
    if (!selectorTipo || !selectorCategoria) {
        return;
    }

    const tarjetas =
        document.querySelectorAll(".animanga-card");

    const tituloSeccion =
        document.getElementById("animanga-titulo-seccion");

    const mensajeSinResultados =
        document.getElementById("animanga-sin-resultados");

    function actualizarTitulo(tipo, categoria) {
        if (!tituloSeccion) {
            return;
        }

        if (categoria === "favoritos") {
            tituloSeccion.textContent =
                tipo === "manga"
                    ? "Mis mangas favoritos"
                    : "Mis animes favoritos";
        } else {
            tituloSeccion.textContent =
                tipo === "manga"
                    ? "Recomendaciones de manga"
                    : "Recomendaciones de anime";
        }
    }

    function filtrarObras() {
        const tipoSeleccionado =
            selectorTipo.value.toLowerCase();

        const categoriaSeleccionada =
            selectorCategoria.value.toLowerCase();

        let cantidadVisible = 0;

        tarjetas.forEach((tarjeta) => {
            const tipoObra =
                (tarjeta.dataset.tipo || "")
                    .trim()
                    .toLowerCase();

            const categoriasObra =
                (tarjeta.dataset.categorias || "")
                    .split(",")
                    .map((categoria) =>
                        categoria.trim().toLowerCase()
                    );

            const coincideTipo =
                tipoObra === tipoSeleccionado;

            const coincideCategoria =
                categoriasObra.includes(
                    categoriaSeleccionada
                );

            const debeMostrarse =
                coincideTipo && coincideCategoria;

            tarjeta.classList.toggle(
                "animanga-oculta",
                !debeMostrarse
            );

            if (debeMostrarse) {
                cantidadVisible++;
            }
        });

        actualizarTitulo(
            tipoSeleccionado,
            categoriaSeleccionada
        );

        if (mensajeSinResultados) {
            mensajeSinResultados.hidden =
                cantidadVisible !== 0;
        }
    }

    selectorTipo.addEventListener(
        "change",
        filtrarObras
    );

    selectorCategoria.addEventListener(
        "change",
        filtrarObras
    );

    filtrarObras();
}

function iniciarArchivo() {

    const year =
        document.getElementById("archivo-year");

    const month =
        document.getElementById("archivo-month");

    if (!year || !month) {
        return;
    }

    const secciones =
        document.querySelectorAll(".archive-year");

    const meses = {
        "01":"Enero",
        "02":"Febrero",
        "03":"Marzo",
        "04":"Abril",
        "05":"Mayo",
        "06":"Junio",
        "07":"Julio",
        "08":"Agosto",
        "09":"Septiembre",
        "10":"Octubre",
        "11":"Noviembre",
        "12":"Diciembre"
    };

    function actualizarMeses() {

        const mesAnterior = month.value;

        month.innerHTML = "";

        const disponibles = [];

        secciones.forEach((s) => {

            if (
                s.dataset.year === year.value &&
                !disponibles.includes(s.dataset.month)
            ) {

                disponibles.push(
                    s.dataset.month
                );

            }

        });

        disponibles.reverse().forEach((m) => {

            const option =
                document.createElement("option");

            option.value = m;
            option.textContent = meses[m];

            month.appendChild(option);

        });

        if (
            disponibles.includes(mesAnterior)
        ) {

            month.value = mesAnterior;

        }

    }

    function actualizarVista() {

        secciones.forEach((s) => {

            s.hidden = !(
                s.dataset.year === year.value &&
                s.dataset.month === month.value
            );

        });

    }

    year.addEventListener("change", () => {

        actualizarMeses();
        actualizarVista();

    });

    month.addEventListener(
        "change",
        actualizarVista
    );

    actualizarMeses();
    actualizarVista();

}

function iniciarSitio() {
    iniciarReloj();
    iniciarFiltrosAnimanga();
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        iniciarSitio
    );
} else {
    iniciarSitio();
}

iniciarArchivo();