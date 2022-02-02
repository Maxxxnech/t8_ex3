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
      <div>
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
               " было изменено напрямую: " + this.state.wasChangedDirectly.toString()}
          </h3>
          <Mapper data={this.state.data} />
          {this.state.wasChangedDirectly !== null && (
            <button className="btn__reset"onClick={this.reset} ref={this.buttonRef}>
              Сброс
            </button>
          )}
        </div>
        <div>
          <h3>Изменение элемента (поиск по индексу в массиве)</h3>
          <Example
            func={this.testFunc_1_1}
            disable={this.state.wasChangedDirectly !== null}
          />
          <Example
            func={this.testFunc_1_2}
            disable={this.state.wasChangedDirectly !== null}
          />
          <h3>Добавление элемента</h3>
          <Example
            func={this.testFunc_2}
            disable={this.state.wasChangedDirectly !== null}
          />
          <h3>Сортировка</h3>
          <Example
            func={this.testFunc_3_1}
            disable={this.state.wasChangedDirectly !== null}
          />
          <Example
            func={this.testFunc_3_2}
            disable={this.state.wasChangedDirectly !== null}
          />
          <h3>Изменение элемента (поиск по свойству элемента)</h3>
          <Example
            func={this.testFunc_4_1}
            disable={this.state.wasChangedDirectly !== null}
          />
          <Example
            func={this.testFunc_4_2}
            disable={this.state.wasChangedDirectly !== null}
          />
        </div>
      </div>
    );
  }

  /**
   * Для отображения кода функций-обработвичков на странице необходимо
   * использовать синтсксис "testFunc_1_1 = () => "
   * И не использовать bind в конструкторе
   * Иначе будет выводиться "function([native code])""
   */

  // ***Изменение элемента (поиск по индексу в массиве)***
  //Изменять элемент - неверно!
  testFunc_1_1 = () => {
    const copy = this.state.data.slice();
    copy[0].name = copy[0].name === "Bob" ? "Alice" : "Bob";

    this.didStateChange("testFunc_1", copy);

    this.setState({ data: copy });
  };
  //Правильно - заменять элемент на новый
  testFunc_1_2 = () => {
    const copy = this.state.data.slice();
    copy[0] = { ...copy[0], name: copy[0].name === "Bob" ? "Alice" : "Bob" };

    this.didStateChange("testFunc_1_a", copy);

    this.setState({ data: copy });
  };
  // ***Добавление элемента***
  testFunc_2 = () => {
    const copy = this.state.data.slice();
    copy.push({ name: "This is new name!", active: true });

    this.didStateChange("testFunc_2", copy);

    this.setState({ data: copy });
  };
  // ***Сортировка***
  // Сортирока на месте - неверно!
  testFunc_3_1 = () => {
    const copy = this.state.data.sort((a, b) => a.id - b.id);

    this.didStateChange("testFunc_3", copy);

    this.setState({ data: copy });
  };

  // Правильно: Создаем копию и только затем - сортируем
  testFunc_3_2 = () => {
    const copy = this.state.data.slice();
    copy.sort((a, b) => a.id - b.id);
    this.didStateChange("testFunc_3_1", copy);
    this.setState({ data: copy });
  };

  // ***Изменение элемента (поиск по свойству элемента)***
  // Изменять существующий элемент - неверно!
  testFunc_4_1 = () => {
    const result = this.state.data.map((el) => {
      if (el.name === "B") {
        el.active = false;
      }
      return el;
    });

    this.didStateChange("testFunc_4_1", result);

    this.setState({ data: result });
  };

  // Правильно - заменять элемент на новый
  testFunc_4_2 = () => {
    const prevData = JSON.stringify(this.state.data);
    const result = this.state.data.map((el) => {
      if (el.name === "B") {
        return { ...el, active: false };
      }
      return el;
    });

    this.didStateChange("testFunc_4_1", result, prevData);

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
