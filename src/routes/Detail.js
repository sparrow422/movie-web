import React from "react";
import axios from "axios";

class Detail extends React.Component{
    state = {
        // movieList:[]
    };
   
    getBody = async (url) => {
        const {data: {movieListResult:{movieList}}} = await axios.get(url)
        this.setState({movieList:movieList})
    }
    
    componentWillMount(){
        console.log("willmount");
        const { location } = this.props;
        var title = location.state.title;    
        console.log(title);

        var url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=e02fbe8e0ffcacc0e8e6424f4455ab10&movieNm="+encodeURIComponent(location.state.title);
        // var url = "https://f6maindvpk.execute-api.us-east-1.amazonaws.com/v1/svc?movieNm="+encodeURIComponent(location.state.title);
        console.log(url);
        this.getBody(url);
    }
    
    componentDidMount(){
        
    }

    render(){
        console.log("render");
        const {location} = this.props;
        const{movieList} = this.state;
        console.log(movieList);
        console.log("state");
        console.log(this.state);
        if(movieList===undefined){
            
        }else{
            console.log("디파인드");
            return (<span><h1>{location.state.title}</h1>
            <h3>영화이름 {movieList[0].movieNm}</h3>
            <h3>장르 {movieList[0].genreAlt}</h3>
            <h3>개봉일 {movieList[0].openDt}</h3>
            <h3>국가 {movieList[0].repNationNm}</h3>
            <h3>감독 {movieList[0].directors[0].peopleNm}</h3>
            
            </span>)
            ;
            
        }

        return <span>{location.state.title}</span>;
    }
}

// function Detail (props){
//     const { location } = props
//     // console.log(props);
//     var title = location.state.title;
//     console.log(title);
//     var url = "https://f6maindvpk.execute-api.us-east-1.amazonaws.com/v1/svc?movieNm="+encodeURIComponent(location.state.title);
//     // var url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=e02fbe8e0ffcacc0e8e6424f4455ab10&movieNm="+encodeURIComponent(location.state.title);
//     console.log(url);

//     var text = axios.get(url);
//     console.log(text);
    
//     return <span>{location.state.title}</span>;
// }

export default Detail;