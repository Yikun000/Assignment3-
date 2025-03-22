// Heron's Formula
const heronsFormula = (a, b, c) => {
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
};

document.getElementById('calculate-h').addEventListener('click', () => {
    const a = parseFloat(document.getElementById('h-sideA').value);
    const b = parseFloat(document.getElementById('h-sideB').value);
    const c = parseFloat(document.getElementById('h-sideC').value);
    document.getElementById('h-result').value = heronsFormula(a, b, c) || 'Invalid input';
});

// Ambiguous Case Solver
const ambiguousCase = (a, b, A) => {
    if (A === 90) return 'Right triangle';
    const h = b * Math.sin(A * (Math.PI / 180));
    if (a < h) return 'No triangle';
    if (a > b) return 'One triangle';
    return (h < a && a < b) ? 'Two triangles (ambiguous case)' : 'One triangle';
};

document.getElementById('calculate-ambiguous').addEventListener('click', () => {
    const a = parseFloat(document.getElementById('side-a-ambiguous').value);
    const b = parseFloat(document.getElementById('side-b-ambiguous').value);
    const A = parseFloat(document.getElementById('angle-a-ambiguous').value);
    document.getElementById('triangle-type-result').value = ambiguousCase(a, b, A);
});

// Newton's Method for Root Approximation
const newtonsMethod = (g) => {
    const f = x => 6 * x ** 4 - 13 * x ** 3 - 18 * x ** 2 + 7 * x + 6;
    const fPrime = x => 24 * x ** 3 - 39 * x ** 2 - 36 * x + 7;
    let iterations = 0, maxIterations = 1000;
    while (Math.abs(f(g)) > 0.0001 && iterations < maxIterations) {
        g -= f(g) / fPrime(g);
        iterations++;
    }
    return g;
};

document.getElementById('calculate-newton').addEventListener('click', () => {
    const g = parseFloat(document.getElementById('root-guess').value);
    document.getElementById('root-approximation-result').value = newtonsMethod(g);
});

// Polynomial Evaluation
const evaluatePolynomial = (coefficients, exponents, x) => {
    return coefficients.reduce((sum, coef, i) => sum + coef * x ** exponents[i], 0);
};

const polynomialFunction = (coefficients, exponents) => {
    return coefficients.map((coef, i) => {
        const sign = coef < 0 ? ' - ' : i === 0 ? '' : ' + ';
        return `${sign}${Math.abs(coef)}x^${exponents[i]}`;
    }).join('');
};

document.getElementById('calculate-polynomial').addEventListener('click', () => {
    const coefficients = document.getElementById('coefficients').value.split(' ').map(Number);
    const exponents = document.getElementById('exponents').value.split(' ').map(Number);
    const x = parseFloat(document.getElementById('x-value').value);

    document.getElementById('polynomial-function-result').value = polynomialFunction(coefficients, exponents);
    document.getElementById('polynomial-evaluation-result').value = evaluatePolynomial(coefficients, exponents, x);
});
