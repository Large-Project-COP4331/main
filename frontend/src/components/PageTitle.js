import React from 'react';

function PageTitle()
{
    return(
        <div className="Subbalogger" style={{width: 225, height: 49}}>
            <span style={{color: 'black', 
                         fontSize: 32, 
                         fontFamily: 'Inter', 
                         fontWeight: '700', 
                         wordWrap: 'break-word'}}
            >
                Scubba
            </span>
            <span style={{color: '#4589DF', 
                         fontSize: 32, 
                         fontFamily: 'Inter', 
                         fontWeight: '700', 
                         wordWrap: 'break-word'}}
            >
                Logger 
            </span>
        </div>
    );
};

export default PageTitle;
