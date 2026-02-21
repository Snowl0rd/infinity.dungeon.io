function calculate() {
    const floorInput = document.getElementById('floor');
    if (!floorInput) return; 

    const floor = parseFloat(floorInput.value) || 0;
    const termMod = parseFloat(document.getElementById('terminal').value);
    const statusMod = parseFloat(document.getElementById('status').value);
    const etherMod = parseFloat(document.getElementById('ether').value);
    const hasGenome = document.getElementById('genome').checked;
    const noSource = document.getElementById('no-source').checked;

    // 1. БАЗОВЫЙ ИМ (фрагмент)
    let baseIM = floor * 5; 
    
    // Переменные для финальных расчетов
    let resultIM = baseIM;
    let mana = baseIM;

    // 2. ЛОГИКА ТЕРМИНАЛОВ (СОПРЯЖЕНИЕ)
    
    // ИДЕАЛЬНОЕ (в value селектора должно быть 3.0)
    if (termMod === 3.0) {
        resultIM = baseIM * 3;
        mana = baseIM; // Не влияет на ману
        // Нагрузка на геном -25% (визуально можно добавить в описание)
    } 
    
    // УЛУЧШЕННОЕ (в value селектора должно быть 2.0)
    else if (termMod === 2.0) {
        resultIM = baseIM * 2;
        // Мана: База + 50% от прибавки ИМ. 
        // Прибавка = baseIM, значит 50% от неё — это baseIM * 0.5
        mana = baseIM + (baseIM * 0.5); 
    }
    
    // МИНИМАЛЬНОЕ (в value селектора должно быть 0.75)
    else if (termMod === 0.75) {
        resultIM = baseIM * 0.75; // Снижение ИМ на 25%
        mana = baseIM + (baseIM * 0.5); // Стоит как ИМ + 50% от изначального
        // Нагрузка на геном +50%
    }
    
    // УДОВЛЕТВОРИТЕЛЬНОЕ (в value селектора должно быть 1.0)
    else {
        resultIM = baseIM;
        mana = baseIM;
    }

    // 3. ПРИМЕНЕНИЕ ОСТАЛЬНЫХ МОДИФИКАТОРОВ (Статус, Эфирки, Геном)
    // Эти множители обычно применяются к итоговому ИМ
    resultIM = resultIM * statusMod;
    
    if (etherMod > 0) resultIM += (resultIM * etherMod);
    if (hasGenome) resultIM += (resultIM * 0.25);

    // 4. ШТРАФ ЗА ИСТОЧНИК (удваивает финальную ману)
    if (noSource) {
        mana *= 2;
    }

    // 5. ОПРЕДЕЛЕНИЕ КРУГА
    let circle = "I";
    if (resultIM > 20) circle = "II";
    if (resultIM > 50) circle = "III";
    if (resultIM > 120) circle = "IV";
    if (resultIM > 500) circle = "V";
    if (resultIM > 1500) circle = "VI";

    // 6. ВЫВОД
    document.getElementById('res-im').innerText = Math.round(resultIM);
    document.getElementById('res-circle').innerText = circle;
    document.getElementById('res-mana').innerText = Math.round(mana);

    const baseValDisplay = document.getElementById('base-val');
    if (baseValDisplay) baseValDisplay.innerText = baseIM;
}