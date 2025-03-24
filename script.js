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

// Ambiguous Case 
const ambiguousCase = (a, b, A) => {
    const h = b * Math.sin(A * (Math.PI / 180));

    if (A > 0 && A <= 90  ) { 
        if(h < a && a < b){
            return "two triangle(ambiguous case)";
        }
        else if (a == h) {
            return "Right triangle";
        }
        else if (a < h) {
            return "No triangle";
        }
        else{
            return "One triangle";
        }} 
    else if (A < 180 && A > 90) {
        if(a < b || a==b){
        return "No triangle"; 
        }
        else if (a > b){
            return "One triangle";
        }}
    else{
        return "Invalid Angle";
    }
};

document.getElementById('calculate-ambiguous').addEventListener('click', () => {
    const a = parseFloat(document.getElementById('side-a-ambiguous').value);
    const b = parseFloat(document.getElementById('side-b-ambiguous').value);
    const A = parseFloat(document.getElementById('angle-a-ambiguous').value);

    if (isNaN(a) || isNaN(b) || isNaN(A)) {
        document.getElementById('triangle-type-result').value = "Please fill in all fields correctly.";
        return;
    }

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

// Polynomial Function and Evaluation
const polynomialFunctionAndEvaluation = (coefficients, exponents, x) => {
    let polynomialStr = coefficients.map((coef, i) => {
        if (exponents[i] === undefined) return ''; 
        const sign = coef < 0 ? ' - ' : i === 0 ? '' : ' + ';
        return `${sign}${Math.abs(coef)}x^${exponents[i]}`;
    }).join('');

    let evaluation = coefficients.reduce((sum, coef, i) => 
        sum + (exponents[i] !== undefined ? coef * x ** exponents[i] : 0), 0
    );

    return [polynomialStr, evaluation.toFixed(1)];
};

document.getElementById('calculate-polynomial').addEventListener('click', () => {
    const coefficients = document.getElementById('coefficients').value.trim().split(/\s+/).map(Number);
    const exponents = document.getElementById('exponents').value.trim().split(/\s+/).map(Number);
    const x = parseFloat(document.getElementById('x-value').value);

    if (coefficients.length !== exponents.length) {
        alert("Error: Coefficients and exponents must have the same number of values.");
        return;
    }

    const [polynomialStr, evaluation] = polynomialFunctionAndEvaluation(coefficients, exponents, x);

    document.getElementById('polynomial-function-result').value = polynomialStr;
    document.getElementById('polynomial-evaluation-result').value = evaluation;
});