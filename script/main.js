function initSpinyt()
{
	var canvas = document.getElementsByTagName('canvas')[0];

	var stage = new Stage(canvas);
	stage.start();

	var multitouch = new Multitouch(canvas);
	multitouch.listenToEvent("TOUCH_START", stage.touchStart);
	multitouch.listenToEvent("TOUCH_MOVE", stage.touchMove);
	multitouch.listenToEvent("TOUCH_END", stage.touchEnd);  
  
}
