// var bodyParser = require('body-parser');
// var data = [{item:'get milk'},{item:'walk dog'},{item:'drinking water'}];
// var urlencodedParser = bodyParser.urlencoded({extended: false});
// module.exports = function(app){
// app.get('/todo',function(req,res){
//     res.render('todoView',{todos: data});
// });
// app.post('/todo',urlencodedParser,function(req,res){
//     data.push(req.body);
//     res.json(data);
// });
// app.delete('/todo/:item',function(req,res){
//     data = data.filter(function(todo){
//         return todo.item.replace(/ /g,'-') !== req.params.item;
//     });
//     res.json(data);
// });
// };

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('cluster0.c4qsxwg.mongodb.net/');
var todoSchema = new mongoose.Schema({
    item: String
});
var Todo = mongoose.model('Todo',todoSchema);
var itemOne=Todo({item: 'buy Flowers'}).save(function(err){
    if(err) throw err;
    console.log('item saved');
})
var data = [{item:'get milk'},{item:'walk dog'},{item:'drinking water'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){
    app.get('/todo',function(req,res){
        res.render('todoView',{todos: data});
    });
    
    app.post('/todo',urlencodedParser,function(req,res){
        data.push(req.body);
        res.json(data);
    });
    
    app.delete('/todo/:item',function(req,res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g,'-') !== req.params.item;
        });
        res.json(data);
    });
};