
function yieldToMain () {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    });
}

export { yieldToMain};