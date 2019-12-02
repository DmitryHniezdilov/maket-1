let getRequest = document.getElementById("btn1");

getRequest.addEventListener("click", function(){

    let inputValue = document.getElementById("input1").value;
    let inputLenght = document.getElementById("input1").value.length;

    console.log('inputValue',inputValue);

    if (inputLenght >= 3 && inputLenght < 21){ /* условие на длину запроса*/

        /* замена пробела на + */
        let valueInputRequest = document.getElementById("input1").value.replace(/ /g, '+');

        /* сборка запроса */
        let outputRequest = 'https://pixabay.com/api/?key=14466891-825cbc5bd7840ef3d724d53b3&q=' + valueInputRequest + '&image_type=photo';

        console.log('outputRequest', outputRequest);

        /* запрос */

        let request = new XMLHttpRequest();
        request.open('GET', outputRequest, true);

        request.onload = function() {

            if (this.status >= 200 && this.status < 400) {
                // Success!
                let data = JSON.parse(this.response);

                console.log('data', data);
                console.log('data_url', data.hits[3].webformatURL);

                /* дом - элементы */

                let Row = document.querySelector('.services__list'),
                    Col = document.querySelector('.services__item');

                /* удаление блоков с картинками */

                while (Row.firstChild) {
                    Row.removeChild(Row.firstChild);
                }

                /* добавление блоков с картинками*/

                for (let i = 0; i < 6; i++) {

                    Row.insertAdjacentHTML("beforeend", '<li class="services__item"><a href="#" class="services__link"><div class="services__inner"></div></a></li>' );

                    console.log('data_url', data.hits[i].webformatURL);

                    let pathSrc = data.hits[i].webformatURL.toString();
                    let pathAlt = data.hits[i].tags.toString();

                    let ColInner = document.querySelectorAll('.services__inner'),
                        ColInnerLast = ColInner[ColInner.length - 1];

                    ColInnerLast.innerHTML = '<img src="' + pathSrc + '" alt="' + pathAlt + '" class="services__img" />'
                }

            } else {
                // We reached our target server, but it returned an error
                console.log('error');
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
        };

        request.send();

    } else {

        let inputStyle = document.getElementById("input1");
        inputStyle.classList.add('js-inputError');

    }

}, false);