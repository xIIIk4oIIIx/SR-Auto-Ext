# 🤖 SR Auto Extension (SR Automator & AI)

<p align="center">
  <img src="https://img.shields.io/badge/Manifest_V3-Chrome_API-4285F4?style=flat-square&logo=googlechrome&logoColor=white" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/AI-Vision_%26_Text-9D4EDD?style=flat-square" alt="AI Models" />
</p>

Rozbudowane rozszerzenie przeglądarki Chrome stworzone w celu głębokiej automatyzacji pracy wewnątrz panelu SR. Aplikacja łączy w sobie potężny system nagrywania makr z inteligentnym asystentem AI, znacząco redukując czas poświęcany na powtarzalne, manualne operacje w przeglądarce.

## ✨ Główne funkcje

* **Zaawansowany System Makr:** Moduł pozwalający na nagrywanie (event listener), precyzyjną edycję kroków oraz zautomatyzowane odtwarzanie sekwencji kliknięć i wprowadzania danych w interfejsie przeglądarki.
* **Czat AI (Vision & Text):** Zintegrowany asystent sztucznej inteligencji zdolny do analizy zarówno tekstu, jak i obrazu (rozpoznawanie elementów interfejsu). Dynamicznie dobiera odpowiedni model z API OpenRouter na podstawie kontekstu zadania.
* **Prompt & Context Manager:** System umożliwiający tworzenie i edycję własnych szablonów poleceń , które są automatycznie wzbogacane o predefiniowane instrukcje systemowe definiujące rolę AI oraz ustrukturyzowany kontekst aktualnie przeglądanej strony.
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

<table>
  <thead>
    <tr>
      <th width="33%">Edytor Makr (Nagrywanie)</th>
      <th width="33%">Czat AI z modelem wizyjnym</th>
      <th width="33%">Pozostałe</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top" align="center">
        <img width="100%" src="https://github.com/user-attachments/assets/86f7586a-a84e-490a-a2be-5080c9c3d845" /><br><br>
        <img width="100%" src="https://github.com/user-attachments/assets/da03242f-bfea-40cb-9940-d73498b13d20" />
      </td>
      
   <td valign="top" align="center">
        <img width="100%" src="https://github.com/user-attachments/assets/51c281fe-18f3-4d37-95f1-e1b9cef66450" /><br><br>
        <img width="100%" src="https://github.com/user-attachments/assets/9bb38ce2-dc49-411c-bc80-cee284ef7fa2" /><br><br>
        <img width="100%" src="https://github.com/user-attachments/assets/7d7eb574-8dd1-4c50-bef1-53e9f654a76b" />
      </td>
      
  <td valign="top" align="center">
        <img width="48%" src="https://github.com/user-attachments/assets/4436ee5e-98e3-4a04-9e7f-7bad24282a79" />
        <img width="48%" src="https://github.com/user-attachments/assets/a8cf293e-29be-40f2-9a74-a299df15d11e" /><br><br>
        <img width="48%" src="https://github.com/user-attachments/assets/df175fc5-4d8f-4961-8bbf-a6db5fcac583" />
        <img width="48%" src="https://github.com/user-attachments/assets/13745148-93ed-441b-977a-bf56d2d6728a" /><br><br>
        <img width="48%" src="https://github.com/user-attachments/assets/8cee15a9-7cf1-4bb7-8bcf-544c8350244c" />
      </td>
    </tr>
  </tbody>
</table>
