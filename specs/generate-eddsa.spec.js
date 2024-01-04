const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const proxyquire = require("proxyquire");

// Mock modules 
const Ed25519MultikeyMock = {
  from: sinon.stub().resolves({ }),
};

const DataIntegrityProofMock = sinon.stub().returns({ });

const jsonldMock = {
  documentLoaders: {
    node: sinon.stub(),
  },
};

const jsigsMock = {
  sign: sinon.stub().resolves({  }),
};

const generateEddsa = proxyquire("../generate-eddsa.mjs", {
  "@digitalbazaar/ed25519-multikey": Ed25519MultikeyMock,
  "@digitalbazaar/data-integrity": { DataIntegrityProof: DataIntegrityProofMock },
  "@digitalbazaar/eddsa-rdfc-2022-cryptosuite": { cryptosuite: {} },
  "jsonld-signatures": jsigsMock,
  "jsonld": jsonldMock,
});

const anoncredsSignedCredentialMock = require("./test-vectors/w3c-credential-anoncreds.json");
const eddsaIssuerKeyMock = require("./test-vectors/eddsa-issuer-key.json");
const eddsaHolderKeyMock = require("./test-vectors/eddsa-holder-key.json");

describe("generateEddsa module", function () {
  afterEach(function () {
    sinon.reset();
  });

  it("exports a function", function () {
    expect(generateEddsa).to.be.a("function");
  });

  it("generates a signed credential and suite", async function () {
    const result = await generateEddsa();

    
    expect(result.signedCredential).to.be.an("object");
    expect(result.suite).to.be.an("object");

  });

  it("exports the generated signed credential", function () {
    const result = generateEddsa();

    expect(result).to.be.an("object");

  });

  it("exports the generated suite", function () {
    const result = generateEddsa();

    expect(result.suite).to.be.an("object");
  });

});
