export function getTableData(table) {
  getTableRowCount(table);
  cy.task("getCache", "rowCount").then((rowCount) => {
    let tableData = [];
    let headers = [];
    cy.get(table)
      .find("tr")
      .each((row, rowIndex) => {
        let rowData = {};
        let rowColumns = Array.from(row[0].children);
        if (rowIndex === 0) {
          headers = rowColumns.map((header) => header.innerText);
        } else {
          rowColumns.forEach((data, index) => {
            const header = headers[index];
            rowData[header] = data.innerText;
            if (index === rowColumns.length - 1) {
              tableData.push(rowData);
              if (rowIndex === rowCount - 1) {
                cy.task("putInCache", { key: "tableData", data: tableData });
              }
            }
          });
        }
      });
  });
}

function getTableRowCount(table) {
  let rowCount;
  cy.get(table)
    .find("tr")
    .then((rows) => {
      rowCount = Cypress.$(rows).length;
      cy.task("putInCache", { key: "rowCount", data: rowCount });
    });
}
