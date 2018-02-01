import React from 'react';

export default props => {
    console.log('History Data', props.data);

    const historyList = props.data.map((item, index) => {

        const color = item.indexOf('high') > -1 ? 'pink accent-2' : item.indexOf('low') > -1 ? 'blue lighten-1' : 'teal accent-2';

        return <li key={index} className={`center-align collection-item ${color}`}>{item}</li>
    });
    return (
        <ul className="collection">
            {historyList}
        </ul>
    )
}