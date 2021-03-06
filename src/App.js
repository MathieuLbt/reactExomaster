import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleChange(event) {
        this.setState({value: event.target.value.toLowerCase()});
    }

    componentDidMount() {
// on récuperer les listes des series a partir du fichier JSON
        fetch('seriesList.json', {})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                /* alert("j'ai fait ce que j'ai pu");*/
            });
        // on récuperer les listes des episodes a partir du fichier JSON
        fetch('seriesEpisodesList.json', {})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })

    }

    render() {
        return (
            <div>
                <h1>Recherche ta serie</h1>
                {/*le input pour la recherche des series */}
                <input id="inputSearch" type="text" placeholder="Recherche une serie" value={this.state.value}
                       onChange={this.handleChange}/>
                <ul>
                    {this.state.value !== "" ?
                            //Recuperation des id des series
                        this.state.seriesList.filter(
                           ahah => ahah.seriesName.indexOf(this.state.value) > -1).map(item => <li
                            key={item.id}>{item.seriesName}

                            <ul>
                                {this.state.seriesEpisodesList.filter(
                                    //Recuperation des id des episodes
                                    b => b.serie_id == item.id).map(episode => episode.episodes_list.filter(

                                    cc => cc.episodeName).map(name => <li>{name.episodeName}</li>)
                                )

                                }
                            </ul>
                        </li>)

                        //ce qui apparait quand le input n'est pas rempli
                        : <h2>Rien n'est Marqué</h2>

                    }

                </ul>

            </div>
        )
    }
}

        export default App;