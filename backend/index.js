const app = require('express')()
const axios = require('axios')

app.get('/api/biteKey', (req, res) => {
    const mail = req.query.email
    const UID = req.query.uid
    
    if (!UID && !mail) {
        return res.status(400).send('enter uid or email');
    }
    axios.get(`https://biteyt.xyz/api?searchKeyBy${UID ? `UID=${UID}` : `Email=${mail}`}`).then((response) => {
        res.send(response.data)
    }).catch((err) => {
        res.status(500).send(err)
    });
})

app.listen(3000, () => {
    console.log('API IS WORKING IN PORT 3000')
})