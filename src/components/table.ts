export type TableRowsData = {
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
    this.renderView();
}

private initialize = () => {
  this.htmlElement.className = 'table table-dark table-borderless';
  this.htmlElement.append(
    this.thead,
    this.tbody,
  );
};

  private renderHeadView = () => {
    const columnsNames = Object.values(this.props.columns);
    const columnsHtmlStr = `${columnsNames.map((name) => `<th>${name}</th>`)
    .join('')}<th></th>`;

    this.thead.innerHTML = `
    <tr class='text-center h3'>
      <th colspan="${columnsNames.length + 1}">${this.props.title}</th>
    </tr>
    <tr>${columnsHtmlStr}</tr>`;
  };

  private renderBodyView = () => {
    this.tbody.innerHTML = '';
      const keys = Object.keys(this.props.columns);
    this.props.rowsData.forEach((rowData) => {
      const columnsHtmlStr = `${keys.map((key) => `<td>${rowData[key]}</td>`)
      .join('')}
      <td>
        <button class="btn btn-danger btn-sm">DEL</button>
      </td>`;
        const rowHtmlStr = `<tr>${columnsHtmlStr}</tr>`;
        this.tbody.innerHTML += rowHtmlStr;
      });
  };

private renderView = () => {
  this.renderHeadView();
  this.renderBodyView();
};

updateProps = (newProps: Partial<TableProps<T>>) => {
this.props = {
  ...this.props,
  ...newProps,
};
this.renderView();
};
}

export default Table;
