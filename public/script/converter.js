// Letters dictionary
let sundanese = {
    aksara: {
        swara: {
            'a': '\u1b83',
            'i': '\u1b84',
            'u': '\u1b85',
            'é': '\u1b86',
            'o': '\u1b87',
            'e': '\u1b88',
            'eu': '\u1b89',
        },
        ngalagena: {
            'k': '\u1b8a',
            'q': '\u1b8b',
            'g': '\u1b8c',
            'ng': '\u1b8d',
            'c': '\u1b8e',
            'j': '\u1b8f',
            'z': '\u1b90',
            'ny': '\u1b91',
            't': '\u1b92',
            'd': '\u1b93',
            'n': '\u1b94',
            'p': '\u1b95',
            'f': '\u1b96',
            'v': '\u1b97',
            'b': '\u1b98',
            'm': '\u1b99',
            'y': '\u1b9a',
            'r': '\u1b9b',
            'l': '\u1b9c',
            'w': '\u1b9d',
            's': '\u1b9e',
            'x': '\u1b9f',
            'h': '\u1ba0',
            'kh': '\u1bae',
            'sy': '\u1baf',
        }
    },
    rarangken: {
        vokal: {
            'i': {
                name: 'Panghulu',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /i/',
                char: '\u1ba4',
            },
            'u': {
                name: 'Panyuku',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /u/',
                char: '\u1ba5',
            },
            'é': {
                name: 'Panéléng',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /é/',
                char: '\u1ba6',
            },
            'o': {
                name: 'Panolong',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /o/',
                char: '\u1ba7',
            },
            'e': {
                name: 'Pamepet',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /e/',
                char: '\u1ba8',
            },
            'eu': {
                name: 'Paneuleung',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /eu/',
                char: '\u1ba9',
            },
        },
        sisip: {
            'y': {
                name: 'Pamingkal',
                desc: 'Menambah konsonan /y/ di tengah suku kata',
                char: '\u1ba1',
            },
            'r': {
                name: 'Panyakra',
                desc: 'Menambah konsonan /r/ di tengah suku kata',
                char: '\u1ba2',
            },
            'l': {
                name: 'Panyiku',
                desc: 'Menambah konsonan /l/ di tengah suku kata',
                char: '\u1ba3',
            },
        },
        akhir: {
            'ng': {
                name: 'Panyecek',
                desc: 'Menambah konsonan /ng/ di akhir suku kata',
                char: '\u1b80',
            },
            'r': {
                name: 'Panglayar',
                desc: 'Menambah konsonan /r/ di akhir suku kata',
                char: '\u1b81',
            },
            'h': {
                name: 'Pangwisad',
                desc: 'Menambah konsonan /h/ di akhir suku kata',
                char: '\u1b82',
            },
            '/': {
                name: 'Pamaéh',
                desc: 'Meniadakan vokal pada suku kata',
                char: '\u1baa',
            },
        },
    },
    angka: [
        '\u1bb0',
        '\u1bb1',
        '\u1bb2',
        '\u1bb3',
        '\u1bb4',
        '\u1bb5',
        '\u1bb6',
        '\u1bb7',
        '\u1bb8',
        '\u1bb9',
    ]
};

/*
 * Regular Expression used to parse or divide Latin text into
 * parts of Sundanese character, generally like dividing
 * every syllable in the text.
 */
const parser = {
    latin: /((ny|ng|kh|sy|[^aiueéo\s\d\W])([rly])?(eu|[aiueéo])?|(?<![b-df-hj-np-tv-z])(eu|[aiueéo])|(\d+)|(\W+))((?<=[aiueéo])([rh]|ng)(?![aiueéo]))?/gi,
    sundanese: /((([\u1b83-\u1b89])|([\u1b8a-\u1ba0\u1bae-\u1baf])([\u1ba1-\u1ba3]?)([\u1ba4-\u1ba9]?))([\u1b80-\u1b82]|(?<=[\u1b83-\u1ba0\u1bae-\u1baf])\u1baa)?|([\u1bb0-\u1bb9]+))|[^\u1b80-\u1bbf]+/gi
}

function latinToSundanese(text) {
    text = text.toLowerCase();
    let result = '';
    let parsed = text.matchAll(parser.latin);
    let aParsed;

    while (true) {
        aParsed = parsed.next();
        if (aParsed.done) break;

        if (aParsed.value[0].match(/[a-zé]/i)) {

            if (aParsed.value[2]) {
                result += sundanese.aksara.ngalagena[aParsed.value[2]];

                if (aParsed.value[0].length === 1) {
                    result += sundanese.rarangken.akhir['/'].char;
                    continue;
                }

                if (aParsed.value[3])
                    result += sundanese.rarangken.sisip[aParsed.value[3]].char;

                if (aParsed.value[4])
                    if (aParsed.value[4] == 'a') null;
                    else result += sundanese.rarangken.vokal[aParsed.value[4]].char;

            } else result += sundanese.aksara.swara[aParsed.value[5]];

            if (aParsed.value[9])
                result += sundanese.rarangken.akhir[aParsed.value[9]].char;

        } else if (aParsed.value[0].match(/\d/)) {
            result += '|';

            for (digit of aParsed.value[0])
                result += sundanese.angka[digit];

            result += '|';
        } else result += aParsed.value[0];
    }

    return result;
}

function sundaneseToLatin(text) {
    let result = '';
    let parsed = text.matchAll(parser.sundanese);
    let aParsed;
    let getKey = (ref, cond) => Object.entries(ref).filter(cond)[0][0];

    while (true) {
        aParsed = parsed.next();
        if (aParsed.done) break;

        if (aParsed.value[2]) {
            if (aParsed.value[3])
                result += getKey(sundanese.aksara.swara, i => i[1] == aParsed.value[3]);
            else if (aParsed.value[4])
                result += getKey(sundanese.aksara.ngalagena, i => i[1] == aParsed.value[4]);

            if (aParsed.value[5])
                result += getKey(sundanese.rarangken.sisip, i => i[1].char == aParsed.value[5]);
            if (aParsed.value[6])
                result += getKey(sundanese.rarangken.vokal, i => i[1].char == aParsed.value[6]);
            else if (!aParsed.value[3])
                result += 'a';
            if (aParsed.value[7]) {
                if (aParsed.value[7] == sundanese.rarangken.akhir['/'].char) {
                    result = result.slice(0, -1);
                } else result += getKey(sundanese.rarangken.akhir, i => i[1].char == aParsed.value[7]);
            }
        } else if (aParsed.value[8]) {
            for (digit of aParsed.value[8])
                result += sundanese.angka.indexOf(digit);
        } else result += aParsed.value[0];
    }

    return result;
}