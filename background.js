// plik: sr-auto-extension/background.js

import { logger } from './utils/logger.js';
import { updateContextMenu } from './background/contextMenu.js';
import { setupRuntimeOnMessageListener, setupContextMenuOnClickedListener } from './background/listeners.js';
import { handleTabsOnUpdated } from './background/macros.js';

// --- Inicjalizacja wtyczki ---

/**
 * Główny listener instalacji wtyczki.
 * Ustawia domyślne zachowanie panelu bocznego i inicjalizuje menu.
 */
chrome.runtime.onInstalled.addListener(() => {
  logger.log('INFO', 'Background', 'Wtyczka zainstalowana/zaktualizowana.');
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  updateContextMenu();
});

/**
 * Listener zmian w pamięci.
 * Aktualizuje menu kontekstowe lub wysyła sygnał do UI o zmianie szablonów.
 */
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && (changes.sr_auto_keys || changes.sr_auto_prompt_templates || changes.sr_auto_macros || changes.openrouter_api_key)) {
    logger.log('INFO', 'Background', 'Wykryto zmianę w storage, aktualizuję menu kontekstowe.');
    updateContextMenu();
    if (changes.sr_auto_prompt_templates) {
      chrome.runtime.sendMessage({ type: 'templates-updated' }).catch(() => {});
    }
  }
});

/**
 * Listener aktualizacji kart (dla wznawiania makr po przeładowaniu).
 */
chrome.tabs.onUpdated.addListener(handleTabsOnUpdated);

// --- Uruchomienie głównych listenerów (routerów) ---

setupRuntimeOnMessageListener();
setupContextMenuOnClickedListener();

logger.log('INFO', 'Background', 'Główny Service Worker (background.js) zainicjowany i gotowy.');