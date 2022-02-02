import React, { PureComponent } from "react";
import Mapper from "./Mapper";
import Example from "./Example";

import "./css/TestComponent.css";
export default class TestComponent extends PureComponent {
  data = [
    { id: 0, name: "A", active: true },
    { id: 3, name: "B", active: true },
    { id: 1, name: "C", active: true },
    { id: 2, name: "D", active: true },
  ];
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(JSON.stringify(this.data)),
      wasChangedDirectly: null,
    };

    this.buttonRef = React.createRef();
  }
  componentDidUpdate() {
    if (this.state.wasChangedDirectly !== null && this.buttonRef.current) {
      this.buttonRef.current.focus();
    }
  }
  render() {
    return (
      <main>
        <div
          className={
            this.state.wasChangedDirectly === null
              ? "display"
              : !this.state.wasChangedDirectly
              ? "display notChanged"
              : "display changed"
          }
        >
          <h3>
            Состояние
            {this.state.wasChangedDirectly !== null &&
              " было изменено напрямую: " +
                this.state.wasChangedDirectly.toString()}
          </h3>
          <Mapper data={this.state.data} />
          {this.state.wasChangedDirectly !== null && (
            <button
              className="btn__reset"
              onClick={this.reset}
              ref={this.buttonRef}
            >
              Сброс
            </button>
          )}
        </div>
        <div className="examples">
          <h3>Изменение элемента (по индексу в массиве)</h3>
          <Example
            func={this.changeEl_1}
            disable={this.state.wasChangedDirectly !== null}
          />
          <Example
            func={this.changeEl_2}
            disable={this.state.wasChangedDirectly !== null}
          />
          <h3>Добавление элемента</h3>
          <Example
            func={this.addEl}
            disable={this.state.wasChangedDirectly !== null}
          />
          <h3>Сортировка</h3>
          <Example
            func={this.sortEl_1}
            disable={this.state.wasChangedDirectly !== null}
          />
          <Example
            func={this.sortEl_2}
            disable={this.state.wasChangedDirectly !== null}
          />
          <h3>Изменение элемента (map(), поиск по свойству элемента)</h3>
          <Example
            func={this.filterEl_1}
            disable={this.state.wasChangedDirectly !== null}
          />
          <Example
            func={this.filterEl_2}
            disable={this.state.wasChangedDirectly !== null}
          />
        </div>
      </main>
    );
  }

  /**
   * Для отображения кода функций-обработвичков на странице необходимо
   * использовать синтсксис "changeEl_1 = () => "
   * И не использовать bind в конструкторе
   * Иначе будет выводиться "function([native code])""
   */

  // ***Изменение элемента (поиск по индексу в массиве)***
  //Изменять элемент массива - неверно!
  changeEl_1 = () => {
    const copy = this.state.data.slice();
    copy[0].name = copy[0].name = "Bob";

    this.didStateChange("changeEl_1", copy);

    this.setState({ data: copy });
  };
  //Правильно - заменять элемент на новый
  //стырый объект не изменился, мы заменили ссылку в массиве на новый объект 
  changeEl_2 = () => {
    const copy = this.state.data.slice();
    copy[0] = { ...copy[0], name: "Bob" };

    this.didStateChange("changeEl_2", copy);

    this.setState({ data: copy });
  };
  // ***Добавление элемента***
  addEl = () => {
    const copy = this.state.data.slice();
    copy.push({ name: "This is new name!", active: true });

    this.didStateChange("addEl", copy);

    this.setState({ data: copy });
  };
  // ***Сортировка***
  // Сортирока на месте - неверно!
  sortEl_1 = () => {
    const copy = this.state.data.sort((a, b) => a.id - b.id);

    this.didStateChange("sortEl_1", copy);

    this.setState({ data: copy });
  };

  // Правильно: Создаем копию и только затем - сортируем
  sortEl_2 = () => {
    const copy = this.state.data.slice();
    copy.sort((a, b) => a.id - b.id);
    this.didStateChange("sortEl_2", copy);
    this.setState({ data: copy });
  };

  // ***Изменение элемента (поиск по свойству элемента)***
  // Изменять существующий элемент - неверно!
  filterEl_1 = () => {
    const result = this.state.data.map((el) => {
      if (el.name === "B") {
        el.active = false;
      }
      return el;
    });

    this.didStateChange("filterEl_1", result);

    this.setState({ data: result });
  };

  // Правильно - заменять элемент на новый 
  // Мы изменили не объект, а ссылку в массиве
  filterEl_2 = () => {
    const result = this.state.data.map((el) => {
      if (el.name === "B") {
        return { ...el, active: false };
      }
      return el;
    });

    this.didStateChange("filterEl_2", result);

    this.setState({ data: result });
  };

  //*************************************** */
  arrMapper = (copy) => copy.map((el) => el.id).join(", ");

  didStateChange = (func, copy) => {
    const copyText = JSON.stringify(copy);
    const dataText = JSON.stringify(this.state.data);
    const didChangeState = copyText === dataText;

    console.log(/*copyText + "\n", dataText + "\n",*/ didChangeState);

    this.setState({ wasChangedDirectly: didChangeState });

    return { funcName: func.name, copyText, dataText, didChangeState };
  };
  reset = () => {
    this.setState({
      data: JSON.parse(JSON.stringify(this.data)),
      wasChangedDirectly: null,
    });
  };
}
