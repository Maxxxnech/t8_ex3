import React from "react";
import "./css/Example.css";

function jStextDecorator(func) {
  let text = func.toString();
  text = text.replace(/this\.didStateChange\(".*", copy\);/, "")
  //text = text.replace("state", "<strong>state<strong/>")

  return text;
}

//<pre>: Предварительно отформатированный текстовый элемент
// Сохраняет форматирование и пробелы! 

export default function Example({ func = Function.prototype, disable = false }) {
  return (
    <div className="example">
      <code>
        <pre>{jStextDecorator(func)}</pre>
      </code>
      <button onClick={func} disabled={disable}>Проверить!</button>
    </div>
  );
}
