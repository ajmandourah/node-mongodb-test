// Node stil dont use ES6 for imports. use required instead
let express = require('express')
let mongoose = require('mongoose')
let app = express();

//Now instead of using body parser user express.json
app.use(express.json());
app.use(express.urlencoded())


const url = "mongodb+srv://ladis:sephiroth@cluster0-wbsxd.mongodb.net/test?retryWrites=true&w=majority";

//connecting to the mongodb server. 
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('connected to Mongodb')
}).catch(() => {
    console.log("something happened!!!")
});
//defining a schema for the database. 
const MySchema = mongoose.Schema({ name: String, email: String })

//Creating the document called "contact" with the predefined schema.
const Contact = mongoose.model('contact', MySchema);

//defining a function to creat an entry in the database. NOTE that you must define the req, res to include a req.body , pretty obvious.
const CreatContact = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // definie the entry as a new entry in the Contact document.
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email
    });
    //save that entry
    contact.save().then(saved => {
        res.send(saved);
    });
}

app.get('/', (req, res) => {
    console.log("Hello world");
    //query all the entrys.
    Contact.find().then(all => res.send(all));
});

app.post('/', CreatContact);

app.listen(3000, () => console.log('Running..'))
