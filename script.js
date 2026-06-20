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