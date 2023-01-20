import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps from '../helpers/stringify-props';
import SelectField, { type Option } from './select-field';
import type Brand from '../types/brand';

const brandToOption = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

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

    const selectField = new SelectField({
      options: this.carsCollection.brands.map(brandToOption),
      onChange: (_, brandId) => {
       const newCars = this.carsCollection.getByBrandId(brandId);
       console.log(newCars);
      },
     });

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
      .map(({ modelId, ...rest }) => ({ ...rest }))
      .map(stringifyProps),
    });

    container.append(
      selectField.htmlElement,
      table.htmlElement,
);
    this.htmlElement.append(container);
  };
}

export default App;
