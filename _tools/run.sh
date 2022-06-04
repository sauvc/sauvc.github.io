#!/bin/bash

while read -r line; do echo ">>> $line"; node _tools/getloc.js "$line";  done < <(cut -d, -f6 < _tools/info.csv | tail -n +2)