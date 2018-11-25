all: registered.json

registered.json: registered.csv
	csv2json registered.csv > registered.json
	node addflags.js

clean :
	rm registered.json
	rm registered-teams.json


.PHONY: all clean
