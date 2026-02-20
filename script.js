function calculate() {
    // Получаем значения из полей ввода
    // Если поле пустое, берем 0 (чтобы не было ошибок в расчетах)
    const floor = parseFloat(document.getElementById('floor').value) || 0;
    const termMod = parseFloat(document.getElementById('terminal').value);
    const statusMod = parseFloat(document.getElementById('status').value);
    const etherMod = parseFloat(document.getElementById('ether').value);
    const hasGenome = document.getElementById('genome').checked;
    const noSource = document.getElementById('no-source').checked;

    // 1. Базовый ИМ (Этаж * 5)
    let baseIM = floor * 5;
    
    // Обновляем текстовую подсказку "Базовый ИМ" под полем ввода этажа
    const baseValDisplay = document.getElementById('base-val');
    if (baseValDisplay) baseValDisplay.innerText = baseIM;

    // 2. Рассчитываем итоговый ИМ
    // Учитываем терминал и статус существа
    let resultIM = baseIM * termMod * statusMod;
    
    // Прибавляем бонусы от Эфирки
    if (etherMod > 0) {
        resultIM += (resultIM * etherMod);
    }
    
    // Прибавляем бонус Генома (+25% от текущего значения)
    if (hasGenome) {
        resultIM += (resultIM * 0.25);
    }

    // 3. Рассчитываем стоимость Маны
    // Базовая стоимость равна ИМ
    let mana = resultIM;
    
    // Если нет источника, стоимость удваивается
    if (noSource) {
        mana *= 2;
    }

    // 4. Определяем Круг Магии на основе ИМ (по твоим файлам)
    let circle = "I";
    if (resultIM > 20) circle = "II";
    if (resultIM > 50) circle = "III";
    if (resultIM > 120) circle = "IV";
    if (resultIM > 500) circle = "V";
    if (resultIM > 1500) circle = "VI";

    // 5. Вывод результатов на экран терминала
    // Math.round — чтобы не было бесконечных знаков после запятой
    document.getElementById('res-im').innerText = Math.round(resultIM);
    document.getElementById('res-circle').innerText = circle;
    document.getElementById('res-mana').innerText = Math.round(mana);

    // Добавим немного динамики: если ИМ слишком высокий, подсветим его красным
    const imDisplay = document.getElementById('res-im');
    if (resultIM > 100) {
        imDisplay.style.color = "#ff4d4d"; // Красный для опасных значений
    } else {
        imDisplay.style.color = "var(--accent-cyan)";
    }
}

// Запускаем расчет один раз при загрузке страницы, чтобы не было пустых цифр
window.onload = calculate;