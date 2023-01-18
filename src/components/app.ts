import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps from '../helpers/stringify-props';

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
    container.className = 'container my-5';
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

    container.append(table.htmlElement);
    this.htmlElement.append(container);
  };
}

export default App;
