all: registered.json qualified.json

registered.json: registered.csv
	csv2json registered.csv > registered.json
	node addflags.js

qualified.json: qualified.csv registered.json
	csv2json qualified.csv > qualified.json
	node qualified.js

clean :
	rm registered.json
	rm registered-teams.json
	rm qualified.json
	rm qualified-teams.json


.PHONY: all clean
