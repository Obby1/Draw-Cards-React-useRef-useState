import React, { useState, useEffect, useRef } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef();

    useEffect(() => {
        console.log(`starting useEffect`)
        prevCountRef.current = count;
        console.log(`prevCountRef.current = count`)
        console.log(`${prevCountRef.current} = ${count}`)
        console.log(`ending useEffect`)
    });

    function increment() {
        setCount(count + 1);
    }

    const prevCount = prevCountRef.current;
    console.log(`prevCount = ${prevCount}`);

    return (
        <div>
            <p>Current count: {count}</p>
            <p>Previous count: {prevCount}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

export default Counter;


// Notes:
// when the Counter renders, I am saving the current Count as the previous Count in a variable called prevCount which is saved using useRef. This previous Count will be displayed as previous count when the component re-renders
// prevCount will be displayed on the re-render of the component, and updated after the component displays since it's in the useEffect