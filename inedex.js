require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY_TEST);

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.get('/',(req,res) => {
    res.send('hello payment')
})

const calculateAmount = (items) => {
    // here is the logic of the items cost calculations.
    return 1400;
}

app.post('/api/stripe/charge', async(req,res) => {
    
    const {items} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateAmount(items),
        currency: 'inr',
        automatic_payment_methods: {
            enabled: true,
        },
    })

 res.send({
   clientSecret: paymentIntent.client_secret,
 });


})

app.listen(5000, () => {
    console.log('app is listening to the server')
})