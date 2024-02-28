// https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3_authentication
const endpoint = 'https://api.hsforms.com/submissions/v3/integration/submit'
const portalId = '45391027'
const formId = '4d73d9f8-481d-4870-8b88-8416a38c7fe9'
const formUrl = `${endpoint}/${portalId}/${formId}`
console.log(formUrl)
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
