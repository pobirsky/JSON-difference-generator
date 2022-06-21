### Генератор отличий конфигурационных файлов
Второй учебный проект в рамках курса Frontend JavaScript. 

### Цель проекта
Реализация утилиты для поиска отличий в концигурационных файлах.

### Hexlet tests and linter status:
[![Actions Status](https://github.com/pobirsky/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/pobirsky/frontend-project-lvl2/actions)
[![Test Coverage](https://api.codeclimate.com/v1/badges/10c41f8d802b385d4b49/test_coverage)](https://codeclimate.com/github/pobirsky/frontend-project-lvl2/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/10c41f8d802b385d4b49/maintainability)](https://codeclimate.com/github/pobirsky/frontend-project-lvl2/maintainability)

Реализация утилиты для поиска отличий в концигурационных файлах.
```bash
gendiff -h

  Usage: gendiff [options] <firstConfig> <secondConfig>
  Compares two configuration files and shows a difference.
  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -f, --format [type]  Output format
```    
  
Возможности утилиты:

- Поддержка разных форматов
- Генерация отчета в виде plain text, stylish и json

Пример использования:

```bash
$ gendiff file1.json file2.json --format plain
Setting "common.setting2" deleted.
Setting "common.setting4" added with value "blah blah".
Setting "group1.baz" changed from "bas" to "bars".
Section "group2" deleted.
```

Демонстрационное видео:

### Asciinema gendiff JSON
[![asciicast](https://asciinema.org/a/SZocmdFQWmcYprweroYq30W3A.svg)](https://asciinema.org/a/SZocmdFQWmcYprweroYq30W3A)

### Asciinema gendiff JSON fail
[![asciicast](https://asciinema.org/a/sYCR1NmidIpUw7ONA8mcTeESJ.svg)](https://asciinema.org/a/sYCR1NmidIpUw7ONA8mcTeESJ)


