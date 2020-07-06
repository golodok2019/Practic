$(function () {
    var outputText = $('#outputText');
    var outputWord = $('#outputWord');
    var outputSymbol = $('#outputSymbol');
    $('#btn').on('click', function () {
        outputWord.html('');
        outputSymbol.html('');
        outputText.html('');
        var input = document.getElementById('textInput').value;
        if (isWordAnaliz.checked) {
            $.ajax({
                type: "POST",
                url: "https://corpus.by/WordFrequencyCounter/api.php",
                data: {
                    "text": input,
                    "stop_words": "",
                    "words_to_count": "",
                    "symbols_of_words": "0123456789\nABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz\nАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя\nЂЃѓЉЊЌЋЏђљњќћџЎўЈҐЁЄЇІіґёєјЅѕї",
                    "symbols_in_words": "-'",
                    "contextsMax": "0",
                    "caseSensitive": "0",
                    "contextSensitive": "0"
                },
                beforeSend: function () {
                    outputText.html('<p>Запыт адпраўлены на аналіз слоў. Чакайце адказу.</p>');
                },
                success: function (msg) {
                    var result = JSON.parse(msg);
                    outputText.html('');
                    document.getElementById('textInput').value = result.text;
                    outputWord.append('<p>Колькасць слоў у тэксце - ' + result.wordsCnt + '</p>');
                    outputWord.append('<p>Каолькасць унікальных слоў слоў у тэксце - ' + result.uniqueCnt + ' </p>');
                    if (isWordInf.checked) {
                        outputWord.append(result.result);
                    }
                },
                error: function () {
                    document.getElementById('textInput').value = input;
                    outputText.html('<p>Памылка пры запросе на аналіз слоў</p>');
                }
            });
        }
        if (isSymbolAnaliz.checked) {
            $.ajax({
                type: "POST",
                url: "https://corpus.by/CharacterFrequencyCounter/api.php",
                data: {
                    "text": input
                },
                beforeSend: function () {
                    outputText.html('<p>Запыт адпраўлены на аналіз сімвалаў. Чакайце адказу.</p>');
                },
                success: function (msg) {
                    outputText.html('');
                    var result = JSON.parse(msg);
                    outputSymbol.append(result.result);
                },
                error: function () {
                    outputText.html('<p>Памылка пры запросе на аналіз сімвалаў</p>');
                }
            });
        }
        return false;
    });
});


