import { useState } from "react";
import { numbers } from "./numbers";
import { use } from "react";

const sortNumbers = numbers.sort(() => Math.random() - 0.5);

function DenemeApp() {
    const [numData, setNumData] = useState(sortNumbers);
    const [chosenNumbers, setChosenNumbers] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0)


    function handleCompare(id, num) {
        const selectedCard = namData.find(y => y.id === id)
        if (selectedCard.isShow || selectedCard.isFound) {
        }
        setMoves(moves + 1);
        selectedCard.isShow = true;
        setChosenNumbers([...chosenNumbers, { id: id, num: num }]);
        setNumData([...numData]);
    }

    return (
        <div className="container">
            <div className="header-container">
                <h1>memory</h1>
                <div className="btn-area">
                    <button>restart game</button>
                </div>
            </div>
            <div className="buttonArea">
                {
                    numData.map(x => (
                        <button
                        key={x.id}
                            disabled={isDisabled}
                            onClick={() => handleCompare}
                        >{x.isFound || x.isShow ? x.num : null} </button>
                    )

                    )
                }
            </div>
            <div className="result-container">
                <div className="time-area">
                </div>

                <div className="moves-area">
                </div>
            </div>
        </div>
    )
}

export default DenemeApp