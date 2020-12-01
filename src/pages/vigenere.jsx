import { useState } from 'react'

const Vigenere = () => {

    const [lang, setLang] = useState('');
    const [action, setAction] = useState('');
    const [key, setKey] = useState('');
    const [word, setWord] = useState('');
    const [result, setResult] = useState('')


    const alphabet = {
        ru: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'],
        en: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    }

    const regExp = {
        ru: /[А-ЯЁ]/g,
        en: /[A-Z]/g,
        all: /[~`!@#$%^&*()_+"№;%:?_+0-9]/g
    }

    function encrypt() {
        if(checkLang()) {
            const encWord = word.split('');
            const encKey = key.split('');
            if (encKey[0] && encWord[0]) {
                const langChars = alphabet[lang];
                let encrypted = [];
                let keyIter = 0;
                for (let i = 0; i < encWord.length; i++) {
                    if (keyIter == encKey.length) {
                        keyIter = 0;
                    }
                    let textChar;
                    let keyChar;
                    let codeChar;
                    for (let j = 0; j < langChars.length; j++) {
                        if (langChars[j] == encWord[i]) {
                            textChar = j;
                        }
                        if (langChars[j] == encKey[keyIter]) {
                            keyChar = j;
                        }
                    }
                    if (textChar + keyChar > langChars.length - 1) {
                        codeChar = textChar + keyChar - langChars.length;
                    } else {
                        codeChar = textChar + keyChar;
                    }
                    encrypted.push(langChars[codeChar]);
                    keyIter++;
                }
                setResult(encrypted.join(''))
            }
        } else {
            alert('Error: Некоторые символы не соответствуют выбранному языку');
        }
    }
    
    function decrypt() {
        if(checkLang()) {
            const decWord = word.split('');
            const decKey = key.split('');
            if (decKey[0] && decWord[0]) {
                const langChars = alphabet[lang];
                let decrypted = [];
                let keyIter = 0;
                for (let i = 0; i < decWord.length; i++) {
                    if (keyIter == decKey.length) {
                        keyIter = 0;
                    }
                    let textChar;
                    let keyChar;
                    let codeChar;
                    for (let j = 0; j < langChars.length; j++) {
                        if (langChars[j] == decWord[i]) {
                            codeChar = j;
                        }
                        if (langChars[j] == decKey[keyIter]) {
                            keyChar = j;
                        }
                    }
                    if (codeChar - keyChar < 0) {
                        textChar = codeChar - keyChar + langChars.length;
                    } else {
                        textChar = codeChar - keyChar;
                    }
                    decrypted.push(langChars[textChar]);
                    keyIter++;
                }
                setResult(decrypted.join(''))
            }
        } else {
            alert('Error: Некоторые символы не соответствуют выбранному языку');
        }
    }

    //event Handlers
    function changeAction(e) {
        setAction(e.target.value);
    }

    function changeLang(e) {
        setLang(e.target.value);
    }

    function keyHandler(e) {
        const str = e.target.value.toUpperCase();
        if(checkLetter(str)) {
            setKey(str);
        } else {
            setKey(key)
        }
    }

    function wordHandler(e) {
        const str = e.target.value.toUpperCase();
        if(checkLetter(str)) { 
            setWord(str);
        } else {
            setWord(word)
        }
    }

    function checkLang() {
        if(lang === 'ru') {
            if(!word.match(regExp.en) && !key.match(regExp.en)) {
                return true;
            } else {
                return false;
            }
        } else if( lang === 'en') {
            if(!word.match(regExp.ru) && !key.match(regExp.ru)) {
                return true;
            } else {
                return false;
            }
        }
    }

    function checkLetter(value) {
        if(value.match(regExp.all)) {
            alert('Обнаружены недопустимые символы!!!');
            return false
        } else {
            return true
        }
    }

    function startMethod() {
        switch(action) {
            case 'encrypt': 
                encrypt();
                break;
            case 'decrypt':
                decrypt();
                break;
            default:
                break;
        }
    }

    return(
        <div className='page_container'>
            <div className="method_inputs">
                <h4 className="method_name">
                    Шифр Виженера
                </h4>
                <div className="actions_container">
                    <label htmlFor="action">Действие: </label>
                    <select className="select" name="action" id="action" onChange={(e) => { changeAction(e)}}>
                            <option selected disabled hidden>Выберите действие</option>
                            <option value="encrypt">Зашифровать</option>
                            <option value="decrypt">Дешифровать</option>
                    </select>
                    <label htmlFor="lang">Язык: </label>
                    <select className="select" name="lang" id="lang" onChange={(e) => { changeLang(e)}}>
                            <option selected disabled hidden>Выберите язык</option>
                            <option value="ru">Русский</option>
                            <option value="en">Английский</option>
                    </select>
                </div>

                <div className='inputs_container'>
                    <input value={key} className="input" name="key" type="text" placeholder="Ключ" onChange={e => {keyHandler(e)}}/>
                    <input value={word} className="input" name="word" type="text" placeholder="Слово" onChange={e => {wordHandler(e)}}/>
                </div>
                <button onClick={()=>{startMethod()}}>Подтвердить</button>
            </div>
            <div className="result_container">
                {result}
            </div>
        </div>
    )
}

export default Vigenere