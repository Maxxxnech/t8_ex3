import React, {memo} from "react";
import ListElement from "./ListElement";
import "./css/Mapper.css";

const Mapper = memo(({data = []}) => {
    return (
        <ul>
            {data.map((el, i)=> <ListElement key={el.id? el.id: i} {...el}/>)}
        </ul>
    )
})

export default Mapper;