#!/bin/bash
for i in {1..200}
do
curl -X POST -H "Content-Type: application/json" -d '{"event":"1"}' $1;
done
