var Book = require('../models/book');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var books = [
    new Book({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/1984first.jpg/220px-1984first.jpg',
        title: 'Nineteen Eighty-Four',
        author: 'George Orwell',
        description: 'Winston Smith is a member of the Outer Party. He works in the Records Department in the Ministry of Truth, rewriting and distorting history. To escape Big Brother\'s tyranny, at least inside his own mind, Winston begins a diary — an act punishable by death.',
        publisher: 'Secker & Warburg',
        publicationDate: '8 June 1949',
        genre: 'Dystopian',
        price: 20
    }),

    new Book({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/11-22-63.jpg/220px-11-22-63.jpg',
        title: '11/22/63',
        author: 'Stephen King',
        description: 'Life can turn on a dime—or stumble into the extraordinary, as it does for Jake Epping, a high school English teacher in a Maine town. While grading essays by his GED students, Jake reads a gruesome, enthralling piece penned by janitor Harry Dunning: fifty years ago, Harry somehow survived his father’s sledgehammer slaughter of his entire family. Jake is blown away…but an even more bizarre secret comes to light when Jake’s friend Al, owner of the local diner, enlists Jake to take over the mission that has become his obsession—to prevent the Kennedy assassination. How? By stepping through a portal in the diner’s storeroom, and into the era of Ike and Elvis, of big American cars, sock hops, and cigarette smoke…Finding himself in warmhearted Jodie, Texas, Jake begins a new life. But all turns in the road lead to a troubled loner named Lee Harvey Oswald. The course of history is about to be rewritten…and become heart-stoppingly suspenseful.',
        publisher: 'Scribner',
        publicationDate: '8 November 2011',
        genre: 'Science fiction',
        price: 18
    }),


    new Book({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/DaVinciCode.jpg/220px-DaVinciCode.jpg',
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        description: 'While in Paris on business, Harvard symbologist Robert Langdon receives an urgent late-night phone call: the elderly curator of the Louvre has been murdered inside the museum. Near the body, police have found a baffling cipher. Solving the enigmatic riddle, Langdon is stunned to discover it leads to a trail of clues hidden in the works of da Vinci…clues visible for all to see…and yet ingeniously disguised by the painter.',
        publisher: 'Transworld & Bantam Books',
        publicationDate: 'April 2003',
        genre: 'Science fiction',
        price: 15
    }),

];

var done = 0;
for (var i = 0; i < books.length; i++) {
    books[i].save(function(err, result) {
        done++;
        if (done === books.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}