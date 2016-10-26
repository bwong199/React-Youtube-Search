import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import SearchBar from './components/search_bar';


const API_KEY = "AIzaSyC9mr6gSBWZfuHntwu9RxOaGQZqyBXb5HI";

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			videoes: [], 
			selectedVideo: null

		 };

		 this.videoSearch('surfboards');
	}

	videoSearch(term){
		YTSearch({key: API_KEY, term: term},(videoes) => {
			console.log(videoes);
			this.setState({
				videoes: videoes, 
				selectedVideo: videoes[0]
			});
		});
	}

	render(){
		const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);

		return  <div>
		<SearchBar onSearchTermChange={term => this.videoSearch(term)} />
		<VideoDetail video={this.state.selectedVideo}/>
		<VideoList 
			onVideoSelect={selectedVideo => this.setState({selectedVideo})}
			videoes={this.state.videoes}/>
		</div>;
	}

}


ReactDOM.render(<App />, document.querySelector('.container'));