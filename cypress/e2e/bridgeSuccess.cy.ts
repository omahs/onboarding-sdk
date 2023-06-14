describe('To check if the brige success screen is rendered fine', () => {
  beforeEach(() => {
    cy.visit('/sdkTest.html');
  });
  it('should render the success screen with switch back button', () => {
    cy.getById("address").type('0x6baa80fa2ad0cc622198b5a5128caf135ca34374');
    cy.getById("targetChainIdHex").type('0x2329');
    cy.getById("requiredTokenContractAddress").type('0x93581991f68dbae1ea105233b67f7fa0d6bdee7b');
    cy.getById("requiredTokenBalance").type('0');
    cy.getById("showInfoScreenFalse").check();
    cy.getById("appId").type("CYPRESS_TEST")

    cy.intercept('GET', '**/portfolio/balances**').as('fetchPortfolioBalances');
    cy.getById("addPopup").click();
    cy.wait('@fetchPortfolioBalances', { timeout: 50000 });
    cy.intercept('GET', '**/swap/evm/chains').as('swapChainsCheck');
    cy.wait('@swapChainsCheck', { timeout: 50000 });
    cy.contains('tr', 'Matic Token').find('.exchange-token-button').eq(0).click()

    cy.getById('bp-amount-value').type('10');
    cy.getByClass('bridge-input-submit').click();

    cy.getById('switch-chain-screen').should('exist');

    cy.intercept('POST', '**/v1/bridge/sdk/quote').as('getBridgeQuote');

    cy.getByClass('switch-chain-button').click();

    cy.getById('bridge-summary-screen').should('exist');


    cy.wait('@getBridgeQuote', {timeout: 50000})
      .its('response.statusCode')
      .should('eq', 201);

    cy.getById('bridge-submit-blue-button')
      .should('not.be.disabled');

    cy.intercept('**/v1/bridge/sdk/quote/**/deposit').as('depositCall');
    cy.getById('bridge-submit-blue-button')
      .click()
    cy.getById('bridge-loading-screen').should('exist');
    cy.intercept('**v1/prices/gas/**').as('getGasPrice');
    cy.wait('@getGasPrice', { timeout: 50000 });
    cy.wait('@depositCall', { timeout: 50000 });

    const interceptAndWait = () => {
      cy.intercept('**/v1/activities/status/bridge/**').as('statusCheck')

      cy.wait('@statusCheck', {timeout: 50000}).then((interception) => {
        const response = interception.response;
        if (response.body.activityStatus.status !== 'COMPLETED') {
          interceptAndWait();
        }
      });
    }

    interceptAndWait();

    cy.getById('bridge-success-screen').should('exist');
    cy.getById('bp-switch-container').should('exist');
    cy.getById('bp-switch-container').click();
  })
})

