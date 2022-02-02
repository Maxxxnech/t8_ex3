import React, {memo} from "react";

const ListElement = memo(({name, active})=>{
    return (
        <li>Имя: {name}; активен: {active.toString()}</li>
    )
})

export default ListElement;