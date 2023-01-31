'use strict';

const field = document.querySelector('.field');

const cellSize = 100;

const empty = {
    value: 0,
    bottom: 0,
    right: 0
};

const cells = [];
cells.push(empty);

function move(index) {

    const cell = cells[index];

    const rightDiff = Math.abs(empty.right - cell.right);
    const bottomDiff = Math.abs(empty.bottom - cell.bottom);

    if (rightDiff + bottomDiff > 1) {
        return;
    }

    cell.element.style.right = `${empty.right * cellSize}px`;
    cell.element.style.bottom = `${empty.bottom * cellSize}px`;

    const emptyRight = empty.right;
    const emptyBottom = empty.bottom;

    empty.right = cell.right;
    empty.bottom = cell.bottom;

    cell.right = emptyRight;
    cell.bottom = emptyBottom;

    const isFinished = cells.every(cell => {
        return cell.value === (cell.bottom * 4 + (cell.right + 1));
    });

    if (isFinished) {
        alert('CONGRATULATIONS, YOU ARE WINNER !!!');
    }
}

const numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5);

for (let i = 1; i <= 15; i++) {
    const cell = document.createElement('div');
    const value = numbers[i - 1] + 1;
    cell.className = 'cell';
    cell.innerHTML = value;

    const right = i % 4;
    const bottom = (i - right) / 4;

    cells.push({
        value: value,
        right: right,
        bottom: bottom,
        element: cell
    });

    cell.style.right = `${right * cellSize}px`;
    cell.style.bottom = `${bottom * cellSize}px`;

    field.append(cell);

    cell.addEventListener('click', () => {
        move(i);
    });
}
