/*import logo from './logo.svg';*/
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="text-blue-400 text-center font-bold">
          <p>Denate To Our Project Contract To Help Poor People.</p>
        </div>

        <div className='sm:flex'>
          <h3>My Wallet Address : </h3>
          <h3> 0xf0Cce5CCc9AE5BC5a2b93375a385374c33Edd331</h3>
        </div>
        
        <div className="bg-blue-500 text-violet-700 text-base font-semibold px-6 py-4 m-2 rounded-lg">
          <h3>Contract Balance</h3>
          <h2>2.5 ETH</h2>
        </div>
        
        <div>
        <button type="button" className="bg-blue-500 text-violet-700 text-base font-semibold px-6 py-2 rounded-lg">Donte Ether</button>
        </div>
      </header>
    </div>
  );
}

export default App;
