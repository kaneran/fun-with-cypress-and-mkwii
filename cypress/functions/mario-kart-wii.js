import { getTableData } from "./util";

export function verifyPlayerHasMoreConcurrentRecords(playerA, playerB) {
  cy.fixture("mario-kart-wii").then((fixture) => {
    cy.get(fixture.selector.tallyTables)
      .eq(0)
      .then((table) => {
        getTableData(table);
        //tableData = [{player: "Logan", "Country": "USA", WR Record: 0}, {...}]
        cy.task("getCache", "tableData").then((tableData) => {
          getPlayer(tableData, playerA);
          getPlayer(tableData, playerB);
          verifyConcurrentRecords(playerA, playerB);
        });
      });
  });
}

function getPlayer(tableData, player) {
  let playerData = tableData.find((p) => p["Player"] === player);
  cy.task("putInCache", { key: player, data: playerData });
}

function verifyConcurrentRecords(playerA, playerB) {
  cy.task("getCache", playerA).then((firstPlayer) =>
    cy.task("getCache", playerB).then((secondPlayer) => {
      const firstPlayerRecordCount = parseInt(firstPlayer["WR Count"]);
      const secondPlayerRecordCount = parseInt(secondPlayer["WR Count"]);
      expect(firstPlayerRecordCount).to.be.greaterThan(secondPlayerRecordCount);
    })
  );
}
