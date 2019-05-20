all: registered.json qualified.json org.json

registered.json: registered.csv
	csv2json registered.csv > registered.json
	node addflags.js

shortlisted.json: shortlisted.csv shortlisted.json
	csv2json shortlisted.csv > shortlisted.json
	node shortlisted.js

org.json: org.csv
	csv2json org.csv > org.json
	node addpics.js


final.json: final.csv
	csv2json final.csv > final.json
	node final.js

clean :
	rm registered.json
	rm registered-teams.json
	rm shortlisted.json
	rm shortlisted-teams.json
	rm org.json
	rm org-team.json


.PHONY: all clean
