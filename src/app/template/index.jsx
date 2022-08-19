import { Outlet } from 'react-router-dom';
import logo from '../../assets/imgs/safelabsLogo.png';

function Template() {
  return (
    <div className="container-main">
      <div className="container-base">
        <img src={logo} className="Logo" alt="logo" />
        <div className="container-center">
          <Outlet />
        </div>
      </div>
    </div >
  )
}

export default Template;
