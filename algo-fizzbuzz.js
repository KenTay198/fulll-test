const fizzBuzz = (N) => {
    for(let i=1; i<=N; i++) {
        let text = `${i%3 === 0 ? "Fizz" : ""}${i%5 === 0 ? "Buzz" : ""}`
        console.log(text || i);
    }
}

fizzBuzz(15);