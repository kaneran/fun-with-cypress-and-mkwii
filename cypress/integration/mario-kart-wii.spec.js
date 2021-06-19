/// <reference types="cypress" />

import { verifyPlayerHasMoreConcurrentRecords } from "../functions/mario-kart-wii";

describe("Mario kart wii", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://mkwrs.com/mkwii/").as("getData");
    cy.visit("https://mkwrs.com/mkwii/");
    cy.wait("@getData").its("response.statusCode").should("equal", 200);
  });

  it("Check that the player Luke has more concurrent records than player Justin", () => {
    verifyPlayerHasMoreConcurrentRecords("Luke", "Justin");
  });

  it("Check that the player Logan has more concurrent records than player Sosis", () => {
    verifyPlayerHasMoreConcurrentRecords("Logan", "Sosis");
  });
});
