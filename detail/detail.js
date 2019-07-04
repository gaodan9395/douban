import React from 'react';
import Axios from 'axios';
import './detail.css';
import { Link } from 'react-router-dom';
class Detail extends React.Component{
  constructor(props){
    super(props)
    this.state={
      count:{},
      list:[],
      tipVisible: false,
      num: 1,
      selected_id: '',
      active:false,
      token:'',
      Img:'',
      signArr: []
    }
  }
  componentDidMount() {
    this.getMainInfo();
  }
  a=(e)=>{
    e.stopPropagation();
  }
  master=()=>{
    localStorage.setItem("token","111");
    let token=localStorage.getItem("token");
    this.setState({
      token:token
    },()=>{
      console.log(this.state.token);
    })

  }
  selected = (a) => {
    let list = this.state.list;
    list.forEach((item) => {
      if (item.is_selected) {
       item.is_selected = false;
      }
      else{
        if(item.id === a.id) {
          item.is_selected = true
        }
      }
    })
    this.setState({
      list: list,
      Img:a.img
      }, ()=>{
        let list = this.state.list;
        let signArr = this.state.signArr;
        let new_list = list.filter((item) => item.is_selected);
        if (new_list.length > 0) {
          if (signArr.indexOf(2) === -1) {
            signArr.push(2);
          }
        }else {
            signArr = signArr.filter((item) => item !== 2)
         }
        this.setState({                               
          signArr: signArr
        })
      })
  }
  active = (a) => {
    let list = this.state.list;
      list.forEach((item) => {
        if (item.is_active) {
         item.is_active = false;
        } 
        else{
          if (item.id === a.id) {
            item.is_active = true;
          }
        }
          console.log(item);
        })
        this.setState({
          list:list,
          active: !this.state.active
        },() => {
          let arr = this.state.signArr;
          if (this.state.active) {
            arr.push(1)
          } else {
              arr = arr.filter((item) => item !== 1);
            }
          this.setState({
            signArr: arr
          }, () => {console.log(this.state.signArr)})
      })
    }
  buy = (e) => {
    this.setState({
      tipVisible: true
    });
  }
  close = (e) => {
    this.setState({
      tipVisible: false
    });
  }
  add = (e) => {
    e.stopPropagation();
    let a = this.state.num;
    this.setState({
      num: ++a
    })
  }
  cut = (e) => {
    e.stopPropagation();
    let a = this.state.num;
    if(a>1){
      this.setState({
       num: --a
      })
    }
  }
  getMainInfo(){
    Axios.get('http://yapi.demo.qunar.com/mock/67112/grops/list-detail').then((response) => {
      response.data.data.list.forEach((item) => {
        item.is_selected = false;
        item.is_active=false;
        console.log(response);
      })
      this.setState({
        count:response.data.data.count,
        list:response.data.data.list,
        Img:response.data.data.list[0].img,
      })
    })
  }
  render(){
    let count=this.state.count;
    let list=this.state.list;
    return(
        <div className="content">
            <div className="header">
              <img  alt="" src={count.img} />
            </div>
            <div className="all-stat">
            <div className="detail-title">{count.title}</div>
            <div className="detail-price">{count.price}</div>
            <div className="detail-bargin">{count.bargin}</div>
          </div>
          <div className="buy">
            <div className="buy-btn" onClick={this.buy}>立即购买</div>
          </div>
          <div className="bottom-slide">
            <div className="button-slide" onClick={this.buy}>立即购买</div>
          </div>
          {this.state.tipVisible
          && <div className="tip" onClick={this.close}>
            <div className="tanpage" onClick={this.a} >
              <i className="cancel clearfix " onClick={this.close}></i>
              <div className="model1 clearfix">
                <div className="tip-backing">
                  <img src={this.state.Img} alt=""/>
                </div>
                <div className="tip-stat">
                  <div className="tip-title">{count.title}</div>
                  <div className="tip-price">{count.price}</div>
                </div>
            </div>
            <div className="tip-option clearfix">
              <div className="outline-stat">颜色：</div>
              <ul className="color1">
                {list.map((item,index)=>{
                  return(
                    <span className={`color-all ${ item.is_selected ? 'selected' : '' }`}
                      key={index} 
                      onClick={() => { this.selected(item) }}  >
                      {item.color}
                    </span>
                  )
                })}
              </ul>
            </div>
            <div className="tip-option clearfix">
              <span className="outline-stat">尺寸：</span>
              <ul className="pro-size">
                {list.map((item,index)=>{
                  return(
                    <span className={`size ${item.is_active ? 'selected' : ''}`}
                    key={index}
                  onClick={() => { this.active(item) }}  >
                  {item.size}
                  </span>
                  )
                })}
              </ul>	
            </div>
            <div className="tip-option clearfix">
              <span className="outline-stat">数量：</span>
              <div className="times">
                <div className="cut" onClick={this.cut}>-</div>
                <div className="num">{this.state.num}</div>
                <div className="add" onClick={this.add}>+</div>
              </div>
            </div>
        </div>
        <div className="tip-buy " onClick={this.a}>
          <div className={`tip-button ${this.state.signArr.length === 2 ? 'btn-style' : ''}`}onClick={this.master}>立即购买</div>
            <Link to="/Login">
              <div className="addtion-cart">加入购物车</div>
            </Link>
          </div>
        </div>
      }
    </div>
  )}
}
export default Detail