import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { increment, decrement, reset, incrementBy } from './counterSlice';
const Counter = () => {
    const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();
    const [incrementVal, setIncrementVal] = useState(Number(2));
    const addValue = Number(incrementVal) || 0;

    const resetAll = () => {
        setIncrementVal(0);
        dispatch(reset());
    };

    return (
        <section>
            <h1>Count: {count}</h1>
            <div>
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>

            </div>
            <div>
                <label htmlFor="incrementBy">
                    <span>Increment By</span>
                    <input type="text"
                        value={incrementVal}
                        onChange={(e) => setIncrementVal(e.target.value)}
                    />
                </label>

                <button onClick={resetAll}>reset</button>
                <button onClick={() => dispatch(incrementBy(addValue))}>Increment By</button>
            </div>
        </section>
    );
};

export default Counter;