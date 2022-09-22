import 'cypress-file-upload';

export function upload_jpeg(selector) {
    //Upload a document
    let mimeType = 'image/jpeg';
    let filename = 'brandLogo.jpeg';
    cy.fixture(filename, 'base64').then( fileContent => {
        cy.get(selector).attachFile({ fileContent, fileName: filename, mimeType: mimeType, encoding: 'base64'},
                                                       { subjectType: 'input', force: true });
    });
}
