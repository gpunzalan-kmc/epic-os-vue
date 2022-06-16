<template>
  <div class="controls">
    <p>
      <button id="edit" @click="Edit()">Toggle editing polygon</button>
    </p>
  </div>
  <canvas ref="can" style="border:1px solid #ccc"></canvas>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { fabric } from "fabric";
export default defineComponent({
  setup() {
    const can = ref(null);
    const points = [
      {
        x: 3,
        y: 4,
      },
      {
        x: 16,
        y: 3,
      },
      {
        x: 30,
        y: 5,
      },
      {
        x: 25,
        y: 55,
      },
      {
        x: 19,
        y: 44,
      },
      {
        x: 15,
        y: 30,
      },
      {
        x: 15,
        y: 55,
      },
      {
        x: 9,
        y: 55,
      },
      {
        x: 6,
        y: 53,
      },
      {
        x: -2,
        y: 55,
      },
      {
        x: -4,
        y: 40,
      },
      {
        x: 0,
        y: 20,
      },
    ];
    const points1 = [
      {
        x: 3,
        y: 4,
      },
      {
        x: 16,
        y: 3,
      },
      {
        x: 30,
        y: 5,
      },
      {
        x: 25,
        y: 55,
      },
      {
        x: 19,
        y: 44,
      },
      {
        x: 15,
        y: 30,
      },
      {
        x: 15,
        y: 55,
      },
      {
        x: 9,
        y: 55,
      },
      {
        x: 6,
        y: 53,
      },
      {
        x: -2,
        y: 55,
      },
      {
        x: -4,
        y: 40,
      },
      {
        x: 0,
        y: 20,
      },
    ];
    // const canvas = new fabric.Canvas(can.value);
    //   const polygon = new fabric.Polygon(points, {
    //     left: 100,
    //     top: 50,
    //     fill: "#D81B60",
    //     strokeWidth: 4,
    //     stroke: "green",
    //     scaleX: 4,
    //     scaleY: 4,
    //     objectCaching: false,
    //     transparentCorners: false,
    //     cornerColor: "blue",
    //   });
    //   canvas.viewportTransform = [0.7, 0, 0, 0.7, -50, 50];
    //   canvas.add(polygon);
    let canvas;
    onMounted(() => {
      canvas = new fabric.Canvas(can.value);
      canvas.setWidth(1280);
      canvas.setHeight(960);
      const polygon = new fabric.Polygon(points, {
        left: 6,
        top: 6,
        fill: "#D81B60",
        strokeWidth: 4,
        stroke: "green",
        scaleX: 4,
        scaleY: 4,
        objectCaching: false,
        transparentCorners: false,
        cornerColor: "blue",
      });
      const polygon1 = new fabric.Polygon(points1, {
        left: 100,
        top: 50,
        fill: "#D81B60",
        strokeWidth: 4,
        stroke: "green",
        scaleX: 4,
        scaleY: 4,
        objectCaching: false,
        transparentCorners: false,
        cornerColor: "blue",
      });
      canvas.viewportTransform = [0.7, 0, 0, 0.7, -50, 50];
      const circle = new fabric.Circle({
        left: 6,
        top: 6,
        radius: 5,
        stroke: "red",
        strokeWidth: 3,
        fill: "",
      });
      canvas.add(circle);
      canvas.renderAll();
      canvas.add(polygon);
      canvas.add(polygon1);

      canvas.on("mouse:down", function(options) {
        console.log(options);
        const circle = new fabric.Circle({
          left: options.absolutePointer.x,
          top: options.absolutePointer.y,
          radius: 5,
          stroke: "red",
          strokeWidth: 3,
          fill: "",
        });
        canvas.add(circle);
        canvas.renderAll();
      });
    });
    function polygonPositionHandler(dim, finalMatrix, fabricObject) {
      const x =
          fabricObject.points[this.pointIndex].x - fabricObject.pathOffset.x,
        y = fabricObject.points[this.pointIndex].y - fabricObject.pathOffset.y;
      return fabric.util.transformPoint(
        { x: x, y: y },
        fabric.util.multiplyTransformMatrices(
          fabricObject.canvas.viewportTransform,
          fabricObject.calcTransformMatrix()
        )
      );
    }
    function actionHandler(eventData, transform, x, y) {
      const polygon = transform.target,
        currentControl = polygon.controls[polygon.__corner],
        mouseLocalPosition = polygon.toLocalPoint(
          new fabric.Point(x, y),
          "center",
          "center"
        ),
        polygonBaseSize = polygon._getNonTransformedDimensions(),
        size = polygon._getTransformedDimensions(0, 0),
        finalPointPosition = {
          x:
            (mouseLocalPosition.x * polygonBaseSize.x) / size.x +
            polygon.pathOffset.x,
          y:
            (mouseLocalPosition.y * polygonBaseSize.y) / size.y +
            polygon.pathOffset.y,
        };
      polygon.points[currentControl.pointIndex] = finalPointPosition;
      return true;
    }
    function anchorWrapper(anchorIndex, fn) {
      return function(eventData, transform, x, y) {
        const fabricObject = transform.target,
          absolutePoint = fabric.util.transformPoint(
            {
              x: fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x,
              y: fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y,
            },
            fabricObject.calcTransformMatrix()
          ),
          actionPerformed = fn(eventData, transform, x, y),
          newDim = fabricObject._setPositionDimensions({}),
          polygonBaseSize = fabricObject._getNonTransformedDimensions(),
          newX =
            (fabricObject.points[anchorIndex].x - fabricObject.pathOffset.x) /
            polygonBaseSize.x,
          newY =
            (fabricObject.points[anchorIndex].y - fabricObject.pathOffset.y) /
            polygonBaseSize.y;
        fabricObject.setPositionByOrigin(absolutePoint, newX + 0.5, newY + 0.5);
        return actionPerformed;
      };
    }
    function Edit() {
      // clone what are you copying since you
      // may want copy and paste on different moment.
      // and you do not want the changes happened
      // later to reflect on the copy.

      const poly = canvas.getObjects()[0];
      const poly1 = canvas.getObjects()[1];
      canvas.setActiveObject(poly);
      canvas.setActiveObject(poly1);
      poly.edit = !poly.edit;
      poly1.edit = !poly1.edit;
      if (poly.edit) {
        const lastControl = poly.points.length - 1;
        poly.cornerStyle = "circle";
        poly.cornerColor = "rgba(0,0,255,0.5)";
        poly.controls = poly.points.reduce(function(acc, point, index) {
          acc["p" + index] = new fabric.Control({
            positionHandler: polygonPositionHandler,
            actionHandler: anchorWrapper(
              index > 0 ? index - 1 : lastControl,
              actionHandler
            ),
            actionName: "modifyPolygon",
            pointIndex: index,
          });
          return acc;
        }, {});
      } else {
        poly.cornerColor = "blue";
        poly.cornerStyle = "rect";
        poly.controls = fabric.Object.prototype.controls;
      }
      poly.hasBorders = !poly.edit;
      canvas.requestRenderAll();

      if (poly1.edit) {
        const lastControl = poly1.points.length - 1;
        poly1.cornerStyle = "circle";
        poly1.cornerColor = "rgba(0,0,255,0.5)";
        poly1.controls = poly1.points.reduce(function(acc, point, index) {
          acc["p" + index] = new fabric.Control({
            positionHandler: polygonPositionHandler,
            actionHandler: anchorWrapper(
              index > 0 ? index - 1 : lastControl,
              actionHandler
            ),
            actionName: "modifyPolygon",
            pointIndex: index,
          });
          return acc;
        }, {});
      } else {
        poly1.cornerColor = "blue";
        poly1.cornerStyle = "rect";
        poly1.controls = fabric.Object.prototype.controls;
      }
      poly.hasBorders = !poly.edit;
      canvas.requestRenderAll();
    }
    return { can, polygonPositionHandler, actionHandler, anchorWrapper, Edit };
  },
});
</script>
