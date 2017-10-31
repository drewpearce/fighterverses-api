function calculate_week(the_date = Date.now()) {
    week1 = Date.parse("2015-12-21 00:00:00");
    difference = the_date - week1;
    return Math.floor((difference / 1000) / 60 / 60 / 24 / 7) - 1;
}

function get_reference_by_week(weeks) {
    options = {}
    options.parameters = {}
    options.parameters.filter = 'raw_set_order=' + weeks;
    fighterverse = platform.api.get('verses/_table/verses', null, options);
    if ('reference' in fighterverse.content.resource[0]) {
        var master_reference = fighterverse.content.resource[0].reference;
        var book_chapter = master_reference.split(':')[0];
        var verses = master_reference.split(':')[1].split('-');
        var reference = {};
        reference.book = book_chapter.replace(/\d+$/, "");
        reference.book = reference.book.trim();
        reference.chapter = book_chapter.match(/\d+$/)[0];
        reference.verses = verses;
        fighterverse.content.resource[0].bibleapi = reference;
    }
    return fighterverse;
}

function convert_books_to_abbr(book) {
    var books = platform.api.get('bibles_org/versions/eng-ESV/books.js');
    var temp = JSON.parse(books.content);
    var book_list = temp.response.books;
    var abbr = 'test';
    for (var i=0; i < book_list.length; i++) {
        if (book_list[i].name == book) {
            abbr = book_list[i].abbr;
        }
    }
    return abbr;
}

function construct_api_endpoint(bibleapi) {
    var endpoint = 'chapters/eng-ESV:' + bibleapi.abbr + '.' + bibleapi.chapter + '/verses.js?start=' + bibleapi.verses[0];
    if (bibleapi.verses.length > 1) {
        endpoint = endpoint + '&end=' + bibleapi.verses[1];
    }
    return endpoint;
}

function get_verses(endpoint) {
    bible_api_result = platform.api.get('bibles_org/' + endpoint);
    return parse_verses(JSON.parse(bible_api_result.content));
}

function parse_verses(verse_content) {
    var text = '';
    verse_content.response.verses.forEach(function(verse) {
        text = text + verse.text + ' ';
    });    });
    text = text.replace(/(<sup([^>]+)>)/ig, '[');
    text = text.replace(/(<\/sup>)/ig, '] ');
    text = text.replace(/(<([^>]+)>)/ig, '');
    return {"verse_text": text};
}

var weeks = calculate_week();
var verse_info = get_reference_by_week(weeks);
var bibleapi = verse_info.content.resource[0].bibleapi;
bibleapi.abbr = convert_books_to_abbr(bibleapi.book);
var endpoint = construct_api_endpoint(bibleapi);
var bible_api_result = get_verses(endpoint);

return bible_api_result;
