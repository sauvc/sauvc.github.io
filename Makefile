serve: build
	jekyll serve

build:
	jekyll build

style:
	sass css/style.sass:css/style.css --style compressed

lint:
	html5validator --match *.html

watch:
	sass css/style.sass:css/style.css --style compressed --watch
