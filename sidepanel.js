// plik: sr-auto-extension/sidepanel.js

// Import głównych modułów UI
import { initModal } from './ui/modal.js';
import { initKeys } from './ui/keys.js';
import { initMacros, loadMacros, updateMacroPlaybackUI } from './ui/macros.js';
import { initSettings, loadLogs } from './ui/settings.js';
// *** POPRAWKA IMPORTU: Używamy async initScratchpad ***
import { initScratchpad, hideScratchpadContextMenu } from './ui/scratchpad.js'; // Usunięto import loadScratchpad/loadScratchpadData
import { initChat, loadChatHistory } from './ui/chat.js';
// Import narzędzi
import { toast } from './utils/toast.js'; // Toast jest używany globalnie

/**
 * Inicjalizuje niestandardowe selecty z inteligentnym otwieraniem góra/dół.
 * Ta funkcja pozostaje w głównym pliku, ponieważ jest używana w wielu sekcjach.
 */
function initializeCustomSelects() {
    document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
        const nativeSelect = wrapper.querySelector('.native-select');
        const customSelectUI = wrapper.querySelector('.custom-select-ui');
        if (!nativeSelect || !customSelectUI) return; // Upewnij się, że elementy istnieją

        const trigger = customSelectUI.querySelector('.custom-select-trigger');
        const triggerText = trigger.querySelector('span');
        const optionsContainer = customSelectUI.querySelector('.custom-options');

        // Funkcja do tworzenia niestandardowej opcji
        const createCustomOption = (optionEl) => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.textContent = optionEl.textContent;
            customOption.dataset.value = optionEl.value;
            customOption.setAttribute('role', 'option');
            customOption.setAttribute('aria-selected', optionEl.selected ? 'true' : 'false');
            if (optionEl.selected) {
                customOption.classList.add('selected');
                // Aktualizuj tekst triggera tylko, jeśli to jest selekcja początkowa
                 if (!customSelectUI.dataset.initiallySet) {
                    triggerText.textContent = optionEl.textContent;
                    customSelectUI.dataset.initiallySet = "true"; // Oznacz jako ustawione
                 }
            }

            customOption.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!customSelectUI.classList.contains('open')) return;
                selectOption(customOption);
            });
            return customOption;
        };

        // Funkcja do wypełniania opcji
        const populateOptions = () => {
            optionsContainer.innerHTML = ''; // Wyczyść stare opcje
            delete customSelectUI.dataset.initiallySet; // Reset flagi ustawienia początkowego

            Array.from(nativeSelect.children).forEach(child => {
                if (child.tagName === 'OPTGROUP') {
                    const groupLabel = document.createElement('div');
                    groupLabel.className = 'custom-optgroup-label';
                    groupLabel.textContent = child.label;
                    optionsContainer.appendChild(groupLabel);
                    Array.from(child.children).forEach(option => {
                        optionsContainer.appendChild(createCustomOption(option));
                    });
                } else if (child.tagName === 'OPTION') {
                    optionsContainer.appendChild(createCustomOption(child));
                }
            });
             // Upewnij się, że tekst triggera jest aktualny po populacji
             const selectedNativeOption = nativeSelect.options[nativeSelect.selectedIndex];
             if (selectedNativeOption) {
                 triggerText.textContent = selectedNativeOption.textContent;
             } else if (nativeSelect.options.length > 0) {
                 // Fallback na pierwszą opcję, jeśli nic nie jest wybrane
                 triggerText.textContent = nativeSelect.options[0].textContent;
             } else {
                 // Fallback na pusty tekst, jeśli nie ma opcji
                 triggerText.textContent = '';
             }
        };


        // Funkcja do wyboru opcji
        const selectOption = (customOption) => {
            if (!customOption) return;

            const allOptions = optionsContainer.querySelectorAll('.custom-option');
            allOptions.forEach(opt => {
                opt.classList.remove('selected', 'highlighted');
                opt.setAttribute('aria-selected', 'false'); // Zresetuj ARIA
            });
            customOption.classList.add('selected', 'highlighted');
            customOption.setAttribute('aria-selected', 'true'); // Aktualizuj ARIA

            triggerText.textContent = customOption.textContent;
            nativeSelect.value = customOption.dataset.value;

            // Ręczne wywołanie zdarzenia 'change' na natywnym selekcie
            nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));

            customSelectUI.classList.remove('open', 'open-up'); // Zamknij dropdown
            trigger.focus(); // Przenieś focus z powrotem na trigger
        };

        // Funkcja do otwierania dropdownu
        const openDropdown = () => {
             // Zamknij inne otwarte custom selecty
             document.querySelectorAll('.custom-select-ui.open').forEach(otherSelect => {
                if (otherSelect !== customSelectUI) {
                    otherSelect.classList.remove('open', 'open-up');
                }
            });

            // Oblicz pozycję otwarcia (góra/dół)
            const spaceBelow = window.innerHeight - trigger.getBoundingClientRect().bottom;
            const optionsHeight = parseInt(getComputedStyle(optionsContainer).maxHeight) || 200;
            customSelectUI.classList.toggle('open-up', spaceBelow < optionsHeight && trigger.getBoundingClientRect().top > optionsHeight);

            customSelectUI.classList.add('open'); // Otwórz dropdown

            // Podświetl zaznaczoną opcję i przewiń do niej
            const selected = optionsContainer.querySelector('.selected') || optionsContainer.querySelector('.custom-option');
            if (selected) {
                optionsContainer.querySelectorAll('.highlighted').forEach(h => h.classList.remove('highlighted'));
                selected.classList.add('highlighted');
                selected.scrollIntoView({ block: 'nearest' });
            }
        };

        // Listenery dla triggera
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (customSelectUI.classList.contains('open')) {
                customSelectUI.classList.remove('open', 'open-up');
            } else {
                openDropdown();
            }
        });

        // Listenery klawiatury dla dostępności
        customSelectUI.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                customSelectUI.classList.remove('open', 'open-up');
                trigger.focus();
                return;
            }
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (customSelectUI.classList.contains('open')) {
                    const highlighted = optionsContainer.querySelector('.highlighted');
                    if (highlighted) selectOption(highlighted);
                } else {
                    openDropdown();
                }
                return; // Zakończ, aby nie obsłużyć strzałek
            }
            if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
                e.preventDefault();
                if (!customSelectUI.classList.contains('open')) {
                    openDropdown();
                    return;
                }
                const allOptions = Array.from(optionsContainer.querySelectorAll('.custom-option'));
                if (allOptions.length === 0) return;

                let currentIndex = allOptions.findIndex(opt => opt.classList.contains('highlighted'));
                allOptions.forEach(opt => opt.classList.remove('highlighted')); // Usuń podświetlenie ze wszystkich

                let nextIndex = currentIndex;
                if (e.key === 'ArrowDown') {
                    nextIndex = currentIndex < allOptions.length - 1 ? currentIndex + 1 : 0;
                } else { // ArrowUp
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : allOptions.length - 1;
                }

                const nextOption = allOptions[nextIndex];
                if(nextOption) { // Upewnij się, że element istnieje
                    nextOption.classList.add('highlighted');
                    nextOption.scrollIntoView({ block: 'nearest' });
                }
            }
        });

        // Obserwuj zmiany w natywnym selekcie, aby dynamicznie aktualizować customowy
        const observer = new MutationObserver(populateOptions);
        observer.observe(nativeSelect, { childList: true, attributes: true, subtree: true });

        // Listener do aktualizacji po zewnętrznej zmianie (np. wczytanie szablonów)
        nativeSelect.addEventListener('optionsUpdated', populateOptions);


        // Pierwsze wypełnienie opcji
        populateOptions();
    });

    // Globalny listener do zamykania selectów po kliknięciu poza nimi
    window.addEventListener('click', (e) => {
        // Zamknij custom selecty
        document.querySelectorAll('.custom-select-ui.open').forEach(select => {
            if (!select.contains(e.target)) {
                select.classList.remove('open', 'open-up');
            }
        });
        // Ukryj menu kontekstowe notatnika
        hideScratchpadContextMenu(); // Zakładamy, że ta funkcja jest dostępna globalnie lub zaimportowana
    });
}


// --- Główna Inicjalizacja Panelu ---
document.addEventListener('DOMContentLoaded', async () => { // Dodano async
    // Inicjalizacja globalnych elementów (nawigacja, modal)
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    initModal(); // Inicjalizacja modala

    // Logika nawigacji między sekcjami
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            // Sprawdź, czy targetId istnieje i czy link nie jest już aktywny
            if (!targetId || link.classList.contains('active')) return;

            // Zaktualizuj aktywny link i sekcję
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active')); // Usuń 'active' ze wszystkich sekcji
            link.classList.add('active'); // Dodaj 'active' do klikniętego linku
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active'); // Dodaj 'active' do docelowej sekcji
            } else {
                 console.error(`Nie znaleziono sekcji o ID: ${targetId}`);
                 // Opcjonalnie: aktywuj domyślną sekcję w razie błędu
                 document.querySelector('.nav-link[data-target="ai-chat-section"]')?.classList.add('active');
                 document.getElementById('ai-chat-section')?.classList.add('active');
            }


            // Wykonaj akcje tylko przy przejściu DO danej sekcji

            if (targetId === 'settings-section') {
                // Odśwież logi TYLKO jeśli zakładka logów jest już wybrana wewnątrz ustawień
                const logsTab = document.querySelector('.settings-tab-content#logs-settings-tab');
                 if(logsTab && logsTab.classList.contains('active')){
                    loadLogs();
                 }
                 // Można dodać podobną logikę dla innych zakładek ustawień, jeśli potrzebują odświeżenia
            }
            else if (targetId === 'macros-section') {
                 // Odśwież UI przycisków odtwarzania
                 updateMacroPlaybackUI();
            }
            // Można dodać 'else if' dla innych sekcji
        });
    });

    // Inicjalizacja poszczególnych modułów UI (ładują swoje dane początkowe)
    initKeys();
    // Używamy await, aby upewnić się, że dane zostaną załadowane przed inicjalizacją selectów
    await initSettings();
    await initScratchpad(); // Inicjalizuje i ładuje notatki
    await initChat();       // Inicjalizuje i ładuje historię
    initMacros();       // Inicjalizuje i ładuje makra

    // Inicjalizacja niestandardowych selectów (po inicjalizacji modułów)
    initializeCustomSelects();

    console.log("SR Auto Panel załadowany i zainicjalizowany.");
});


// Globalny listener wiadomości
// Obsługuje tylko wiadomości, które nie są specyficzne dla pojedynczego modułu
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let isAsync = false; // Domyślnie synchroniczne

    switch(message.type) {
        case 'show-toast':
            // Upewnij się, że toast jest zainicjalizowany
            if (typeof toast !== 'undefined' && toast.show) {
                toast.show(message.message, message.toastType || 'info');
            } else {
                console.warn("Toast module not ready for message:", message);
            }
            break;

        // Tutaj można dodać obsługę innych globalnych wiadomości w przyszłości
        // np. 'update-all-sections', 'reset-ui', itp.

        default:
            // Jeśli wiadomość nie jest globalna, pozwól modułom ją obsłużyć
            // (ich listenery są dodawane w funkcjach init...)
            // console.log("Received unhandled message type in global listener:", message.type);
            break; // Przerwij switch, aby nie zwracać true niepotrzebnie
    }

    return isAsync; // Zwróć true tylko dla obsługiwanych asynchronicznych wiadomości
});