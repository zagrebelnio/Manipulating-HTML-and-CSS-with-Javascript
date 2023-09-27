//Поміняйте місцями тексти, позначені «2» та «6».
function swapText() {
    const headerText = document.getElementById('div2').querySelector('h2').innerText;
    const footerText = document.getElementById('div6').querySelector('p').innerText;
    
    document.getElementById('div2').querySelector('h2').innerText = footerText;
    document.getElementById('div6').querySelector('p').innerText = headerText;
}

swapText();

// 2. Напишіть функцію, яка обчислює площу ромба,
// беручи необхідні значення із відповідних змінних у
// скрипті, і виводить отриманий результат в кінці
// контенту в блоці «5».

function calculateRhombusArea(d1, d2) {
    return (d1 * d2) / 2;
}

function handleRhombusForm(event) {
    event.preventDefault();

    const d1Input = document.getElementById('d1');
    const d2Input = document.getElementById('d2');
    const areaOutput = document.getElementById('rhombusArea');

    const d1 = d1Input.value;
    const d2 = d2Input.value;

    const rhombusArea = calculateRhombusArea(d1, d2);

    areaOutput.innerText = `Площа: ${rhombusArea}`;
}

(() => {
    const form = document.getElementById('rhombusForm');
    form.addEventListener('submit', handleRhombusForm);
})();

// 3. Напишіть скрипт, який визначає мінімальне і
// максимальне числа із 10 значень, беручи необхідні
// значення із відповідної форми в блоці «5», а
// отриманий результат виводить за допомогою
// діалогового вікна і зберігає в cookies, причому:
// а) при оновленні веб-сторінки в броузері
// користувачу за допомогою діалогового вікна виводиться інформація,
// збережена в cookies, із питанням про необхідність видалити дані із cookies, і не
// виводиться згадана вище форма;
// б) при підтвердженні питання відповідні cookies видаляються, і веб-сторінка
// оновлюється з початковим станом із наявною формою для введення даних;
// в) при відмові виводиться наступне діалогове вікно із інформуванням
// користувача про наявність cookies і потребу перезавантажити веб-сторінку.

function findMinMax() {
    let numbers = [];

    for (let i = 1; i <= 10; i++) {
        numbers.push(+document.getElementById('num' + i).value);
    }

    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    return {min, max};
}

function saveToCookies(min, max) {
    document.cookie = `minValue=${min};`;
    document.cookie = `maxValue=${max};`;
}

function getFromCookies() {
    const cookies = document.cookie.split('; ');
    const values = {};
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        values[name] = value;
    }
    const min = +values.minValue;
    const max = +values.maxValue;
    return {min, max};
}

function displayResult() {
    const {min, max} = getFromCookies();

    const resultMessage = `Мінімальне значення: ${min}\nМаксимальне значення: ${max}`;
    alert(resultMessage);
}

function deleteCookies() {
    document.cookie = `minValue=;`;
    document.cookie = `maxValue=;`;
}

function deleteNumbersForm() {
    const div = document.getElementById('numbers-container');
    div.remove();
}

function displayCookies() {
    const {min, max} = getFromCookies();
    const resultMessage = `Мінімальне значення: ${min}\nМаксимальне значення: ${max}`;

    if (confirm(resultMessage + '\n\nБажаєте видалити збережені значення?')) {
        deleteCookies();
        location.reload();
    }
    else {
        deleteNumbersForm();
        alert('На сторінці присутні неочищені cookies, їх потрібно очистити, щоб використовувати форму з числами. Перезавантажте сторінку.');
    }
}

function handleNumbersForm (event) {
    event.preventDefault();
    
    const {min, max} = findMinMax();

    saveToCookies(min, max);

    displayResult();
}

(() => {
    const form = document.getElementById('numbersForm');
    form.addEventListener('submit', handleNumbersForm);
})();

(() => {
    const {min, max} = getFromCookies();
    if (min && max) {
        displayCookies();
    }
})();

// 4. Напишіть скрипт, який при настанні події focus змінює колір рамки усіх
// номерних блоків (1..6) на вказаний користувачем і зберігає відповідне значення
// кольору в localStorage броузера так, щоб при наступному відкриванні веб-
// сторінки значення кольору рамок номерних блоків встановлювалось із
// збереженого значення в localStorage.

function changeBorderColor(event) {
    event.preventDefault();  // Prevent the form from submitting

    const selectedColor = prompt('Введіть колір ("red", "#00ff00"):');
    if (selectedColor) {
        const numDivs = document.querySelectorAll('.num-div');
        for (const div of numDivs) {
            div.style.borderColor = selectedColor;
            div.dataset.color = selectedColor;
            localStorage.setItem(div.id, selectedColor);
        }
    }
}

function restoreColorsFromLocalStorage() {
    const numDivs = document.querySelectorAll('.num-div');
    for (const div of numDivs) {
        const savedColor = localStorage.getItem(div.id);
        if (savedColor) {
            div.style.borderColor = savedColor;
            div.dataset.color = savedColor;
        }
    }
}

(() => {
    const form = document.getElementById('colorForm');
    form.addEventListener('submit', changeBorderColor);
    restoreColorsFromLocalStorage();
})();

// 5. Напишіть скрипт додавання зображень в блок «1»:
// а) необхідні елементи форми появляються у блоці «5» внаслідок виділення
// тексту в блоці «у» одразу після наявного в блоці «5» контенту;
// б) кількість зображень необмежена, використовуйте зображення з інтернету;
// в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані
// зображення зберігаються в localStorage броузера (структуровано на ваш
// розсуд), а саме зображення додається в кінці початкового вмісту блока «4»;
// г) поруч розміщується кнопка, внаслідок натискання на яку всі нові зображення
// видаляються із localStorage броузера і припиняється їхнє відображення у блоці
// «1» без перезавантаження веб-сторінки.

window.addEventListener('load', displayImagesFromLocalStorage);

function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
    return text;
}

function checkTextHighliting() {
    let selectedText = getSelectedText();
    if (selectedText.includes('Пийте квас')) {
        const container = document.getElementById('link-container');
        if (!container) {
            createLinkContainer();
        }
    }
}

function createLinkContainer() {
    const linkContainer = document.createElement('div');
    linkContainer.id = 'link-container';

    const imageForm = document.createElement('form');
    imageForm.id = 'imageForm';

    const label = document.createElement('label');
    label.setAttribute('for', 'imageURL');
    label.textContent = 'Введіть посилання на зображення';

    const input = document.createElement('input');
    input.setAttribute('type', 'url');
    input.id = 'imageURL';
    input.setAttribute('placeholder', 'https://link...');

    const addButton = document.createElement('button');
    addButton.setAttribute('type', 'submit');
    addButton.textContent = 'Додати';

    imageForm.appendChild(label);
    imageForm.appendChild(input);
    imageForm.appendChild(addButton);

    const generateButton = document.createElement('button');
    generateButton.textContent = 'Згенерувати';
    generateButton.addEventListener('click', addRandomImage);

    linkContainer.appendChild(imageForm);
    linkContainer.appendChild(generateButton);

    document.getElementById('div5').appendChild(linkContainer);
}

(() => {
    document.onmouseup = checkTextHighliting;
})();

function addRandomImage(event) {
    event.preventDefault();

    let links = ['https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80', 
    'https://media.istockphoto.com/id/636379014/photo/hands-forming-a-heart-shape-with-sunset-silhouette.jpg?s=612x612&w=0&k=20&c=CgjWWGEasjgwia2VT7ufXa10azba2HXmUDe96wZG8F0=',
    'https://images.pexels.com/photos/1454769/pexels-photo-1454769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://hips.hearstapps.com/clv.h-cdn.co/assets/17/29/2048x1152/hd-aspect-1500566326-gettyimages-512366437-1.jpg', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj0tSeiCr4RTiIyoMOCPdyRIlQmCt4k0ltRA&usqp=CAU'];
    
    loadImage(links[Math.floor(Math.random() * links.length)]);
}

function addImage(event) {
    event.preventDefault();
    const url = document.getElementById('imageURL').value;
    loadImage(url);
}

function imageExists(image_url){
    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;
}

function loadImage(url) {
    if (!imageExists(url)) {
        return;
    }

    const sidebar = document.getElementById('image-container');
    const newDiv = document.createElement('div');
    const imgElement = document.createElement('img');
    imgElement.classList.add('image')

    imgElement.src = url;

    newDiv.appendChild(imgElement);
    sidebar.appendChild(newDiv);

    const button = document.getElementById('saveImageButton');
    
    if (!button) {
        createSaveButton();
    }
}

(() => {
    const form = document.getElementById('imageForm');
    form.addEventListener('submit', addImage);
})();

function saveImageToLocalStorage() {
    const images = document.querySelectorAll('.image');
    const imageURLs = [];

    images.forEach(image => {
        imageURLs.push(image.src);
    });

    localStorage.setItem('imageURLs', JSON.stringify(imageURLs));
    displayImagesFromLocalStorage();
}

function createSaveButton() {
    let button = document.createElement('button');
    button.addEventListener('click', saveImageToLocalStorage)
    button.id = 'saveImageButton';
    button.innerText = 'Зберегти зображення';
    const div = document.getElementById('link-container');
    div.appendChild(button);
}

function displayImagesFromLocalStorage() {
    const imageURLsString = localStorage.getItem('imageURLs');
    
    const imageURLs = JSON.parse(imageURLsString);

    const div = document.getElementById('div4');

    imageURLs.forEach(url => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('local-storage-item');
        const imgElement = document.createElement('img');
        imgElement.classList.add('image');
        imgElement.src = url;

        newDiv.appendChild(imgElement);
        div.appendChild(newDiv);
    });

    createDeleteButton();
}

function createDeleteButton() {
    if (document.getElementById('deleteImagesButton')) {
        return;
    }
    let button = document.createElement('button');
    button.addEventListener('click', deleteImagesFromLocalStorage);
    button.id = 'deleteImagesButton';
    button.innerText = 'Видалити зображення';
    const div = document.getElementById('div4');
    div.appendChild(button);
}

function deleteImagesFromLocalStorage() {
    localStorage.removeItem('imageURLs');

    const storageItems = document.querySelectorAll('.local-storage-item');
    const images = document.querySelectorAll('.image');
    const deleteButton = document.getElementById('deleteImagesButton');

    storageItems.forEach(item => {
        item.remove();
    });

    images.forEach(image => {
        image.remove();
    });

    deleteButton.remove();
}