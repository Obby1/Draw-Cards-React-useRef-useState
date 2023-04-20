import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';

function Deck() {

    const [deck, setDeck] = useState(null);
    // set to [] as we will fill this array with added cards when drawn
    const [cards, setCards] = useState([]);
    // set to false as we will update this to true when we're drawing
    const [drawing, setDrawing] = useState(false);
    const drawInterval = useRef();

    // createDeck on page load only
    useEffect(() => {
        async function createDeck() {
            const response = await axios.get('https://deckofcardsapi.com/api/deck/new/');
            setDeck(response.data);
        }
        createDeck();
    }, []);

    // logic for continuous drawing below
    // drawing set to true when toggleDrawing triggered through button 
    useEffect(() => {
        if (drawing && deck) {
            drawInterval.current = setInterval(async () => {
                const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
                if (response.data.remaining === 0) {
                    alert('Error: no cards remaining!');
                    setDrawing(false);
                    clearInterval(drawInterval.current);
                } else {
                    setCards((prevState) => [...prevState, ...response.data.cards]);
                }
            }, 1000);

            return () => clearInterval(drawInterval.current);
        }
    }, [drawing, deck]);

    async function drawCard() {
        if (!deck) return;
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
        if (response.data.remaining === 0) {
            alert('Error: no cards remaining!');
        } else {
            setCards([...cards, ...response.data.cards]);
        }
    }

    function toggleDrawing() {
        setDrawing(!drawing);
    }

    return (
        <div className="Deck">
            <h1>Deck of Cards</h1>
            <button onClick={drawCard}>Draw a card</button>
            <button onClick={toggleDrawing}>{drawing ? 'Stop drawing' : 'Start drawing'}</button>
            <div className="cards-container">
                {cards.map((card) => (
                    <Card key={card.code} name={`${card.value} of ${card.suit}`} image={card.image} />
                ))}
            </div>
        </div>
    );
}

export default Deck;
