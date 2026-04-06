# 🤖 SR Auto Extension (SalesRobots Automator & AI)

<p align="center">
  <img src="https://img.shields.io/badge/Manifest_V3-Chrome_API-4285F4?style=flat-square&logo=googlechrome&logoColor=white" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/AI-Vision_%26_Text-9D4EDD?style=flat-square" alt="AI Models" />
</p>

Rozbudowane rozszerzenie przeglądarki Chrome stworzone w celu głębokiej automatyzacji pracy wewnątrz panelu SalesRobots. Aplikacja łączy w sobie potężny system nagrywania makr z inteligentnym asystentem AI, znacząco redukując czas poświęcany na powtarzalne, manualne operacje w przeglądarce.

> **💡 Potencjał biznesowy (Zastosowanie w TMS):** Systemy nagrywania makr i bezpośrednia manipulacja strukturą DOM (Content Scripts) to idealne rozwiązanie do integracji z zewnętrznymi giełdami transportowymi (np. Trans.eu, TimoCom), które często nie udostępniają otwartego API. Technologia ta pozwala na stworzenie narzędzi dla spedytorów, które "jednym kliknięciem" publikują ładunki, uzupełniają powtarzalne trasy lub masowo filtrują oferty bezpośrednio na stronach giełd.

## ✨ Główne funkcje

* **Zaawansowany System Makr:** Moduł pozwalający na nagrywanie (event listener), precyzyjną edycję kroków oraz zautomatyzowane odtwarzanie sekwencji kliknięć i wprowadzania danych w interfejsie przeglądarki.
* **Czat AI (Vision & Text):** Zintegrowany asystent sztucznej inteligencji zdolny do analizy zarówno tekstu, jak i obrazu (rozpoznawanie elementów interfejsu). Dynamicznie dobiera odpowiedni model z API OpenRouter na podstawie kontekstu zadania.
* **Prompt Architect:** Narzędzie optymalizujące polecenia dla AI, poprawiające jakość i precyzję zwracanych wyników ("Prompt Engineering").
* **Głęboka Modyfikacja DOM:** Rozszerzenie wstrzykuje autorskie nakładki na oryginalną stronę, umożliwiając m.in. zaawansowane filtrowanie tabel, masowe zaznaczanie elementów i ekstrakcję danych.
* **Bezpieczny Storage:** Bezpieczne przechowywanie kluczy konfiguracyjnych i API przy użyciu natywnego `chrome.storage.local`.

## 🛠️ Architektura & Tech Stack

* **Vanilla JavaScript (ES Modules):** Podział na moduły logiczne zapewniający wysoką wydajność i łatwość utrzymania bez konieczności używania ciężkich frameworków.
* **Chrome Extension API (Manifest V3):** Wykorzystanie nowoczesnych standardów (`Service Workers`, `Content Scripts`, `Storage API`).
* **DOM Manipulation & Event Handling:** Zaawansowane przechwytywanie zdarzeń użytkownika w celu generowania i odtwarzania ścieżek makr.
* **OpenRouter API:** Integracja z wieloma modelami LLM (w tym multimodalnymi).

## 🚀 Uruchomienie lokalne (Tryb Developera)

1. Pobierz lub sklonuj repozytorium na dysk.
2. Otwórz przeglądarkę opartą na Chromium i wpisz adres: `chrome://extensions/`
3. Włącz **Tryb programisty** (Developer mode) w prawym górnym rogu.
4. Kliknij **Załaduj rozpakowane** (Load unpacked) i wskaż folder z projektem.
5. Rozszerzenie aktywuje się automatycznie po zalogowaniu do dedykowanego panelu.

## 📸 Zrzuty ekranu / Demo Action

*(Miejsce na wstawienie zrzutów ekranu - polecam pokazać kreator nagrywania makr oraz otwarty panel czatu AI!)*

| Edytor Makr (Nagrywanie) | Czat AI z modelem wizyjnym | Narzędzie Prompt Architect |
|:---:|:---:|:---:|
| <img height="350" src="link_do_screena_1.png" alt="Macro Builder"> | <img width="1912" height="1076" alt="Image" src="https://github.com/user-attachments/assets/2b3e8f1f-4d5d-424d-b45e-d47229aa0b0d" /> <img width="415" height="1067" alt="Image" src="https://github.com/user-attachments/assets/4f6ca483-5ec3-4951-96d5-b67f0a81b733" /> | <img height="350" src="link_do_screena_3.png" alt="Prompt Architect"> |

co zrobić aby dwa zdjęcia z jednej kolumny w tabelce były koło siebie a nie pod sobą?
