// https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3_authentication

const endpoint = 'https://api.hsforms.com/submissions/v3/integration/submit'
// const portalId = proccess.env.PORTAL_ID; // '738009'
// const formId = proccess.env.FORM_ID
// const formUrl = `${endpoint}/${portalId}/${formId}`
const formUrl = 'https://api.hsforms.com/submissions/v3/integration/submit/45391027/bf9cf553-5fe3-4b2a-8fd2-766677937874'
const hubspotForm = document.forms['submit-to-hs']

// JSON format for HS forms
// const dataTest = {
//     "fields": [
//         {
//             "name": "email",
//             "value": "fabianacfdutra@gmail.com"
//         },
//         {
//             "name": "firstname",
//             "value": "Fabiana"
//         },
//         {
//             "name": "lastname",
//             "value": "Dutra"
//         },
//         {
//             "name": "message",
//             "value": "Testing Form Fabiana"
//         }
//     ],
//     "context": {
//         "hutk": ":hutk",
//         "pageUri": "dutraneto.tech",
//         "pageName": "Portfolio"
//     }
// }

const formatFormData = (formData) => formData.map((key) => {
    const name = key[0]
    const value = key[1];
    return { name: name, value: value };
});

hubspotForm.addEventListener('submit', (event) => {
    event.preventDefault()

    let formData = new FormData(hubspotForm)

    let raw = JSON.stringify({
        fields: formatFormData([...formData])
    });

    let myheaders = new Headers()
    myheaders.append('Content-Type', 'application/json')

    let request = new Request(formUrl, {
        method: 'POST',
        headers: myheaders,
        body: raw
    })

    fetch(request)
        .then(response => {
            if (!response.ok) { throw new Error('Invalid Response') }
            else {
                hubspotForm.classList.add('u-hide')
                document.querySelector('.u-thank-you').classList.remove('u-hide')
                console.log('Success!', response)
                return response
            }
        })
        .catch(error => console.log(error))
})
