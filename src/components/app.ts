import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table, { type TableRowsData } from './table';
import stringifyProps from '../helpers/stringify-props';
import SelectField, { type Option } from './select-field';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';

const brandToOption = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

const joinedCarsToTableRowData = (carJoined: CarJoined): TableRowsData => stringifyProps(carJoined);

const ALL_BRANDS_ID = '-1';
const ALL_BRANDS_TITLE = 'Visi automobiliai';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({
      cars,
      brands,
      models,
    });
  }

  initialize = (): void => {
    this.htmlElement.innerHTML = '<div class="container"></div>';
    const container = document.createElement('div');
    container.className = 'container my-5 d-flex flex-column gap-1';

    const table = new Table({
      title: 'Visi automobiliai',
      columns: {
        id: 'id',
        price: 'Kaina',
        year: 'Metai',
        model: 'Modelis',
        brand: 'Marke',

      },
      rowsData: this.carsCollection.allCars
      .map(joinedCarsToTableRowData),
    });

    const selectField = new SelectField({
      options: [...this.carsCollection.brands.map(brandToOption),
      { text: ALL_BRANDS_TITLE, value: ALL_BRANDS_ID }],
      onChange: (_, brandId, { text: brandTitle }) => {
        const brandCars = brandId === ALL_BRANDS_ID
         ? this.carsCollection.allCars
         : this.carsCollection.getByBrandId(brandId);
       table.updateProps({
        rowsData: brandCars.map(joinedCarsToTableRowData),
        title: brandTitle,
       });
      },
     });

    container.append(
      selectField.htmlElement,
      table.htmlElement,
);
    this.htmlElement.append(container);
  };
}

export default App;
