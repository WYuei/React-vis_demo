import React, {Component} from 'react';
import Chart from './Chart'
import HighlightChart from './HighlightChart'

const API_URL = "https://nataliia-radina.github.io/react-vis-example/";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
        };
    }

    componentDidMount() {
        fetch(API_URL)
            .then(response => {
                if (response.ok) {
                    return  response.json()
                }
                else {
                    throw new Error ('something went wrong')
                }
            })
            .then(response => this.setState({
                    results: response.results.filter((r)=>{
                        return r.name === 'JavaScript';
                    })
                })
            )}

    render() {
        const {results} = this.state;

        return (
            <div className="App">
                <Chart data={results}/>
                <HighlightChart data={results}/>
            </div>
        );
    }
}

export default App;
