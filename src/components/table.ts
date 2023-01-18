type TableRowsData = {
  id: string,
  [key: string]: string,
};

type TableProps<Type extends TableRowsData> = {
  title: string,
columns: Type,
rowsData: Type[],
};

class Table<T extends TableRowsData> {
  public htmlElement: HTMLTableElement;

  private props: TableProps<T>;

  private tbody: HTMLTableSectionElement;

  private thead: HTMLTableSectionElement;

  constructor(props: TableProps<T>) {
    this.props = props;
    this.htmlElement = document.createElement('table');
    this.tbody = document.createElement('tbody');
    this.thead = document.createElement('thead');

    this.initialize();
}

initializeHead = () => {
  const columnsNames = Object.values(this.props.columns);
  const columnsHtmlStr = columnsNames.map((name) => `<th>${name}</th>`)
  .join('');
  this.thead.innerHTML = `
  <tr class='text-center h3'>
    <th colspan="${columnsNames.length}">${this.props.title}</th>
  </tr>
  <tr>${columnsHtmlStr}</tr>`;
};

initializeBody = () => {
  const keys = Object.keys(this.props.columns);

  this.props.rowsData.forEach((rowData) => {
  const columnsHtmlStr = keys.map((key) => `<td>${rowData[key]}</td>`)
  .join('');
    const rowHtmlStr = `<tr>${columnsHtmlStr}</tr>`;
    this.tbody.innerHTML += rowHtmlStr;
  });
};

initialize = () => {
  this.initializeHead();
  this.initializeBody();
  this.htmlElement.className = 'table table-dark table-borderless';
  this.htmlElement.append(
    this.thead,
    this.tbody,
  );
};
}

export default Table;
