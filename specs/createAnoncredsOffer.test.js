const chai = require('chai');
const { expect } = chai;
const anoncredsCredentialDefinition = require("../test-vectors/anoncreds-credential-definition.json");
const w3cTestVector = require("../test-vectors/w3c-credential-anoncreds.json");

const generateCredentialOffer = require("./mockDataGenerator");


describe('AnonCreds Credential Offer', function () {
  it('should generate a valid credential offer', function () {
    const simulatedOffer = generateCredentialOffer(anoncredsCredentialDefinition);

    //Verify that the created offer matches the structure and specifications defined in anoncreds-credential-definition.json
    expect(simulatedOffer).to.be.an('object');
    expect(simulatedOffer).to.have.property('@context').to.deep.equal(anoncredsCredentialDefinition['@context']);
    expect(simulatedOffer.type).to.deep.equal(anoncredsCredentialDefinition.type);
    expect(simulatedOffer.issuer).to.equal(anoncredsCredentialDefinition.issuerId);


    // Check if the AnonCreds offer can be correctly translated into a W3C credential format as outlined in w3c-credential-anoncreds.json
    expect(simulatedOffer).to.have.property('@context').to.deep.equal(w3cTestVector['@context']);
    expect(simulatedOffer.type).to.deep.equal(w3cTestVector.type);
    expect(simulatedOffer.issuer).to.equal(w3cTestVector.issuer);
  });

});
