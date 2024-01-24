#!/bin/bash

# Get all the locations
while read -r line; do node _tools/getlocurl.js "$line";  done < <(cut -d, -f4 < _tools/info.csv | tail -n +2)


# Get all the flags
# while read -r line; do node _tools/getflag.js "$line";  done < <(cut -d, -f2 < _tools/info.csv | tail -n +2)