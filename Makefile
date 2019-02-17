start:
	echo "\n✨ Open SAUVC in the browser at localhost:8000 ✨\n"
	python -m SimpleHTTPServer 8000 && open http://localhost:8000
serve: start

style:
	sass css/style.sass:css/style.css --style compressed
lint:
	html5validator --match *.html
watch:
	sass css/style.sass:css/style.css --style compressed --watch
