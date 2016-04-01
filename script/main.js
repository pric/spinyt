function initSpinyt()
{
  var canvas = document.getElementsByTagName('canvas')[0];

  var stage = new Stage(canvas);
  stage.start();

  var multitouch = new Multitouch(canvas);
  multitouch.listenToEvent(SINGLE_TOUCH_START_EVENT, stage.touchStart);
  multitouch.listenToEvent(SINGLE_TOUCH_MOVE_EVENT, stage.touchMove);
  multitouch.listenToEvent(SINGLE_TOUCH_END_EVENT, stage.touchEnd);
  multitouch.listenToEvent(DOUBLE_TOUCH_START_EVENT, stage.doubleTouchStart);
  multitouch.listenToEvent(DOUBLE_TOUCH_END_EVENT, stage.doubleTouchEnd);
}
