class Header extends React.Component {
    render() {
        return(
            <h1 className="mainHeader container-fluid">{this.props.head}</h1>
        );
    }
}
class NavigationButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <button onClick={this.props.handleOnClick} className="">{this.props.data}</button>
        );
    }
}

class Navigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {
        const years = this.props.years;

        return (
            <ul className="lists navigationYear row mx-5 ">
                {years.map((value, index) => {
                    return (
                        <li data-year={value} className="navigationYearItems col" key={index}>
                            <NavigationButton data={value} handleOnClick={this.props.handleOnClick.bind(this)} /> 
                        </li>
                    );
                })}
            </ul>
        )
    }
}

class LeftFixed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // rank: this.props.currentRank
        }
    }
    
    render(){
        const ranks= this.props.ranks;

        return(
            <div className="col-1">  
                <ul className="lists leftList">
                    {ranks.map((value, index)=>{
                        return(
                            <li data-rank={value} className="leftFixedListItems" key={index}>
                                <NavigationButton data={value} handleOnClick={this.props.handleOnClick.bind(this)}/> 
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

class Movie extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    
    render() {
       
        return(
            <div id="movie" className="col-6" >
                {this.props.getdata()}
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            years: [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010],
            ranks: [1,2,3,4,5,6,7,8,9,10],
            currentYear: 2000,
            currentRank: 1,
            // background: {
            //     '2000': 'linear-gradient(to right,orange,red)',
            // }
        }
    }
    addBorder = () =>{
        document.querySelectorAll('button').forEach(button=>{
            if(button.dataset.current === "current"){
                button.style.borderLeft = "none";
                button.style.background = "initial";
                button.style.color = "black";
                button.style.fontWeight = "initial";
                button.dataset.current = "";
            }
            if(button.parentElement.dataset.rank === this.state.currentRank || button.parentElement.dataset.year === this.state.currentYear){
                button.style.borderLeft = "2.4px solid rgba(40,40,250,.6)";
                button.style.background = "rgba(16,16,16,.8)";
                button.style.fontWeight = "bold";
                button.style.color = "whitesmoke";
                button.dataset.current = "current";
            }
        });
    }
    componentDidMount(){
        console.log("Hi");
    }

    handleOnClick = event =>{
        let data = event.target.parentElement.dataset;
        this.animate();
        setTimeout(()=>{
            if(data["rank"]){
                this.setState({
                    currentRank: data["rank"]
                });
            }
            if(data["year"]){
                this.setState({
                    currentYear: data["year"]
                });
            }
        },1800);
      
    }
    animate = ()=> {
        let movieBox = document.querySelector('.movie');
        movieBox.style.animationPlayState = "running";
    }
    getdata = () => {
        fetch(`/movies?year=${this.state.currentYear}&rank=${this.state.currentRank}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let movie = data["movie"];

            let casts = movie["casts"]; 
            let director = movie["director"];
            let genre = movie["genre"];
            let gross = movie["gross"]; 
            let imdbrating = movie["imdbrating"];
            let length = movie["length"]; 
            let metascore = movie["metascore"];
            let rating = movie["rating"];
            let name = movie["name"]; 
            let synopsis = movie["synopsis"];

            let img = `img_${this.state.currentYear}_${this.state.currentRank}.jpg`

            let mainMovie = `  
            <div class="movie container ml-4 mt-3">
                <h1 class="movie-name">
                    ${name}
                </h1>
                <a href="https://www.imdb.com/find?q=${name}"  target="_blank"><img src="/static/top10/img/${img}"/><a>

                
                <h2 class="director">
                    <span class="details">Directed by: </span>${director}
                </h2>
                <h2 class="casts">
                    <span class="details">Casts: </span>${casts}
                </h2>
                <h2 class="length">
                    <span class="details">Length: </span>${length}
                </h2>
                <h2 class="rating">
                    <span class="details">Rating: </span>${rating}
                </h2>
                <h2 class="genre">
                    <span class="details">Genre: </span>${genre}
                </h2>
                <h2 class="gross">
                    <span class="details">Gross: </span>${gross}
                </h2>
                <h2 class="metascore">
                    <span class="details">Metasore: </span>${metascore}
                </h2>
                <h2 class="imdbrating">
                    <span class="details">IMDB: </span>${imdbrating}
                </h2>
                <p class="synopsis">
                    <span class="details"Synopsis>Synopsis: </span><br>${synopsis}
                </p>
            </div>
            <p class="text-right mr-5 pr-5" style="color:whitesmoke;animation: change 3s infinite forwards;animation-delay:2s;">
                Year:${this.state.currentYear} Rank:${this.state.currentRank}
            </p>
            `;

            document.querySelector('#movie').className = 'col';
            document.querySelector('#movie').innerHTML = mainMovie;

            this.addBorder();
        })

    }

    render() {
        return(
            <div className="container-fliud">
                {/* <Header head="Top 10 Movies" /> */}
                <Navigation years={this.state.years} currentYear={this.state.currentYear} handleOnClick={this.handleOnClick.bind(this)} />
                <div className="movieDisplay mr-5 row">
                <LeftFixed ranks={this.state.ranks} currentRank={this.state.currentRank} handleOnClick={this.handleOnClick.bind(this)} />
                <Movie currentYear={this.state.currentYear} currentRank={this.state.currentRank} getdata={this.getdata.bind(this)} />
                </div>
                {/* <Footer />    */}
            </div>    
        );
        
    }
}

class LinkAndLogo extends React.Component {
    render(){
        return(
            <li className="">
                <a href={this.props.imageHref}>
                    <img src={this.props.imageSrc}></img>
                </a>
            </li>
        );
    }
}

class Footer extends React.Component {
    render(){
        return(
            <footer className="footer container-fliud mt-3 pt-2 mt-md-5 mt-lg-3">
                <div className="row">
                    <ul className="col-auto social mx-auto">
                        <LinkAndLogo imageHref="https://www.facebook.com/" imageSrc="/static/top10/img/logo/facebook.png" />
                        <LinkAndLogo imageHref="#" imageSrc="/static/top10/img/logo/whatsapp.png" />
                        <LinkAndLogo imageHref="https://www.linkedin.com/in/iminfinity" imageSrc="/static/top10/img/logo/linkedin.png" />
                        <LinkAndLogo imageHref="https://www.instagram.com/" imageSrc="/static/top10/img/logo/instagram.png" />
                        <LinkAndLogo imageHref="https://www.twitter.com/" imageSrc="/static/top10/img/logo/twitter.png" />
                    </ul>
                </div>
            <div className="row" id="copyright">
                <p className="col-auto mx-auto">&copy; 2020 iminfinity&#8482;. All rights reserved.</p>
                </div>
        </footer> 
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#app'));

