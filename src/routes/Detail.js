import React from "react";
import axios from "axios";
import "./Detail.css";

class Detail extends React.Component{
    state = {
        reviews : [],
        submit_content : '',
        weeklyBoxOfficeList : []
    };
   
    getBody = async (url, url2) => {
        const {data: {movieListResult:{movieList}}} = await axios.get(url)
        this.setState({movieList:movieList})
        const {data: {boxOfficeResult:{weeklyBoxOfficeList}}} = await axios.get(url2+encodeURIComponent(movieList[0].openDt))
        this.setState({weeklyBoxOfficeList:weeklyBoxOfficeList})
        console.log(weeklyBoxOfficeList)

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
        var url2 = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=e02fbe8e0ffcacc0e8e6424f4455ab10&targetDt="
        this.getBody(url, url2);
        console.log("몽고");
        

    }
    
    componentDidMount(){
        
    }

    render(){
        // console.log("render");
        const {location} = this.props;
        const{movieList} = this.state;
        const{weeklyBoxOfficeList} = this.state;
        console.log(movieList);
        // console.log("state");
        console.log(this.state);
        
        if(movieList===undefined){
            
        }else{
        
            return (<span><h1 className='bigtitle'>{location.state.title}</h1>
            <div className = 'info'>
                <div className='basic'>
                    <h2 className = 'smalltitle'>{movieList[0].movieNm}</h2>
                    <h4>장르 {movieList[0].genreAlt}</h4>
                    <h4>개봉일 {movieList[0].openDt}</h4>
                    <h4>국가 {movieList[0].repNationNm}</h4>
                    <h4>감독 {movieList[0].directors[0].peopleNm}</h4>
                </div>
                <div className = 'boxoffices'>
                    <h2> 개봉주 박스오피스 순위🎬</h2>
                {weeklyBoxOfficeList.map(boxOffice => <h3 className = 'boxoffice' key={boxOffice.rnum}>{boxOffice.rank}. {boxOffice.movieNm}</h3>)}
                </div>
                <div className= 'reviews'>
                    <h2 className = 'reviewTitle'> 리뷰📜</h2>
                    <form className = 'reviewForm'
                        onSubmit={(e) => {
                            window.alert('리뷰를 작성했습니다!\n'+ this.state.submit_content)
                            e.preventDefault()
                            axios.post('https://wdthr5fvke.execute-api.us-east-1.amazonaws.com/2020-12-13/board/', {
                                name : movieList[0].movieCd,
                                content: this.state.submit_content,
                                password: "password"
                            });
                        }}>
                        <input type = "text" value={this.state.submit_content}
                        onChange={(e) => {
                            const newValue = e.target.value
                            this.setState({submit_content:newValue})
                        }}/>
                        <input type="submit" />
                    </form>
                
                    {this.state.reviews.map(review => <h4 key={review.id}>{review.content}</h4>)}
                </div>
            </div>
            </span>
            )
            
            ;    
        }
        

        return <span>{location.state.title}</span>;
    }
}

export default Detail;