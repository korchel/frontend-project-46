**Diffgenerator** package generates difference between two .json or .yaml files. Three types of output formats are available:  
**'stylish'**, **'plain'** and **'json'**. 'stylisch' is used by default. 

### How to install:  
git clone git@github.com:korchel/frontend-project-46.git  
npm ci  
cd frontend-project-46
npm link

### How to run:  
**gendiff filepath1 filepath2** // to generate difference in 'stylish' format  
**gendiff filepath1 filepath2 -f 'plain'** // to generate difference in 'plain' format  
**gendiff filepath1 filepath2 -f 'json'** // to generate difference in 'json' format  
**gendiff -h** // to display help  
filepath1 and filepath2 are relative or absolute paths to the files that are being compared. 

### Hexlet tests and linter status:
[![Actions Status](https://github.com/korchel/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/korchel/frontend-project-46/actions)

### Code Climate:
[![Maintainability](https://api.codeclimate.com/v1/badges/ce03d657c154cbe146a7/maintainability)](https://codeclimate.com/github/korchel/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/ce03d657c154cbe146a7/test_coverage)](https://codeclimate.com/github/korchel/frontend-project-46/test_coverage)


### stylish format
[![asciicast](https://asciinema.org/a/F6tmqKx0w1oNPXR36wpdkZmZb.svg)](https://asciinema.org/a/F6tmqKx0w1oNPXR36wpdkZmZb)

### plain format
[![asciicast](https://asciinema.org/a/KgtpRnlNYnwFhklZkv3srLWqA.svg)](https://asciinema.org/a/KgtpRnlNYnwFhklZkv3srLWqA)

### json format
[![asciicast](https://asciinema.org/a/ElLS4YamWglkHseYDiY6g3q5g.svg)](https://asciinema.org/a/ElLS4YamWglkHseYDiY6g3q5g)