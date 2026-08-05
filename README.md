# Aprendiendo a hacer una página web

## Estado al 08/50/2026

He estado metiendo contenido, pero además de eso le di una revisada a todas las secciones con un texto considerable para corregirlo o meterle más cosas. Además de actualizar el color y mejorar el funcionamiento de la sección de "archivo de notas".

## Estado al 07/30/2026

No he avanzado mucho en cuanto a la base de la página, pero si quiero destacar que en caso de querer agregar botones en las secciones de recomendación hay que hacer uso de la lista `links` de esta forma:

### Agregar botones en las recomendaciones

Las entradas de `music.yml` y `animanga.yml` pueden incluir una lista opcional llamada `links`. Si la lista existe, la página mostrará automáticamente los botones correspondientes. Si no existe, no se mostrará ningún botón.

Estructura:

```yaml
links:
  - texto: "Ver Nota"
    url: "/blog/mi-nota/"
```

**Notas:**

* Las rutas internas del sitio (por ejemplo `/blog/mi-nota/`) se abren en la misma pestaña.
* Los enlaces externos (YouTube, MyAnimeList, Apple Music, etc.) se abren automáticamente en una pestaña nueva.
* Se pueden añadir tantos enlaces como quieras.

## Estado al 07/26/2026

Como base de página personal ya está básicamente listo, solo quedaría agregar contenido a las diferentes secciones.
Incluye GIFs, imágenes, bloques de texto y una estructura bastante sólida para utilizarlos. Usando Jekyll se automatiza la creación de plantillas y tarjetas
para mostrar toda la información que se está subiendo. Contando también con un apartado tipo blog que cumple su función. No sé muy bien como explicar el proyecto.

