var activeTouches = {
  single: [],
  double: []
};

function initMultiTouch() {

  var el = document.getElementsByTagName('canvas')[0];
  el.addEventListener('touchstart', handleStart, false);
  el.addEventListener('touchend', handleEnd, false);
  el.addEventListener('touchmove', handleMove, false);

}

function getTouchIndexById(idToFind) {

  for(var i = 0; i < activeTouches.single.length; i++) {

    var id = activeTouches.single[i].identifier;

    if (id == idToFind) {

      return i;

    }

  }

  return -1;
}

function handleStart(evt) {

  event.preventDefault();

  var touches = event.changedTouches;

  for (var i = 0; i < touches.length; i++) {

    activeTouches.single.push({
      identifier: touch.identifier,
      pageX: touch.pageX,
      pageY: touch.pageY,
      createTime: evt.timeStamp
    });

  }

  console.log(activeTouches);
}

function handleMove(evt) {

  event.preventDefault();

  var touches = event.changedTouches;

  for (var i = 0; i < touches.length; i++) {

    var idx = getTouchIndexById(touches[i].identifier);
    activeTouches.single[idx].pageX = touches[i].pageX;
    activeTouches.single[idx].pageY = touches[i].pageY;

  }

  console.log(activeTouches);
}

function handleEnd(evt) {

  event.preventDefault();

  var touches = event.changedTouches;

  for (var i = 0; i < touches.length; i++) {

    var idx = getTouchIndexById(touches[i].identifier);
    activeTouches.single.splice(idx,1);

  }

  console.log(activeTouches);
}
