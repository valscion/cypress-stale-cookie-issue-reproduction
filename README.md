# README

This repository is a reproduction for this issue over at Cypress side: https://github.com/cypress-io/cypress/issues/25841

To trigger the Cypress stale cookie issue, we need this interaction:

1. Visit "Page A" and click the link on that page
2. The link click leads to a page that sets a cookie and redirects back to "Page A"
3. The "Page A" now shows the cookie value as a debug information
4. Cypress is instructed to go "Page B"
5. "Page B" triggers a fetch request
6. The server sets a cookie during the fetch request, returns HTTP 204 No Content
7. "Page B" is reloaded after fetch request is done
8. "Page B" should show the cookie value

With Cypress v11.2.0, "Page B" indeed shows the cookie value. The situation is not the same with Cypress v12.7.0.

## GitHub actions

The Cypress test `cypress/e2e/spec.cy.js` is running also in GitHub actions and the test failures can be seen there: <a href="../../actions?query=branch%3Amain">Actions</a>

## Setup steps

Install npm dependencies: `npm install`

## To run Rails test server

### Using Docker

```
docker-compose --project-name=cypress-stale-cookie-repro up --build
```

### Using `rbenv`

* Install rbenv: https://github.com/rbenv/rbenv#installation
* Checkout this repository and `cd` to it
* Install same version of ruby as this repo uses: `rbenv install`
* Install ruby dependencies: `bundle install`

Open the test environment rails server in own terminal:

```
npm run cypress:rails
```

### Running Cypress itself

Run the Cypress app in another terminal:

```
npm run cypress:open
```

You can also run the spec directly without Cypress GUI:

```
npm run cypress:run
```

You can also access the test Rails server in a different browser using http://localhost:3333


## To run regular development server

The development server automatically reloads code changes while the test server doesn't. Note that this needs `rbenv` steps to work.

```
bin/rails server
```

Then access the application with http://localhost:3000 to test cookies with domains.
