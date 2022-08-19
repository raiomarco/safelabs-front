import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

function Home() {
  const navigate = useNavigate();

  const [option, setOption] = useState("city");
  const [data, setData] = useState({ city: "", lat: "", lon: "" });
  const [validation, setValidation] = useState({ city: false, lat: false, lon: false });
  const [submit, setSubmit] = useState(false);

  const validator = useCallback(() => {
    const { city, lat, lon } = data;

    let validatorTemp = { city: true, lat: true, lon: true };

    if (!city && option === "city") {
      validatorTemp = { ...validatorTemp, city: false };
    }
    if (option === "coordinates") {
      if (!lat || isNaN(lat) || (lat < -90 || lat > 90)) validatorTemp = { ...validatorTemp, lat: false };
      if (!lon || isNaN(lon) || (lon < -180 || lon > 180)) validatorTemp = { ...validatorTemp, lon: false };
    }

    if (validatorTemp.city !== validation.city || validatorTemp.lat !== validation.lat || validatorTemp.lon !== validation.lon) {
      setValidation(validatorTemp);
    }

    return validatorTemp;
  }, [data, option, validation]);

  useEffect(() => {
    validator();
  }, [data, validator]);

  const changeOptionHandler = (e) => {
    setSubmit(false);
    setOption(e.target.value);
  }

  const changeCityHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const changeCoordinatesHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value.replace(/\D+/g, "") });
  }

  const submitHandler = (e) => {
    e.preventDefault();

    setSubmit(true);

    const validatorNew = validator();

    console.log(validatorNew);

    if (option === "city" && validatorNew.city) {
      return navigate(`/results?city=${data.city}`);
    } else if (option === "coordinates" && validatorNew.lat && validatorNew.lon) {
      navigate(`/results?lat=${data.lat}&lon=${data.lon}`);
    }
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-1" controlId="formSelectOption">
        <Form.Label>Select an option</Form.Label>
        <Form.Select aria-label="Change option" value={option} onChange={changeOptionHandler}>
          <option value="city">City</option>
          <option value="coordinates">Coordinates</option>
        </Form.Select>
      </Form.Group>

      {option === "city" ?
        <>
          <Form.Group className="mb-1" controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control value={data.city} onChange={changeCityHandler} name="city" type="text" placeholder="Enter city" isValid={submit && validation.city} isInvalid={submit && !validation.city} />
            <Form.Control.Feedback type="invalid">
              City is required.
            </Form.Control.Feedback>
          </Form.Group>
        </> :
        <>
          <Form.Group className="mb-1" controlId="formLat">
            <Form.Label>Latitude</Form.Label>
            <Form.Control value={data.lat} onChange={changeCoordinatesHandler} name="lat" type="text" placeholder="Enter latitude" isValid={submit && validation.lat} isInvalid={submit && !validation.lat} />
            <Form.Control.Feedback type="invalid">
              Latitude must be a number between -90 and 90.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-1" controlId="formLon">
            <Form.Label>Longitude</Form.Label>
            <Form.Control value={data.lon} onChange={changeCoordinatesHandler} name="lon" type="text" placeholder="Enter longitude" isValid={submit && validation.lon} isInvalid={submit && !validation.lon} />
            <Form.Control.Feedback type="invalid">
              Longitude must be a number between -180 and 180.
            </Form.Control.Feedback>
          </Form.Group>
        </>
      }
      <Button className="submit-button" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Home;
