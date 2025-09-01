const BALLOONS = [
    "shariki/голубойНШ.png",
    "shariki/желтыйНШ.png",
    "shariki/зеленыйНШ.png",
    "shariki/розовыйНШ.png",
    "shariki/фиолетовыйНШ.png"
];
const colors1 = [
"#00FFFF",	
"#00FFFF",
"#E0FFFF",
"#AFEEEE",
"#7FFFD4",	
"#40E0D0",	
"#48D1CC",
"#00CED1",	
"#4682B4",
"#B0E0E6",	
"#ADD8E6",
"#87CEEB",	
"#87CEFA",	
"#00BFFF",
"#1E90FF",
"#6495ED",		
"#7B68EE",	
"#4169E1"
];
const btn = document.getElementById("btnClick");

btn.addEventListener("click", () => {
    btn.style.transform = "scale(0.9)";
    btn.style.transition = "transform 0.09s ease";

    setTimeout(() => {
        btn.style.transform = "scale(1)";
    }, 100);
});


BALLOONS.forEach(src => {
    const img = new Image();
    img.src = src;
});

const button = document.getElementById("btnClick");
const container = document.getElementById("balloonsContainer");
let clickF = 0;

button.addEventListener("click", () => {

    clickF++;
    // про поточний стан обєкта по осям
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 4;
    const centerY = rect.top;
    let count = 0;
    if (clickF === 1) {
        count = 1;
    }
    else if (clickF === 2) {
        count = 3;

    }
    else if (clickF === 3) {
        count = 7;
    }
    else if (clickF === 4) {
        count = 11;
    }

    if (clickF < 5) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const balloon = document.createElement("img");
                balloon.src = BALLOONS[Math.floor(Math.random() * BALLOONS.length)];
                balloon.classList.add("balloon");
                balloon.style.width = "100px";
                balloon.style.height = "120px";
                balloon.style.left = centerX + "px";
                balloon.style.top = centerY + "px";
                balloon.style.position = "absolute";

                // --- Анимация с раскачкой и подъёмом ---
                let angle = 0;

                let swingSpeed = 0.01 + Math.random() * 0.01; // скорость раскачки
                let maxTilt = 5 + Math.random() * 5;           // угол наклона
                let swing = 50 + Math.random() * 50;          // горизонтальный размах
                let riseSpeed = 0.5 + Math.random() * 0.5;    // вертикальный подъём
                let posY = 0;

                const direction = (i % 2 === 0) ? 1 : -1;
                function animateBalloon() {
                    angle += swingSpeed;

                    const swingFactor = Math.sin(angle);

                    const tilt = swingFactor * maxTilt;

                    const offsetX = direction * swingFactor * swing + Math.random() * 0.5;
                    posY += riseSpeed;
                    const offsetY = -posY;

                    balloon.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${tilt}deg)`;

                    // удаляем элемент после достижения верхней границы
                    if (offsetY + balloon.height > -450) {
                        requestAnimationFrame(animateBalloon);
                    } else {
                        balloon.remove();
                    }
                }
                animateBalloon();
                container.appendChild(balloon);
            }, i * 100); // ⏳ затримка: кожен наступний через 0.1 секунду

        }
    } else if (clickF === 5) {
        // оставляем конфетти и текст как есть
        button.remove();
        confetti({
            particleCount: 500,
            spread: 70,
            startVelocity: 50,
            origin: { y: 0.6 },
            colors: randomColors(20),
            ticks: 300,
        });

        setTimeout(() => {
            setInterval(() => {
                confetti({
                    particleCount: 2,
                    startVelocity: 0,
                    spread: 360,
                    ticks: 400,
                    colors: randomColors(20),
                    origin: { x: Math.random(), y: 0 }
                });
            }, 20);
        }, 1000);

        setTimeout(() => {

            function insertSoftHyphens(word) {
                const vowels = "аеёиоуыэюя";
                let result = "";

                for (let i = 0; i < word.length; i++) {
                    result += word[i];

                    // проверяем возможность вставки мягкого переноса
                    const charsBefore = i + 1;           // сколько символов уже в результат
                    const charsAfter = word.length - i - 1; // сколько символов осталось после текущего
                    if (
                        vowels.includes(word[i].toLowerCase()) &&
                        charsBefore > 2 &&       // минимум 2 буквы до
                        charsAfter > 2           // минимум 2 буквы после
                    ) {
                        result += "&shy;";
                    }
                }

                return result;
            }

            function wrapWithHyphen(text) {
                return text.split(" ")
                    .map(w => insertSoftHyphens(w))
                    .join(" ");
            }



            function wrapWithHyphen(text) {
                return text.split(" ")
                    .map(w => insertSoftHyphens(w))
                    .join(" ");
            }


            const board = document.createElement("div");
            board.id = "board";
            const textB = document.createElement("p");
            textB.id = "pText";
            const myText = `Желаю побольше улыбок радости и смеха вокруг,
чтобы мечты все сбывались а задумки удавались👍, удачи в учебе как никак уже не школьница,
ешь побольше растишки и рости большой и сильной, при этом оставайся такой же сногсшибательной,
обворожительной и неповторимой. Желаю чтобы этот год для тебя прошел легко и без напряга, 
чтобы нарисовала куча красивых картинок или что ты там рисуешь, ну и просто была счастлива 
и всегда улыбалась💃. Очень хотел бы провести этот день с тобой и сказать это всё в живую,
буду надеяться что в следующем году это всё же получиться. Жду фоточек с ДР и ещё раз с Праздником.❤️`;

            textB.innerHTML = wrapWithHyphen(myText, 30);
            board.appendChild(textB);
            document.body.appendChild(board);
            requestAnimationFrame(() => board.classList.add("show"));
        }, 10000);

        setTimeout(() => {
            const Tdiv = document.createElement("div");
            const Th1 = document.createElement("h1");

            Tdiv.id = "titel";
            Th1.id = "titelH";

            Th1.textContent = "С днём рождения";
            
            Tdiv.appendChild(Th1);
            document.body.appendChild(Tdiv);

        }, 2000);

    }
});
function getRandomColor() {
  return colors1[Math.floor(Math.random() * colors1.length)];
}

function randomColors(n) {
    return Array.from({ length: n }, () => '#' + Math.floor(Math.random() * 16777215).toString(16));
}
