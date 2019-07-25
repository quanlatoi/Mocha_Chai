let ListData = [
    {id: 1, name: 'Book01', status: 'available'},
    {id: 2, name: 'Book02', status: 'available'},
    {id: 3, name: 'Book03', status: 'available'},
    {id: 4, name: 'Book04', status: 'available'},
    {id: 5, name: 'Book05', status: 'available'},
    {id: 6, name: 'Book06', status: 'available'},
    {id: 7, name: 'Book07', status: 'available'},
    {id: 8, name: 'Book08', status: 'available'},
    {id: 9, name: 'Book09', status: 'available'}
];
module.exports.find = (callback) => {
    callback(null, ListData);
};
module.exports.findById = (id, callback) => {
    callback(null, ListData.find(item => item.id == id)); // typeof id === "string"
};
module.exports.save = (book, callback) => {
    let {name, status} = book;
    if (!name || !status) {
        callback({message:"Book is invalid"});
        return;
    }
    book = {
        id: Date.now(),
        name,
        status
    };
    ListData.push(book);
    callback(null, book);
};
module.exports.delete = (id, callback) => {
    let roweffected = ListData.length;
    ListData = ListData.filter(item => item.id != id);
    roweffected = roweffected - ListData.length;
    callback(null, {roweffected})
};
module.exports.update = (id, book, callback) => {
    let oldbook = ListData.find(item => item.id == id);
    if (!oldbook) {
        callback("Book not found!");
        return;
    }
    let index = ListData.indexOf(oldbook);
    Object.assign(oldbook, book);
    ListData.fill(oldbook, index, ++index);
    callback(null, oldbook);
};