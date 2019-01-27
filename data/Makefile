all: registered.json qualified.json org.json

registered.json: registered.csv
	csv2json registered.csv > registered.json
	node addflags.js

qualified.json: qualified.csv registered.json
	csv2json qualified.csv > qualified.json
	node qualified.js

org.json: org.csv
	csv2json org.csv > org.json
	node addpics.js

clean :
	rm registered.json
	rm registered-teams.json
	rm qualified.json
	rm qualified-teams.json
	rm org.json
	rm org-team.json


.PHONY: all clean
