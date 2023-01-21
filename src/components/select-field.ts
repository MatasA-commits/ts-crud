export type Option = {
  text: string,
  value: string,
};

export type SelectFieldProps = {
  options: Option[],
  onChange?: ((event: Event, value: string, option: Option) => void) | undefined,
};

class SelectField {
  htmlElement: HTMLSelectElement;

  private props: SelectFieldProps;

  constructor(props: SelectFieldProps) {
    this.htmlElement = document.createElement('select');
    this.props = props;
    this.initialize();
  }

  handleOptionChange = (event: Event) => {
    if (this.props.onChange !== undefined) {
    const { value } = this.htmlElement;
    const [option] = this.props.options.filter((opt) => opt.value === value);
    this.props.onChange(event, value, option);
    }
  };

  private initialize() {
    const optionsStr = this.props.options.map(({
      text,
      value,
}) => `<option value="${value}">${text}</option>`)
.join('');

  this.htmlElement.addEventListener('change', this.handleOptionChange);

    this.htmlElement.className = 'form-select';
    this.htmlElement.innerHTML = optionsStr;
  }
}

export default SelectField;
