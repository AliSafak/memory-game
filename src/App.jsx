import { useState } from 'react'
import { numbers } from './assets/numbers'
function App() {

  return (
    <>
      <Header />
      <ButtonArea />
    </>
  )
}

export default App


function Header() {
  return(
    <div className="header">
      <div><h1>Memory</h1></div>
      <div>
        <button>Restart</button>
        <button>New Game</button>
      </div>
    </div>
  )
}


const randomNumbers = numbers.sort(() => Math.random() - 0.5);

function ButtonArea() {
  const [numData, setNumData] = useState(randomNumbers);
  const [selectedNums, setSelectedNums] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  if (selectedNums.length === 2) {
    setIsDisabled(true)
    setTimeout(() => {
      if (selectedNums[0].num === selectedNums[1].num) {
        numData.find(x => x.id === selectedNums[0].id).isFound = true;
        numData.find(x => x.id === selectedNums[1].id).isFound = true;
      }else {
        numData.find(x => x.id === selectedNums[0].id).isShow = false;
        numData.find(x => x.id === selectedNums[1].id).isShow = false;
      }
      setNumData([...numData]);
      setIsDisabled(false);
    }, 1500);
    setSelectedNums([]);
  }
  
  function compareNumbers(id, num) {
    numData.find(x => x.id === id).isShow = true;
    setSelectedNums([...selectedNums, {id: id, num: num}])
    setNumData([...numData]);
  }

  return (
    <div className='buttonArea'>
      {numData.map((x) => (  
        <button
          disabled={isDisabled}
          onClick={() => compareNumbers(x.id , x.num)}
          className={"numberButton" + (x.isFound ? " passive" : x.isShow ? " active" : "")}
          key={x.id}>
            {x.isShow || x.isFound ? x.num : ""}
        </button>
      ))}
    </div>
  )
}