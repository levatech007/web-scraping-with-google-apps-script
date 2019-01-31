// this example scrapes a web page and selects all <td> values from a specified <table>

function scrapeWebPageContent() {
  // get the html page:
  var htmlPage = UrlFetchApp.fetch("https://en.wikipedia.org/wiki/Page_Name_Here").getContentText();
  var doc = XmlService.parse(htmlPage);
  var page = doc.getRootElement().getDescendants();
  // store all <table> elements:
  var tables = []
  // loop through all HTML elements on page:
  for(element in page) {
    var currentElement = page[element].asElement();
    // select all <table> elements:
    if(currentElement != null && currentElement.getName() == 'table')
       tables.push(currentElement);
  }
  // select the needed table from tables (in this example, we use table at index 3):
  var selectedTable = tables[3].getDescendants(); 
  // store table contents:
  var tableContent = []
  // loop through all HTML elements in selected <table>:
  for(element in selectedTable) {
    var selectedElement = selectedTable[element].asElement();
    // get all <tr> elements from selected <table>:
    if(selectedElement != null && selectedElement.getName() == 'tr') {
      var tableRow = selectedElement.getDescendants();
      // store <tr> values:
      var rowContent = []
      // loop through each <tr> and get the value of each <td> element:
      for (elt in tableRow) {
        var rowElement = tableRow[elt].asElement();
        if(rowElement && rowElement.getName()== 'td') {
          rowContent.push(rowElement.getValue())
        };
      };
      tableContent.push(rowContent);
    };
  };
  return tableContent
};

