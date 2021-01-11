// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react'

// Import the API category from AWS Amplify
import { API } from 'aws-amplify'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import './App.css';

Amplify.configure(config)

function App() {
    // Create coins variable and set to empty array
    const [input, updateInput] = useState({ limit: 5, start: 0 })
    const [coins, updateCoins] = useState([])
    function updateInputValues(type, value) {
        updateInput({ ...input, [type]: value }) }

    // Define function to all API

    async function fetchCoins() {
        console.log('input', input)
        try {
            const { limit, start } = input
            const data = await API.get('criptoapi', `/coins?limit=${limit}&start=${start}`)
            console.log('data', data)
            updateCoins(data.coins)
        } catch (e) {
            console.log('e', e)
        }

    }

    // Call fetchCoins function when component loads
    useEffect(() => {
        fetchCoins()
    }, [])

    return (
        <div className="App">
            <input
                onChange={e => updateInputValues('limit', e.target.value)}
                placeholder="limit"
            />
            <input
                placeholder="start"
                onChange={e => updateInputValues('start', e.target.value)}
            />
            <button onClick={fetchCoins}>Fetch Coins</button>
            {
                coins.map((coin, index) => (
                    <div key={index}>
                        <h2>{coin.name} - {coin.symbol}</h2>
                        <h5>${coin.price_usd}</h5>
                    </div>
                ))
            }
        </div>
    );
}

export default App
