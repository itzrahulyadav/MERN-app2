const express = require('express');
const mongoose = require('mongoose');
const FoodModel = require('./models/Food');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json());
mongoose.connect('mongodb+srv://itzrahulyadav:rahul1234@crud.ttfds.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

app.post('/insert', async (req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

    try {
        await food.save();
        console.log("data inserted successfully");
    } catch (err) {
        console.log(err)
    }
})
app.get('/read', (req, res) => {
    FoodModel.find({}, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    })
})
app.put('/update', async (req, res) => {
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;
    res.send(newFoodName);
    try {
        await FoodModel.findByIdAndUpdate(id, { foodName: newFoodName }, (err, result) => {
            if (err) console.log(err);
            res.send("updated successfully");
        })
    } catch (err) {
        console.log(err);
    }
})
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await FoodModel.findByIdAndDelete(id).exec();
    res.send("deleted successfully");
})
app.listen(5000, () => {
    console.log("server is running on port 5000");
})


