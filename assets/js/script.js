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

/*
Funciona tanto si el script se carga antes como después
de que el documento HTML esté preparado.
*/
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        iniciarFiltrosAnimanga
    );
} else {
    iniciarFiltrosAnimanga();
}