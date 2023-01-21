import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table, { type TableProps, type TableRowsData } from './table';
import stringifyProps from '../helpers/stringify-props';
import SelectField, { type Option, type SelectFieldProps } from './select-field';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';

const brandToOption = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

const joinedCarsToTableRowData = (carJoined: CarJoined): TableRowsData => stringifyProps(carJoined);

type CarRowData = ReturnType<typeof joinedCarsToTableRowData>;

const ALL_BRANDS_ID = '-1';
const ALL_BRANDS_TITLE = 'Visi automobiliai';

class App {
  private htmlElement: HTMLElement;

  private selectedBrandId: string;

  private carsCollection: CarsCollection;
  private carsTable: Table<CarRowData>;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.htmlElement = foundElement;
    this.selectedBrandId = ALL_BRANDS_ID;
    this.carsCollection = new CarsCollection({
      cars,
      brands,
      models,
    });
    this.carsTable = new Table({
      title: 'Visi automobiliai',
      columns: {
        id: 'id',
        price: 'Kaina',
        year: 'Metai',
        model: 'Modelis',
        brand: 'Marke',

      },
      rowsData: this.carsCollection.allCars.map(joinedCarsToTableRowData),
      onDelete: this.handleCarDelete,
    });
  }

  private handleCarDelete: TableProps<CarRowData>['onDelete'] = (carId) => {
    this.carsCollection.deleteCarById(carId);
    this.update();
  };

  private handleBrandChange: SelectFieldProps['onChange'] = (_, brandId) => {
    this.selectedBrandId = brandId;
    this.update();
  };

  initialize = (): void => {
    this.htmlElement.innerHTML = '<div class="container"></div>';
    const container = document.createElement('div');
    container.className = 'container my-5 d-flex flex-column gap-1';

    const selectField = new SelectField({
      options: [...this.carsCollection.brands.map(brandToOption),
      { text: ALL_BRANDS_TITLE, value: ALL_BRANDS_ID }],
      onChange: this.handleBrandChange,
     });

    container.append(
      selectField.htmlElement,
      this.carsTable.htmlElement,
);
    this.htmlElement.append(container);
  };

  public update = () => {
    const doSelectAllCars = this.selectedBrandId === ALL_BRANDS_ID;

    const brandCars = doSelectAllCars
    ? this.carsCollection.allCars
    : this.carsCollection.getByBrandId(this.selectedBrandId);

    const brandTitle = doSelectAllCars
    ? ALL_BRANDS_TITLE
    : this.carsCollection.getBrandById(this.selectedBrandId).title;

    this.carsTable.updateProps({
      rowsData: brandCars.map(joinedCarsToTableRowData),
      title: brandTitle,
     });
  };
}

export default App;
