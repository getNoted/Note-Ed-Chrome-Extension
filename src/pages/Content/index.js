// import { printLine } from './modules/print';


console.log('Content script works!');
const videoname = document.body.getElementsByClassName(
  'title style-scope ytd-video-primary-info-renderer'
);
console.log(videoname[0]);
const name = document.getElementsByTagName('title')[0].innerHTML;
console.log(name);
chrome.storage.sync.set({ name });
console.log('Must reload extension for modifications to take effect.');

// console.log('Content script works!');
// console.log('Must reload extension for modifications to take effect.');


// printLine("Using the 'printLine' function from the Print Module");
