import React, { useState } from 'react'

const MatrixComponent = () => {
    const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill('white')));
    const [clicks, setClicks] = useState([]);

    // Click all the cells of the matrix and make the color change to green
    const handleClick = (rowIndex, colIndex) => {
        if (matrix[rowIndex][colIndex] !== 'white') return;

        const newMatrix = matrix.map((row, rIdx) =>
            row.map((color, cIdx) =>
                rIdx === rowIndex && cIdx === colIndex ? 'green' : color
            )
        );

        setMatrix(newMatrix);
        setClicks([...clicks, { rowIndex, colIndex }]);
    };

    // Function to Last Cell Click and show green tracked color to orange
    const handleLastClick = () => {
        if (clicks.length !== 8) return;

        const newMatrix = matrix.map(row => row.map(() => 'white'));
        clicks.forEach((click, index) => {
            setTimeout(() => {
                setMatrix(prevMatrix => {
                    const updatedMatrix = prevMatrix.map((row, rIdx) =>
                        row.map((color, cIdx) =>
                            rIdx === click.rowIndex && cIdx === click.colIndex ? 'orange' : color
                        )
                    );
                    return updatedMatrix;
                });
            }, index * 500); // Change color with a delay of 500ms between each
        });
    };

    return (
        <>
            <div className='container'>
                {matrix.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((color, colIndex) => (
                            <div
                                key={colIndex}
                                className="box"
                                style={{ backgroundColor: color }}
                                onClick={() => {
                                    if (clicks.length === 8 && rowIndex === 2 && colIndex === 2) {
                                        handleLastClick();
                                    } else {
                                        handleClick(rowIndex, colIndex);
                                    }
                                }}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default MatrixComponent