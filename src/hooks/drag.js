const { useState, useRef, useCallback } = require("react");
export function useDrag() {
  var _a = useState(false),
    clicked = _a[0],
    setClicked = _a[1];
  var _b = useState(false),
    dragging = _b[0],
    setDragging = _b[1];
  var position = useRef(0);
  var dragStart = useCallback(function (ev) {
    position.current = ev.clientX;
    setClicked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var dragStop = useCallback(function () {
    // NOTE: need some delay so item under cursor won't be clicked
    return window.requestAnimationFrame(function () {
      setDragging(false);
      setClicked(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var dragMove = function (ev, cb) {
    var newDiff = position.current - ev.clientX;
    var movedEnough = Math.abs(newDiff) > 5;
    if (clicked && movedEnough) {
      setDragging(true);
    }
    if (dragging && movedEnough) {
      position.current = ev.clientX;
      cb(newDiff);
    }
  };
  return {
    dragStart,
    dragStop,
    dragMove,
    dragging,
    position,
    setDragging,
  };
}
