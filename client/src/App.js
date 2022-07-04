import './css/index.css';
import axios from 'axios';

function App() {
  const uid = 1;

  const onClick = (e) => {
    e.preventDefault();
    const name = e.target.name;

    switch (name) {
      case 'GET':
        axios.get(`api/${uid}`)
          .then(res => console.log('response: ', res))
          .catch(err => console.log(err));
        break;
      case 'POST':
        axios.post(`api/${uid}`, { document: 'hello database' })
          .then(res => console.log('response: ', res))
          .catch(err => console.log(err));
        break;  
      default:
        console.log('Nothing happened');
        break;
    }


  }

  return (
    <div className="App">
      <button onClick={ onClick } name='GET'>GET</button>
      <button onClick={ onClick } name='POST'>POST</button>
    </div>
  );
}

export default App;
