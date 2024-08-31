let isAutoplayEnabled = false;

// Wczytaj plik JSON znajdujący się w tym samym katalogu co skrypt
fetch('poems-info.json')
    .then(response => response.json())
    .then(poems => {
        const mediaPath = {
            img: '/media/img/poems/',
            audio: '/media/audio/'
        };
        const grid = document.getElementById("audio-grid");
        const audioElements = [];
        // Dla każdego elementu w JSON generuj blok HTML
        for (const [name, fileName] of Object.entries(poems)) {
            const figure = document.createElement('figure');
            figure.classList.add('custom-figure');
            figure.style.backgroundImage = `url(${mediaPath.img}${fileName}.jpeg)`;
            
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = name;
            figure.appendChild(figcaption);

            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = `${mediaPath.audio}${fileName}.mp3`;
            figure.appendChild(audio);

            audioElements.push(audio);

            figure.addEventListener('click', () => {
                 // Pobierz wszystkie elementy audio
                const allAudioElements = document.querySelectorAll('audio');

                if (audio.paused) {
                    allAudioElements.forEach(a => a.pause()); // Pauzuj wszystkie audio
                    audio.play();
                } else {
                    audio.pause();
                }
            });

            audio.addEventListener('play', () => {
                const allAudioElements = document.querySelectorAll('audio');

                allAudioElements.forEach(a => {
                    if (a !== audio) {
                        a.pause(); // Pauzuj inne elementy audio
                    }
                });
            });

            audio.addEventListener('ended', () => {
                if (isAutoplayEnabled) {
                    let nextIndex = audioElements.indexOf(audio) + 1;
                    if (nextIndex < audioElements.length) {
                        audioElements[nextIndex].play();
                    }
                }
            });

            // Dodaj element figure do dokumentu (np. do body lub innego kontenera)
            grid.appendChild(figure);
        }
    })
    .catch(error => console.error('Error loading JSON:', error));

const checkbox = document.getElementById("autoplay-checkbox");
checkbox.addEventListener("change", () => {
    isAutoplayEnabled = !isAutoplayEnabled;
});
