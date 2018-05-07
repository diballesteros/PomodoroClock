import React from 'react'
import classes from'./Display.css';


const Display = ({time}) => {
    return(
        <div className={classes.display} >
            {time}
        </div>
    );
}

export default Display;