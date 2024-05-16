// createOrg.cy.js

import * as constants from "../constants.js";

export function createOrg(requestBody1) {

    return cy.fixture("attachFiles/example.jpg", "binary").then((image) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(requestBody1));
        const blob = Cypress.Blob.binaryStringToBlob(image, "image/jpg");
        formData.append("logo", blob, "example.jpg");

        // Convert FormData to string
        const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
        let payload = '';
        formData.forEach((value, key) => {
            payload += `--${boundary}\r\n`;
            payload += `Content-Disposition: form-data; name="${key}";`;
            if (key === 'logo') {
                payload += ` filename="example.jpg"\r\n`;
                payload += `Content-Type: image/jpg\r\n\r\n`;
                payload += value + `\r\n`;
            } else {
                payload += `\r\n\r\n${value}\r\n`;
            }
        });
        payload += `--${boundary}--`;

        return cy.request({
            method: 'POST',
            url: constants.url + constants.createOrg,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`
            },
            body: payload,
            failOnStatusCode: false,
            encoding: 'binary'
        });
    });
}
export function login(requestBody) {
    return cy.request({
        method: 'POST',
        url: constants.url + constants.login,
        failOnStatusCode: false,
        body: requestBody
    }).then((response) => {
        return response;
    });
}
export function signup(signupToken, requestBody) {
    return cy.request({
        method: 'POST',
        url: constants.url + constants.signup + "/" +signupToken,
        failOnStatusCode: false,
        body: requestBody
    }).then((response) => {
        return response;
    });
}
export function createUserInfo(requestBody, session) {
    return cy.request({
        method: 'POST',
        url: constants.url + constants.createUserInfo,
        failOnStatusCode: false,
        body: requestBody,
        headers: {
            'Cookie': 'session=' + session
        }
    }).then((response) => {
        return response;
    });
}




export function changeFirmStatus(orgID, session) {
    return cy.request(
        {
            method: 'Post',
            url: constants.url+constants.changefirmstatus,
            failOnStatusCode: false,
            body: {
                "orgID": orgID

            }
            ,
            headers: {
                'Cookie': 'session=' + session
            }
        }
    ).then((response) => {
        cy.log(response.body.token);
       ////////////////////// expect(response.status).to.eq(200);
        return response;
    });
}