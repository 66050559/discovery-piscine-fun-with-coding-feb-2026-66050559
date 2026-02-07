#!/bin/sh

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    i=1
    for arg in "$@"
    do
        if [ $i -le 3 ]; then
            echo "$arg"
        fi
        i=$((i + 1))
    done
fi