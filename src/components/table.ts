export type TableRowsData = {
  id: string,
  [key: string]: string,
};

export type TableProps<Type extends TableRowsData> = {
  title: string,
columns: Type,
rowsData: Type[],
onDelete: (id: string) => void
};

class Table<T extends TableRowsData> {
  private tbody: HTMLTableSectionElement;
  private thead: HTMLTableSectionElement;

  private props: TableProps<T>;

  public htmlElement: HTMLTableElement;

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
      const tr = document.createElement('tr');
      tr.innerHTML = keys.map((key) => `<td>${rowData[key]}</td>`)
      .join('');

      const lastTd = document.createElement('td');
      const delBtn = document.createElement('button');
      delBtn.innerHTML = 'DEL';
      delBtn.className = 'btn btn-danger btn-sm';

      delBtn.addEventListener('click', () => {
        this.props.onDelete(rowData.id);
      });

      lastTd.append(delBtn);
      tr.append(lastTd);
      this.tbody.append(tr);
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
