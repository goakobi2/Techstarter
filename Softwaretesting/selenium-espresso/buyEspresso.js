// Importiere die notwendigen Module aus Selenium-WebDriver    
// - Builder: Erstellt einen neuen WebDriver, der den Browser steuert.    
// - By: Wird verwendet, um Elemente auf der Website zu finden (z. B. Buttons, Links).    
// - until: Ermöglicht das Warten auf bestimmte Bedingungen (z. B. bis ein Element sichtbar ist).    
const { Builder, By, until } = require('selenium-webdriver');    

// Hauptfunktion, die den gesamten Prozess des Espresso-Kaufs automatisiert    
async function buyEspresso() {    
  // WebDriver erstellen:    
  // - new Builder().forBrowser('chrome').build(): Erstellt einen WebDriver für den Chrome-Browser.    
  let driver = await new Builder().forBrowser('chrome').build();    

  try {    
    // Schritt 1: Öffne die gewünschte Website    
    // - driver.get('https://seleniumbase.io/coffee/'): Öffnet die angegebene URL im Browser.    
    await driver.get('https://seleniumbase.io/coffee/');    
    console.log('Website erfolgreich geöffnet!');    

    // Schritt 2: Wähle den Espresso aus    
    // - By.css('div[data-test="Espresso"]'): Findet das Element für den Espresso anhand eines CSS-Selektors.    
    // - driver.wait(until.elementLocated(...), 5000): Wartet, bis das Element sichtbar ist (max. 5 Sekunden).    
    // - espressoButton.click(): Simuliert einen Klick auf den Espresso, um ihn in den Warenkorb zu legen.    
    const espressoButton = await driver.wait(    
      until.elementLocated(By.css('div[data-test="Espresso"]')),    
      5000    
    );    
    await espressoButton.click();    
    console.log('Espresso erfolgreich ausgewählt!');    

    // Schritt 3: Öffne den Warenkorb    
    // - By.css('a[aria-label="Cart page"]'): Findet den Link zum Warenkorb.    
    // - driver.wait(until.elementLocated(...), 5000): Wartet, bis der Warenkorb-Link sichtbar ist (max. 5 Sekunden).    
    // - cartButton.click(): Simuliert einen Klick auf den Warenkorb-Link.    
    const cartButton = await driver.wait(    
      until.elementLocated(By.css('a[aria-label="Cart page"]')),    
      5000    
    );    
    await cartButton.click();    
    console.log('Warenkorb erfolgreich geöffnet!');    

    // Schritt 4: Führe den Checkout durch    
    // - By.css('button[data-test="checkout"]'): Findet den Checkout-Button.    
    // - driver.wait(until.elementLocated(...), 5000): Wartet, bis der Checkout-Button sichtbar ist (max. 5 Sekunden).    
    // - checkoutButton.click(): Simuliert einen Klick auf den Checkout-Button, um den Prozess zu starten.    
    const checkoutButton = await driver.wait(    
      until.elementLocated(By.css('button[data-test="checkout"]')),    
      5000    
    );    
    await checkoutButton.click();    
    console.log('Checkout erfolgreich durchgeführt!');    

    // Schritt 5: Erfolgsmeldung prüfen    
    // - By.css('h1[data-v-29c3be1b]'): Findet das Element, das die Erfolgsmeldung enthält.    
    // - driver.wait(until.elementLocated(...), 5000): Wartet, bis die Erfolgsmeldung sichtbar ist (max. 5 Sekunden).    
    // - confirmationMessage.getText(): Liest den Text der Erfolgsmeldung aus.    
    // - console.log(...): Gibt die Erfolgsmeldung im Terminal aus.    
    const confirmationMessage = await driver.wait(    
      until.elementLocated(By.css('h1[data-v-29c3be1b]')),    
      5000    
    );    
    const confirmationText = await confirmationMessage.getText();    
    console.log(`Bestätigung erhalten: ${confirmationText}`);    
  } catch (error) {    
    // Falls ein Fehler auftritt, gib eine Fehlermeldung im Terminal aus, um das Problem zu diagnostizieren    
    console.error('Ein Fehler ist aufgetreten:', error);    
  } finally {    
    // Schritt 6: Schließe den Browser    
    // - driver.quit(): Schließt den WebDriver und den Browser, um Ressourcen freizugeben.    
    await driver.quit();    
    console.log('Browser geschlossen.');    
  }    
}    

// Starte den automatisierten Testprozess, indem die Hauptfunktion buyEspresso() aufgerufen wird    
buyEspresso();    