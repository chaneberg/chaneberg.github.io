form = document.getElementById('form');
resultArea = document.getElementById('result');
theWorker = new Worker("word-morph-worker.js");

function wordMorph() {
  resultArea.innerHTML = '<img src="/loading.gif">';

  theWorker.postMessage([form.startWord.value, form.endWord.value]);
}

theWorker.onmessage = function(message) {
  resultArea.innerHTML = message.data;
};