import React from "react";
import axios from "axios";

class Detail extends React.Component{
    state = {
        reviews : []
    };
   
    getBody = async (url) => {
        const {data: {movieListResult:{movieList}}} = await axios.get(url)
        this.setState({movieList:movieList})
        axios.get("https://wdthr5fvke.execute-api.us-east-1.amazonaws.com/2020-12-13/board/"+encodeURIComponent(movieList[0].movieCd))
        .then(res => {
            console.log(res.data)
            this.setState({reviews: res.data})
        })
    }
    
    
    componentWillMount(){
        console.log("willmount");
        const { location } = this.props;
        var title = location.state.title;
        console.log("location");
        console.log(location);
        console.log(title);

        var url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=e02fbe8e0ffcacc0e8e6424f4455ab10&movieNm="+encodeURIComponent(location.state.title);
        this.getBody(url);
        console.log("몽고");
        

    }
    
    componentDidMount(){
        
    }

    render(){
        // console.log("render");
        const {location} = this.props;
        const{movieList} = this.state;
        console.log(movieList);
        // console.log("state");
        console.log(this.state);
        
        if(movieList===undefined){
            
        }else{
            // const response = axios.get("https://wdthr5fvke.execute-api.us-east-1.amazonaws.com/2020-12-13/board/"+encodeURIComponent(movieList[0].movieCd));
            // console.log(response);
            
            
            // console.log("디파인드");
            return (<span><h1>{location.state.title}</h1>
            <h3>영화이름 {movieList[0].movieNm}</h3>
            <h3>장르 {movieList[0].genreAlt}</h3>
            <h3>개봉일 {movieList[0].openDt}</h3>
            <h3>국가 {movieList[0].repNationNm}</h3>
            <h3>감독 {movieList[0].directors[0].peopleNm}</h3>
            {this.state.reviews.map(review => <h2 key={review.id}>{review.content}</h2>)}
            </span>)
            ;    
        }
        

        return <span>{location.state.title}</span>;
    }
}

export default Detail;