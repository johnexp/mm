#!/bin/bash

mongoimport --db site-valem --collection roles --type json --file ./roles.json --jsonArray
mongoimport --db site-valem --collection menumodules --type json --file ./menumodules.json --jsonArray
mongoimport --db site-valem --collection actions --type json --file ./actions.json --jsonArray
mongoimport --db site-valem --collection users --type json --file ./users.json --jsonArray
