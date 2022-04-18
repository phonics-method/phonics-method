export const visitWithCookies = (
  path: string,
  cookies: Record<string, string>
) => {
  cy.visit('/', {
    onBeforeLoad: (window) => {
      window.document.cookie = Object.entries(cookies)
        .map(([k, v]) => `${k}=${v}`)
        .join('; ')
    },
  })
}

export const isNotInteractable = (selector: string) => {
  cy.get(selector).click({ force: true })
  cy.once('fail', err => {
    expect(String(err)).to.include('cover')
  }
  cy.get(selector).click({
    timeout: 50,
  }).then(() => { throw new Error('Element is clickable') })
}
