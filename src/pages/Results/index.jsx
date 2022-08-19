import { Button } from 'react-bootstrap';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BsMusicNoteBeamed } from 'react-icons/bs';
import api from '../../services/api';

import climateIcon from '../../assets/imgs/climateIcon.png';

const MySwal = withReactContent(Swal);

const Results = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [result, setResult] = useState({ temperature: "Loading", genre: "Loading", songs: [] });

  useEffect(() => {
    const getResult = () => {
      const city = searchParams.get('city');
      const lat = searchParams.get('lat');
      const lon = searchParams.get('lon');

      api.get(`/?${city ? 'city=' + city : ''}&${lat ? 'lat=' + lat : ''}&${lon ? 'lon=' + lon : ''}`).then((response) => {
        setResult(response.data);
      }).catch(err => {
        const errorMessage = err.response?.data?.error
        MySwal.fire(errorMessage ? errorMessage : 'Error').then(() => {
          navigate('/');
        });
      });
    }
    getResult();
  }, [searchParams, navigate]);

  return (
    <>
      <p className="weather-text"><img className="weather-img" src={climateIcon} alt="" />{result.temperature} °<span>C</span></p>
      <p className="genre-text">Playlist: {result.genre} <BsMusicNoteBeamed /></p>
      <div className="container-result">
        <ul className="list-result">
          {result.songs.map((song, index) => {
            return <li key={index}>{song}</li>
          })}
        </ul>
      </div>
      <Link to="/"><Button variant="primary">Home</Button></Link>
    </>
  );
}

export default Results;
