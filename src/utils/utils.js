export function roundDate(timeStamp){
  timeStamp -= timeStamp % (24 * 60 * 60 * 1000);//subtract amount of time since midnight
  timeStamp += new Date().getTimezoneOffset() * 60 * 1000;//add on the timezone offset
  return new Date(timeStamp - 1);
}

export function isDateOlderThanToday(date) {
  return date < roundDate(Date.now());
}

export function scrollToBottom(Vue) {
  Vue.$nextTick(() => {
    // TODO: what would be a good value to scroll to?
    window.scrollTo({"top":10000});
    // var objDiv = document.getElementById("chatbox");
    // objDiv.scrollTop = objDiv.scrollHeight;
  });
}
