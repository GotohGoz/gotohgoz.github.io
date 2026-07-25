source "https://rubygems.org"

# Coincide con la versión utilizada por la acción oficial
# actions/jekyll-build-pages.
gem "github-pages", "= 232", group: :jekyll_plugins

# Necesario para servir la página localmente con Ruby moderno.
gem "webrick"

# Datos de zonas horarias para Windows.
platforms :mingw, :x64_mingw, :mswin do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end