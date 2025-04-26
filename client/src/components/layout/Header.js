import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd';

const Header = () => {

  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
    }
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    messageApi.success('Login Successfull');
    navigate('/login');
  }

  return (
    <>
      {contextHolder}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">Expense Management { loginUser && ` - ${loginUser.name}` }</Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/user">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/register">Register</Link>
              </li>
              
              {loginUser && (
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
            </div>
        </div>
        </nav>

    </>
  )
}

export default Header
