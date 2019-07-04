import React from 'react';
import  './Cart.css';
import Axios from 'axios';
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart:[],
      active:false,
      tip:false,
      choose:false,
      price:0
    }
  }
  //点击删除弹框
  delete=(item)=>{
    let d =this.state.cart.map((va,index)=>{
      if(item.is_id===va.is_id){
        item.is_list=true
    }
      return(va);
    })
    this.setState({
      cart:d
    })
  }
  //取消
  cancel=(item)=>{
      let d =this.state.cart.map((va,index)=>{
        if(item.is_id===va.is_id){
          item.is_list=false
        }
        return(va);
        })
        this.setState({
          cart:d
      })
    }
  //确认删除
  sure=(item)=>{
    this.setState({
      cart:this.state.cart.filter((va)=>va.is_id!==item.is_id)
    })
  }
  //全选框
  choose=(e)=>{
    let priceArr=this.state.price;
    let choose=this.state.choose;
    let d=this.state.cart;
    if(this.state.active){
      d.forEach((item,index)=>{
        priceArr=item.price*0;
        item.is_lg=false
      })
      choose=false;
    }
    else{
      d.forEach((item,index)=>{
        item.is_lg=true;
        priceArr+=item.price*item.num;
      })
      choose=true;
    }
    this.setState({
      active:!this.state.active,
      cart:d,
      choose:choose,
      price:priceArr
    })
  }
  //单选框
  chooseIcon=(item)=>{
    let active=this.state.active;
    let choose=this.state.choose;
    var sing=[];
    var priceArr=this.state.price;
    let d =this.state.cart;
    d.forEach((va,index)=>{
      if(item.is_lg){
        item.is_lg=false;
      }
      else{
        item.is_lg=true;
      }
    })
    this.setState({
      cart:d,
    },()=>{
      d.forEach((va,index)=>{
        if(va.is_lg){
          sing.push(va)
      }
    })
    if(sing.length===0){
      choose=false;
      active=false;
      priceArr=item.price*0;

    }
    else if(sing.length===d.length){
      choose=true;
      active=true;
      priceArr+=item.price*item.num

    }else{
      choose=true;
      priceArr+=item.price*item.num
    }
    if(item.is_lg){
      console.log(priceArr);
      priceArr+=item.price*item.num
    }else{
      //需要判断价格是否大于总的价格
      priceArr-=item.price*item.num;
      console.log(priceArr)
    }
      this.setState({
        choose:choose,
        active:active,
        price:priceArr
      })
    })
  }
  //加号事件
  jia = (item) => {
    let d=this.state.cart;
    d.forEach((va,index)=>{
      if(item.is_id===va.is_id){
      va.num++
      }
    })
    this.setState({
      cart:d
    })
  }
  //减号事件
  jian = (item) => {
  let d=this.state.cart;
  d.forEach((va,index)=>{
    if(item.is_id===va.is_id){
      if(item.num>1){
        va.num--
      }
    }
  })
    this.setState({
      cart:d
    })
  }
  //请求数据
  getmaininfo(){
  Axios.get('http://yapi.demo.qunar.com/mock/63665/api/cart')
  .then((res)=>{
    res.data.data.cart.forEach((item,index)=>{
      item.is_list=false;
      item.is_id=index;
      item.is_lg=false;
    })
      console.log(res);
      this.setState({
        cart:res.data.data.cart
      })
    })
  }
  //生命周期函数
  componentDidMount() {
    this.getmaininfo();
  }
  render () {
    return (
      <div className="container">
        <div className="count">
          <div className="count-box">
            <div className={`count-left-icon ${this.state.active? 'choose' : '' }`}
              onClick={this.choose}></div>
              <span className="allchoose">全选</span>
              <div className="money">￥{this.state.price}</div>
            </div>
            {this.state.choose?<div className="jiesuan">结算</div>:
            <div className="please-choose">请选择</div> }
          </div>
          <div className="head-container">
            <div className="head-left">
              <div className="option">豆瓣</div>
              <i className="separation-line"></i>
              <div className="option">豆品</div>
            </div>
          </div>
          <div className="center-head">
            <div className={`center-left ${this.state.active? 'choose' : '' }`} 
              onClick={() => { this.choose() }}>
            </div>
            <span className="head-stat">豆瓣豆品</span>
          </div>
          {this.state.cart.map((item,index)=>{
            return(
              <div className="center"key={index}>
                {item.is_list && 
                <ul className="cover-page">
                  <li className="sure1" onClick={() => { this.cancel(item)}}>取消</li>
                  <li className="sure2" onClick={() => { this.sure(item)}}>确定删除</li>
                </ul>
                }
              <div className="check">
                <div className={`center-left ${item.is_lg ? 'choose' : '' }`} onClick={() => { this.chooseIcon(item) }}></div>
              </div>
              <div className="center-right">
                <div className="backingimg">
                  <img className="gre"src={item.backimg} alt=""/>
                  <div className="description">
                    <span className="title">{item.name}</span>
                    <span className="des">{item.color}</span>
                    <div className="empty">
                      <div className="jian"  onClick={() => { this.jian(item) }}>-</div>
                      <div className="num">{item.num}</div>
                      <div className="jia" onClick={() => { this.jia(item) }}>+</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="delete-box">
                <div className="delete" onClick={() => { this.delete(item) }}>删除</div>
                <div className="delete-price">￥{item.price}</div>
              </div>
            </div>
      )
    })}
  </div>
)}}      
export default Cart