import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  pros=()=>{
    localStorage.setItem("token","111");
    let token=localStorage.getItem("token");
  }

  componentDidMount() {
    console.log(this.props.match.params.id);
  }

  render () {
    return (
      <div className="login-content">
        <Link to="/Xiangmu"><i className="login-cancel"></i></Link>
        <h3>登录豆瓣</h3>
        <div className="login-center">
          <input className="box-one1 border1" placeholder="手机号/邮箱" ></input>
          <input className="box-one2 brder2" placeholder="密码" ></input>
          <div className="login-button">登录</div>
        </div>
      </div>
    )
  }
}

export default  Login