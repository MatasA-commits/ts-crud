export type Option = {
  text: string,
  value: string,
};

type SelectFieldProps = {
  options: Option[],
};

class SelectField {
  htmlElement: HTMLElement;

  private options: SelectFieldProps['options'];

  constructor({ options }: SelectFieldProps) {
    this.htmlElement = document.createElement('select');
    this.options = options;
    this.initialize();
  }

  private initialize() {
    const optionsStr = this.options.map(({
      text,
      value,
}) => `<option value="${value}">${text}</option>`)
.join('');

    this.htmlElement.className = 'form-select';
    this.htmlElement.innerHTML = optionsStr;
  }
}

export default SelectField;