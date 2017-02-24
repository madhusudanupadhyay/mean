exports.render = function(req, res) {
    res.render('index.ejs', {
        title: 'Hello World'
    });
};