import { useState, useEffect } from 'react';
import { numbers } from './assets/numbers';

const SortNumbers = numbers.sort(() => Math.random() - 0.5);

function App() {
  const [numData, setNumData] = useState(SortNumbers);
  const [choosenNumbers, setChoosenNumbers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0); // Zamanı saniye cinsinden saklar
  const [timerId, setTimerId] = useState(null); // Timer ID'sini saklar

  // Zamanlayıcıyı başlatan fonksiyon
  function startTimer() {
    if (timerId) return; // Eğer zaten bir timer çalışıyorsa yeniden başlatma
    const id = setInterval(() => {
      setTime((prevTime) => prevTime + 1); // Zamanı 1 saniye artır
    }, 1000);
    setTimerId(id);
  }

  // Zamanlayıcıyı sıfırlayan ve durduran fonksiyon
  function resetTimer() {
    clearInterval(timerId); // Çalışan zamanlayıcıyı durdur
    setTimerId(null);
    setTime(0); // Zamanı sıfırla
  }

  if (choosenNumbers.length === 2) {
    setIsDisabled(true);
    setTimeout(() => {
      if (choosenNumbers[0].num === choosenNumbers[1].num) {
        numData.find((x) => x.id === choosenNumbers[0].id).isFound = true;
        numData.find((x) => x.id === choosenNumbers[1].id).isFound = true;
      } else {
        numData.find((x) => x.id === choosenNumbers[0].id).isShow = false;
        numData.find((x) => x.id === choosenNumbers[1].id).isShow = false;
      }
      setNumData([...numData]);
      setIsDisabled(false);
    }, 1500);
    setChoosenNumbers([]);
  }

  function handleCompare(id, num) {
    startTimer(); // İlk tıklamada zamanlayıcı başlar
    const selectedCard = numData.find((y) => y.id === id);
    if (selectedCard.isShow || selectedCard.isFound) {
      return;
    }
    setMoves(moves + 1);
    selectedCard.isShow = true;
    setChoosenNumbers([...choosenNumbers, { id: id, num: num }]);
    setNumData([...numData]);
  }

  function handleRestartGame() {
    const resetNumData = numbers
      .sort(() => Math.random() - 0.5)
      .map((item) => ({
        ...item,
        isShow: false,
        isFound: false,
      }));
    setNumData(resetNumData);
    setChoosenNumbers([]);
    setIsDisabled(false);
    setMoves(0);
    resetTimer(); // Zamanlayıcıyı sıfırla
  }

  // Zamanı dakika:saniye formatına dönüştür
  const formattedTime = `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;

  return (
    <div className="container">
      <div className="header-container">
        <h1>memory</h1>
        <div className="btn-area">
          <button className='newgame' onClick={handleRestartGame}>New Game</button>
        </div>
      </div>
      <div className="buttonArea">
        {numData.map((x) => (
          <button className={ x.isShow === true &&  x.isFound === true  ? "grey-btn" : x.isShow ===true ? "orange-btn" : " default-btn"}

            disabled={isDisabled}
            onClick={() => handleCompare(x.id, x.num)}
            key={x.id}
          >
            {x.isShow || x.isFound ? x.num : null}
          </button>
        ))}
      </div>
      <div className="result-container">
        <div className="time-area">
          <p>Time:  <span>{formattedTime}</span></p>
        </div>
        <div className="moves-area">
          <p>Moves: {moves}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
