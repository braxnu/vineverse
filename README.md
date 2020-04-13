# VINEVERSE
---
## Wymagania
Aby odpalić projekt należy posiadać:
- [node js](https://nodejs.org/en/download/)
- [git](https://git-scm.com/downloads)

## Sklonuj projekt
- Sklonuj poprzez SSH url repozytorium. Na githubie wygląda to następująco ***git@github.com:USERNAME/PROJECT.git***
```shell
    $ cd ~/Desktop
	$ git clone git@github.com:braxnu/vineverse.git vineverse
```

## Uruchamianie projektu
> Po zainstalowaniu wymaganego [oprogramowania](https://nodejs.org/) i sklonowania projektu należy:
### Zainstaluj dependencies

- Otwieramy konsole. Upewnij się że znajdujesz sie w folderze projektu
```shell
    $ npm i
```
### Odpalanie serwera i budowanie klienta
- Aby odpalic serwer należy:
```shell
    $ npm start
```
- Aby zbudować klienta należy:
```shell
    $ npm run build
```
>Po wykonaniu wszystkich rzeczy aplikacja powinna działać na przeglądarce po wpisaniu http://localhost:3000/