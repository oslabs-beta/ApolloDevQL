import "./contentscript.css";
console.log("hello moon!");
alert("Hello!");
window.postMessage({ action: "Hello from us!" }, "*");

const isThisContentscript = true;
console.log("isThisContentscript", isThisContentscript);
