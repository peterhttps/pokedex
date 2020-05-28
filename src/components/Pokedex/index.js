import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import axios from 'axios';
import './pokedexPanel.css';
import './inputs.css';
import './styles.css';

// import { Container } from './styles';

function Pokedex() {

    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showing, setShowing] = useState(true);
    const [loadingTarget, setLoadingTarget] = useState("loading");
    const [maxId, setMaxId] = useState(9);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState(false);

    const [useEffectCall, setUseEffectCall] = useState(true);
    const [searchError, setSearchError] = useState(false);

    useEffect(() => {
        async function fetchAllPokemons() {

            // Set some states before fetch
            setPokemons([]); // Clean the pokemon array
            setLoading(true);
            setShowing(false);
            setLoadingTarget("loading");
            setSearch(false);
            setSearchError(false);
            // Fetch based in offset
            await api.get(`?limit=9&offset=${offset}`)
                .then(response => {

                    // Map each item in response to get pokemons individually
                    response.data.results.map(async (pokemon) => {
                        await axios.get(pokemon.url)
                            .then(result => {
                                setPokemons(oldArray => [...oldArray, result.data]);

                                // If to set loading false
                                if (maxId === result.data.id) {

                                    setLoading(false);
                                    setShowing(true);
                                    setLoadingTarget("loaded")
                                }

                            });

                    });


                });

        }

        fetchAllPokemons();

    }, [offset, maxId, useEffectCall]);

    async function fetchSpecificPokemon(pokemon) {
        setPokemons([]); // Clean the pokemon array
        setLoading(true);
        setShowing(false);
        setLoadingTarget("loading");
        setSearch(true);
        setSearchError(false);

        await api.get(`/${pokemon}`)
            .then(response => {
                console.log(response.data);
                const list = [];
                list.push(response.data);
                setPokemons(list);

                setLoading(false);
                setShowing(true);
                setLoadingTarget("loadedSearch");
            })
            .catch(error => {
               setSearchError(true);
            });
    }

    function submitSearch(pokemon, index) {
        if (index === false) {
            fetchSpecificPokemon(pokemon);
        } else {
            setUseEffectCall(!useEffectCall);
        }

    }

    function onChange(e) {
        setInput(e.currentTarget.value.toLowerCase());
        //console.log(e.currentTarget.value);

    }

    function onClick() {
        if (input === '') {
            submitSearch(input, true);
        } else {
            submitSearch(input, false);
        }
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            if (input === '') {
                submitSearch(input, true);
            } else {
                submitSearch(input, false);
            }

        }
    }


    function nextPage() {

        const jump = offset + 9
        const jumpId = maxId + 9;
        setOffset(jump);
        setMaxId(jumpId);
        window.scrollTo(0, 0);
    }
    function backPage() {

        if (offset === 0) return;

        const jump = offset - 9
        const jumpId = maxId - 9;
        setOffset(jump);
        setMaxId(jumpId);
        window.scrollTo(0, 0)
    }


    return (
        <div className="pokedexGeneral" target={loadingTarget}>

            <div className="searchSection">
                <input type="text" className="searchInput" placeholder="Search Pokemons" onChange={onChange} onKeyDown={onKeyDown}></input>
                <button type="submit" onClick={onClick}><i className="fa fa-search" ></i></button>
            </div>



            <div className="pokedexPanel" target={loadingTarget}>

                {searchError ? <h1>Pokemon nao encontrado</h1> : null}

                {pokemons.map(pokemon => {
                    return (
                        <div key={pokemon.id} style={{ display: (showing ? 'block' : 'none') }}>
                            <div className="pokeId">
                                <p>#{pokemon.id}</p>
                            </div>
                            <img src={pokemon.sprites.front_default} alt="a"></img>

                            <div className="panelTexts">
                                <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                                <p>Weight: {pokemon.weight}</p>
                                {pokemon.types.map(type => {
                                    return (
                                        <div key={type.slot}>
                                            <p>{type.type.name}</p>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    );
                })}
            </div>
            <div style={{ display: (!search ? 'block' : 'none') }}>
                <div className="buttons" >
                    <button onClick={() => backPage()} disabled={loading}>Previous</button>
                    <button onClick={() => nextPage()} disabled={loading}>Next</button>
                </div>
            </div>
        </div>
    );


}


export default Pokedex;
