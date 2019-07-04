import React from 'react';
import Axios from 'axios';
import './Xiangmu.css';
import { Carousel, WingBlank } from 'antd-mobile';
import { Link } from 'react-router-dom';
class Xiangmu extends React.Component{
	constructor(){
		super();
		this.state = {
			list:[],
			banner:[]
		}
	}
	componentDidMount(){
		this.getMainInfo();
	}
	getMainInfo(){
		Axios.get('http://yapi.demo.qunar.com/mock/67112/grops/gd')
		  .then((response) => {
		  	console.log(response)
		  	this.setState({
		  		list: response.data.data.list,
		  		banner:response.data.data.banner
		  	})

		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}        
	render(){                
		let list=this.state.list;
		let banner=this.state.banner;
		console.log(banner);
		return(
			<div className="main">
			<div className="head"
			style={{width:'100%',height:'',margin:'0 ',}}>
				<WingBlank>
          			<Carousel className="space-carousel"
          			style={{width:'100%',height:''}}
				       	  autoplay={false}
				          infinite
				     >
				{list.map((item,index) => {//item:总的item总的图片，index:当前的图片
					return (
						<img key={index} src={item}
						style={{width:'100%',height: '100%', verticalAlign: 'top' }}
						onLoad={() => {
		                    // fire window resize event to change height
		                    window.dispatchEvent(new Event('resize'));
		                    this.setState({ imgHeight: 'auto' });
		                  }}
                  		alt=""/>
					)
				})}
					</Carousel>
        		</WingBlank>
        		<div className="head-bottom clearfix">
			<Link to="/cart">
				<div className="cart-item">购物车</div>
				</Link>
				<i className="port"></i>
				<div className="mybean-item">我的豆品</div>
		    </div>
		   </div>
			
		    <div className="product-list">
		   		<p className="product-list-header">新品首发</p>
		   		<ul className="product-list-content clearfix">
                	{banner.map((item,index)=>{
                		return(
                			<li key={index}>
                				<Link to={`/detail/${item.id}`}>
                					<img alt="" src={item.img}/>
                		   			<p className="goods-title">{item.title}</p>
                		    		<p className="goods-desc">{item.desc}</p>
                		    		<p className="goods-price">{item.price}</p>
                		    		<p className="goods-nep">{item.nep}</p>
                		    	</Link>
                		    </li>
                		)
                	})}
		   		</ul>
		   	</div>
		</div>
		);
    }
}
export default Xiangmu;
