import { useState } from 'react'

const DES = () => {
    const [action, setAction] = useState('');
    const [encKey, setKey] = useState('');
    const [word, setWord] = useState('');
    const [resultWord, setResultWord] = useState('');
    const [resultKey, setResultKey] = useState('');

    const sizeOfBlock = 128; // В DES размер блока 64 бит, но поскольку в unicode символ в два раза длинее, то увеличим блок тоже в два раза
    const sizeOfChar = 16; // Размер одного символа
    const shiftKey = 2; // Сдвиг ключа 
    const quantityOfRounds = 16; // Количество раундов
    let blocks = []; // Блоки для деления

    // Дополнить строку до правильного размера
    function stringToRightLength(value) {
        while (((value.length * sizeOfChar) % sizeOfBlock) != 0) {
            value += "*";
        }
        return value;
    }

    // Поделить строку на блоки
    function сutStringIntoBlocks(value) {
        const blocksLength = (value.length * sizeOfChar) / sizeOfBlock;
        blocks = [];
        const lengthOfBlock = value.length / blocksLength;

        for (let i = 0; i < blocksLength; i++) {
            blocks[i] = value.substring(i * lengthOfBlock, (i + 1) * lengthOfBlock);
            blocks[i] = stringToBinaryFormat(blocks[i]);
        }
    }

    // Поделить бинарный код на блоки
    function cutBinaryStringIntoBlocks(value) {
        const blocksLength = value.length / sizeOfBlock;
        blocks = [];
        const lengthOfBlock = value.length / blocksLength
        for (let i = 0; i < blocksLength; i++) {
            blocks[i] = value.substring(i * lengthOfBlock, (i + 1) * lengthOfBlock);
        }
    }

    // Перевести строку в бинарный код (по умолчению до 16 бит)
    function stringToBinaryFormat(value) {
        let output = "";
        for (let i = 0; i < value.length; i++) {
            let char_binary = value[i].charCodeAt(0).toString(2);
            while (char_binary.length < sizeOfChar) {
                char_binary = "0" + char_binary;
            }
            output += char_binary;
        }
        return output;
    }

    // Перевести бинарный код в символьный
    function stringFromBinaryToNormalFormat(value) {
        let output = "";
        for (let i = 0; i < value.length / sizeOfChar; i++) {
            let char_binary = value.substring(i * sizeOfChar, (i + 1) * sizeOfChar);
            output += String.fromCharCode(parseInt(char_binary, 2));
        }
        return output;
    }

    // Дополнить ключ символами 
    function correctKeyWord(value, keyLength) {
        if (value.length > keyLength) {
            value = value.substring(0, keyLength);
        } else {
            while (value.length < keyLength) {
                value = "0" + value;
            }
        }
        return value;
    }

    // Один раунд DES шифрования
    function encodeDES_OneRound(value, key) {
        const L = value.substring(0, value.length / 2);
        const R = value.substring(value.length / 2);
        return (R + XOR(L, f(R, key)));
    }

    // Один раунд DES дешифрования 
    function decodeDES_OneRound(value, key) {
        const L = value.substring(0, value.length / 2);
        const R = value.substring(value.length / 2);

        return (XOR(f(L, key), R) + L);
    }

    // XOR
    function XOR(s1, s2) {
        let result = "";
        for (let i = 0; i < s1.length; i++) {
            const a = s1[i] - 0;
            const b = s2[i] - 0;
            if (a ^ b)
                result += "1";
            else
                result += "0";
        }
        return result;
    }

    // Логическая фунция (по умолчанию стоит XOR)
    function f(s1, s2) {
        return XOR(s1, s2);
    }

    // Циклический сдвиг ">>"
    function keyToNextRound(key) {
        for (let i = 0; i < shiftKey; i++) {
            key = key[key.length - 1] + key;
            key = key.slice(0, key.length - 1);
        }
        return key;
    }

    // Циклический сдвиг "<<"
    function keyToPrevRound(key) {
        for (let i = 0; i < shiftKey; i++) {
            key = key + key[0];
            key = key.slice(1);
        }
        return key;
    }

    // Зашифровать
    function encrypt() {
        let text = word;
        let key = encKey;
        text = stringToRightLength(text);
        сutStringIntoBlocks(text);
        key = correctKeyWord(key, text.length / (2 * blocks.length));
        key = stringToBinaryFormat(key);
        for (let j = 0; j < quantityOfRounds; j++) {
            for (let i = 0; i < blocks.length; i++) {
                blocks[i] = encodeDES_OneRound(blocks[i], key);
            }
            key = keyToNextRound(key);
        }
        key = keyToPrevRound(key);
        key = stringFromBinaryToNormalFormat(key);
        let code = "";
        for (let i = 0; i < blocks.length; i++) {
            code += blocks[i];
        }
        code = stringFromBinaryToNormalFormat(code);
        setResultKey(key);
        setResultWord(code)
    }

    // Расштфрование
    function decrypt() {
        let code = word;
        let key = encKey;
        key = stringToBinaryFormat(key);
        code = stringToBinaryFormat(code);
        cutBinaryStringIntoBlocks(code);
        for (let j = 0; j < quantityOfRounds; j++) {
            for (let i = 0; i < blocks.length; i++) {
                blocks[i] = decodeDES_OneRound(blocks[i], key);
            }
            key = keyToPrevRound(key);
        }
        key = keyToNextRound(key);
        key = stringFromBinaryToNormalFormat(key);
        let text = "";
        for (let i = 0; i < blocks.length; i++) {
            text += blocks[i];
        }
        text = stringFromBinaryToNormalFormat(text);
        setResultWord(text);
        setResultKey(key);
    }

    //Events
    function changeAction(e) {
        setAction(e.target.value);
    }

    function keyHandler(e) {
        setKey(e.target.value)
    }

    function wordHandler(e) {
        setWord(e.target.value)
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
                alert('что-то тут не так');
                break;
        }
    }

    return(
        <div className='page_container'>
        <div className="method_inputs">
            <h3 className="method_name">
                Метод шифрования DES
            </h3>
            <div className="actions_container">
                <label htmlFor="action">Действие: </label>
                <select className="select" name="action" id="action" onChange={(e) => { changeAction(e)} }>
                        <option selected disabled hidden>Выберите действие</option>
                        <option value="encrypt">Зашифровать</option>
                        <option value="decrypt">Дешифровать</option>
                </select>
            </div>

            <div className='inputs_container'>
                <input value={encKey} className="input" name="key" type="text" placeholder="Ключ" onChange={e => {keyHandler(e)}}/>
                <input value={word} className="input" name="word" type="text" placeholder="Слово" onChange={e => {wordHandler(e)}}/>
            </div>
            <button className="btn" onClick={()=>{startMethod()}}>Подтвердить</button>
        </div>
        <div className="result_container">
            <div className="result">
                Зашифрованная строка: {resultWord}<br/>
                Ключ: {resultKey}
            </div>
        </div>
    </div>
    )
}

export default DES