import React from 'react';
import {ChangeWeb} from "../Components/ChangeWeb";

function Home() {
    const redirect = ChangeWeb();

    return (
        <div>
            <button onClick={()=>redirect('/loginpage')}> HOME </button>
        </div>
    );
}

export default Home;