// Letters dictionary
let sundanese = {
    aksara: {
        swara: {
            'a': '&#x1b83',
            'i': '&#x1b84',
            'u': '&#x1b85',
            'é': '&#x1b86',
            'o': '&#x1b87',
            'e': '&#x1b88',
            'eu': '&#x1b89',
        },
        ngalagena: {
            'k': '&#x1b8a',
            'q': '&#x1b8b',
            'g': '&#x1b8c',
            'ng': '&#x1b8d',
            'c': '&#x1b8e',
            'j': '&#x1b8f',
            'z': '&#x1b90',
            'ny': '&#x1b91',
            't': '&#x1b92',
            'd': '&#x1b93',
            'n': '&#x1b94',
            'p': '&#x1b95',
            'f': '&#x1b96',
            'v': '&#x1b97',
            'b': '&#x1b98',
            'm': '&#x1b99',
            'y': '&#x1b9a',
            'r': '&#x1b9b',
            'l': '&#x1b9c',
            'w': '&#x1b9d',
            's': '&#x1b9e',
            'x': '&#x1b9f',
            'h': '&#x1ba0',
            'kh': '&#x1bae',
            'sy': '&#x1baf',
        }
    },
    rarangken: {
        vokal: {
            'i': {
                name: 'Panghulu',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /i/',
                char: '&#x1ba4',
            },
            'u': {
                name: 'Panyuku',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /u/',
                char: '&#x1ba5',
            },
            'é': {
                name: 'Panéléng',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /é/',
                char: '&#x1ba6',
            },
            'o': {
                name: 'Panolong',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /o/',
                char: '&#x1ba7',
            },
            'e': {
                name: 'Pamepet',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /e/',
                char: '&#x1ba8',
            },
            'eu': {
                name: 'Paneuleung',
                desc: 'Mengubah vokal aksara <i>Ngalagena<i> dari /a/ menjadi /eu/',
                char: '&#x1ba9',
            },
        },
        sisip: {
            'y': {
                name: 'Pamingkal',
                desc: 'Menambah konsonan /y/ di tengah suku kata',
                char: '&#x1ba1',
            },
            'r': {
                name: 'Panyakra',
                desc: 'Menambah konsonan /r/ di tengah suku kata',
                char: '&#x1ba2',
            },
            'l': {
                name: 'Panyiku',
                desc: 'Menambah konsonan /l/ di tengah suku kata',
                char: '&#x1ba3',
            },
        },
        akhir: {
            'ng': {
                name: 'Panyecek',
                desc: 'Menambah konsonan /ng/ di akhir suku kata',
                char: '&#x1b80',
            },
            'r': {
                name: 'Panglayar',
                desc: 'Menambah konsonan /r/ di akhir suku kata',
                char: '&#x1b81',
            },
            'h': {
                name: 'Pangwisad',
                desc: 'Menambah konsonan /h/ di akhir suku kata',
                char: '&#x1b82',
            },
            '/': {
                name: 'Pamaéh',
                desc: 'Meniadakan vokal pada suku kata',
                char: '&#x1baa',
            },
        },
    },
    angka: [
        '&#x1bb0',
        '&#x1bb1',
        '&#x1bb2',
        '&#x1bb3',
        '&#x1bb4',
        '&#x1bb5',
        '&#x1bb6',
        '&#x1bb7',
        '&#x1bb8',
        '&#x1bb9',
    ]
};

/*
 * Regular Expression used to parse or divide Latin text into
 * parts of Sundanese character, generally like dividing
 * every syllable in the text.
 */
const parser = /(([^aiueéo\s\d\W])([rly])?(eu|[aiueéo])?|(?<![b-df-hj-np-tv-z])(eu|[aiueéo])|(\d+)|(\W+))((?<=[aiueéo])([rh]|ng)(?![aiueéo]))?/gi;

function latinToSundanese(text) {
    text = text.toLowerCase();
    let result = '';
    let parsed = text.matchAll(parser);
    let aParsed;
    
    while (true) {
        aParsed = parsed.next();
        if (aParsed.done) break;
      
        if (aParsed.value[0].match(/[a-zé]/i)) {

            if (aParsed.value[2]) {
                result += sundanese.aksara.ngalagena[aParsed.value[1]];

                if (aParsed.value[0].length === 1) {
                    result += sundanese.rarangken.akhir['/'].char;
                    continue;
                }

                if (aParsed.value[4] && !(aParsed.value[2] == 'a'))
                    result += sundanese.rarangken.vokal[aParsed.value[2]].char;
                
                if (aParsed.value[3])
                    result += sundanese.rarangken.sisip[aParsed.value[6]].char;

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
    let result;

    return result;
}