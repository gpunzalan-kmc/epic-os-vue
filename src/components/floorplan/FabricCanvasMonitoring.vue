<template>
  <div style="position:absolute;left:0px;top:0px;width:100%; height:100%;">
    <canvas
      ref="can"
      width="1280"
      height="960"
      style="border:1px solid #ccc; 
        "
    ></canvas>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { fabric } from "fabric";
import { ElMessageBox } from "element-plus";
import sensorGreen from "@/assets/img/sensor-green.png";
import sensorRed from "@/assets/img/sensor-red.png";
import sensorGray from "@/assets/img/sensor-gray1.png";
import sensorOrange from "@/assets/img/sensor-orange.png";
export default defineComponent({
  props: {
    workPoints: {
      type: Array,
      required: true,
    },
    telemetryLogs: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const can = ref(null);
    const points = [];
    const ciclePoints = [];
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

    function onDragOver() {
      console.log("onDragOver");
    }
    let canvas;

    function closePolyon() {
      const polygon = new fabric.Polygon(ciclePoints, {
        fill: "#D81B60",
        strokeWidth: 4,
        stroke: "green",
        scaleX: 1,
        scaleY: 1,
        objectCaching: false,
        transparentCorners: false,
        cornerColor: "blue",
      });
      canvas.add(polygon);
    }
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
    function deleteObject(_, options) {
      const poly = canvas.getObjects().find((d) => d.id == options.target.id);
      if (poly) {
        ElMessageBox.confirm(
          "This will delete the workpoint. Continue?",
          "Delete Workpoint",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(async () => {
          canvas.remove(poly);
          emit("onDelete", {
            id: options.target.id,
            top: options.target.top,
            left: options.target.left,
            angle: options.target.angle,
            points: options.target.points,
          });
        });
      }
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
    function Edit(poly) {
      // const poly = canvas.getObjects()[3];
      // poly.set({
      //   fill: "#ffff",
      // });
      // console.log(canvas.getObjects());
      // canvas.remove(poly);
      // canvas.remove(poly3);
      // canvas.remove(poly2);
      // canvas.remove(poly1);
      // canvas.remove(poly);
      canvas.setActiveObject(poly);

      poly.edit = !poly.edit;

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
    }

    function renderIcon(icon) {
      return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        const size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    }
    function checkBattery(workpointID) {
      const check = props.telemetryLogs.find(
        (log) => log.workPointId == workpointID && log.battery == true
      );
      if (check) {
        return true;
      }
      return false;
    }
    function checkIfActive(workpointID) {
      const checkWorkpoint = props.workPoints.find(
        (work) => work.id == workpointID
      );
      if (checkWorkpoint && checkWorkpoint.mergedWorkpoints.length > 0) {
        checkWorkpoint.mergedWorkpoints.map((w) => {
          const check = props.telemetryLogs.find(
            (log) => log.workPointId == w.id
          );
          if (check) return true;
        });
      }

      const check = props.telemetryLogs.find(
        (log) => log.workPointId == workpointID
      );
      if (check) return true;
      return false;
    }
    // const image = "@/assets/img/sensor-active.png";
    function mountWorkpoint() {
      canvas.remove(...canvas.getObjects());
      console.log(props.workPoints, "test");
      props.workPoints.map((workpoint) => {
        if (workpoint.spaceType == 0 || workpoint.spaceType == 4) {
          const isActive = checkIfActive(workpoint.id);
          const isPowered = checkBattery(workpoint.id);
          if (workpoint.isNotDetected == true) {
            fabric.Image.fromURL(sensorGray, function(img) {
              canvas.add(
                img
                  .set({
                    id: workpoint.id,
                    left: workpoint.coordinateX,
                    top: workpoint.coordinateY,
                    angle: workpoint.rotation,
                    // lockScalingX: true,
                    // lockScalingY: true,
                    snapAngle: 15,
                    snapThreshold: 45,
                    selectable: false,
                  })
                  .scale(0.1)
              );
            });
          } else if (isPowered) {
            fabric.Image.fromURL(sensorOrange, function(img) {
              console.log(
                props.telemetryLogs.length,
                checkIfActive(workpoint.id)
              );
              canvas.add(
                img
                  .set({
                    id: workpoint.id,
                    left: workpoint.coordinateX,
                    top: workpoint.coordinateY,
                    angle: workpoint.rotation,
                    // lockScalingX: true,
                    // lockScalingY: true,
                    snapAngle: 15,
                    snapThreshold: 45,
                    selectable: false,
                  })
                  .scale(0.1)
              );
            });
          } else if (isActive) {
            fabric.Image.fromURL(sensorRed, function(img) {
              console.log(
                props.telemetryLogs.length,
                checkIfActive(workpoint.id)
              );
              canvas.add(
                img
                  .set({
                    id: workpoint.id,
                    left: workpoint.coordinateX,
                    top: workpoint.coordinateY,
                    angle: workpoint.rotation,
                    // lockScalingX: true,
                    // lockScalingY: true,
                    snapAngle: 15,
                    snapThreshold: 45,
                    selectable: false,
                  })
                  .scale(0.1)
              );
            });
          } else {
            fabric.Image.fromURL(sensorGreen, function(img) {
              console.log(
                props.telemetryLogs.length,
                checkIfActive(workpoint.id)
              );
              canvas.add(
                img
                  .set({
                    id: workpoint.id,
                    left: workpoint.coordinateX,
                    top: workpoint.coordinateY,
                    angle: workpoint.rotation,
                    // lockScalingX: true,
                    // lockScalingY: true,
                    snapAngle: 15,
                    snapThreshold: 45,
                    selectable: false,
                  })
                  .scale(0.1)
              );
            });
          }
        }
        if (
          workpoint &&
          (workpoint.spaceType == 1 ||
            workpoint.spaceType == 2 ||
            workpoint.spaceType == 3 ||
            workpoint.spaceType == 5)
        ) {
          let polygonPoints = workpoint.coordinatePoints;
          if (polygonPoints && polygonPoints.length == 0) {
            polygonPoints = [
              { x: -15, y: -30 },
              { x: 95, y: -30 },
              { x: 205, y: -30 },
              { x: 205, y: 40 },
              { x: 205, y: 110 },
              { x: 95, y: 110 },
              { x: -15, y: 110 },
              { x: -15, y: 35 },
            ];
          }
          const isActive = checkIfActive(workpoint.id);
          let polygon = new fabric.Polygon(polygonPoints, {
            id: workpoint.id,
            left: workpoint.coordinateX,
            top: workpoint.coordinateY,
            angle: workpoint.rotation,
            scaleX: workpoint.scaleX == 0 ? 1 : workpoint.scaleX,
            scaleY: workpoint.scaleY == 0 ? 1 : workpoint.scaleY,
            fill: "#34d399",
            stroke: "#34d399",
            strokeWidth: 4,
            opacity: 0.5,
            selectable: false,
            objectCaching: false,
            transparentCorners: false,
            cornerColor: "blue",
            snapAngle: 10,
          });
          if (!isActive) {
            polygon = new fabric.Polygon(polygonPoints, {
              id: workpoint.id,
              left: workpoint.coordinateX,
              top: workpoint.coordinateY,
              angle: workpoint.rotation,
              scaleX: workpoint.scaleX == 0 ? 1 : workpoint.scaleX,
              scaleY: workpoint.scaleY == 0 ? 1 : workpoint.scaleY,
              fill: "#e55239",
              stroke: "#e55239",
              strokeWidth: 4,
              opacity: 0.5,
              selectable: false,
              objectCaching: false,
              transparentCorners: false,
              cornerColor: "blue",
              snapAngle: 10,
            });
          }

          const deleteIcon =
            "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

          const deleteImg = document.createElement("img");
          deleteImg.src = deleteIcon;
          canvas.add(polygon);

          fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: 16,
            cursorStyle: "pointer",
            mouseUpHandler: deleteObject,
            render: renderIcon(deleteImg),
            cornerSize: 24,
          });
        }
      });
    }

    onMounted(() => {
      canvas = new fabric.Canvas(can.value);

      // const polygon1 = new fabric.Polygon(points1, {
      //   left: 100,
      //   top: 50,
      //   fill: "#D81B60",
      //   strokeWidth: 4,
      //   stroke: "green",
      //   scaleX: 4,
      //   scaleY: 4,
      //   objectCaching: false,
      //   transparentCorners: false,
      //   cornerColor: "blue",
      // });

      // const rect = new fabric.Rect({
      //   left: 100,
      //   top: 50,
      //   fill: "yellow",
      //   width: 200,
      //   height: 100,
      //   objectCaching: false,
      //   stroke: "lightgreen",
      //   strokeWidth: 4,
      // });
      // canvas.viewportTransform = [0.7, 0, 0, 0.7, -50, 50];
      // mountWorkpoint();
      // canvas.add(polygon1);
      // canvas.add(rect);
      // canvas.setActiveObject(rect);

      // fabric.Image.fromURL(
      //   "https://epicos.kmc.solutions/img/sensor-active.a716014a.png",
      //   function(img) {
      //     canvas.add(img.set({ left: 6, top: 6, angle: 30 }).scale(0.25));
      //   }
      // );
      //   mountWorkpoint();
      const grid = 10;
      canvas.on("object:moving", function(options) {
        if (options.target.id) {
          emit("onDragging", {
            id: options.target.id,
            top: options.target.top,
            left: options.target.left,
            angle: options.target.angle,
            points: options.target.points,
            scaleX: options.target.scaleX,
            scaleY: options.target.scaleY,
          });
          options.target.left = Math.round(options.target.left / grid) * grid;
          options.target.top = Math.round(options.target.top / grid) * grid;
        }
      });
      canvas.on("object:rotating", function(options) {
        if (options.target.id) {
          emit("onDragging", {
            id: options.target.id,
            top: options.target.top,
            left: options.target.left,
            angle: options.target.angle,
            points: options.target.points,
            scaleX: options.target.scaleX,
            scaleY: options.target.scaleY,
          });
        }
        // options.target.angle = Math.round(options.target.angle / grid) * grid;
      });
      canvas.on("mouse:dblclick", function(options) {
        console.log(options);
        if (options.target.id) {
          const poly = canvas
            .getObjects()
            .find((d) => d.id == options.target.id);
          if (poly) {
            Edit(poly);
          }
        }
      });
      canvas.on("mouse:down", function(options) {
        console.log(options);
        if (options.target && options.target.id)
          emit("onSelect", options.target.id);
      });
      canvas.on("object:scaling", function(options) {
        emit("onDragging", {
          id: options.target.id,
          top: options.target.top,
          left: options.target.left,
          angle: options.target.angle,
          points: options.target.points,
          scaleX: options.target.scaleX,
          scaleY: options.target.scaleY,
        });
      });
      canvas.on("object:modified", function(options) {
        if (options.target.points) {
          options.target.points.map((d, index) => {
            options.target.points[index].x = Math.round(d.x / grid) * grid;
            options.target.points[index].y = Math.round(d.y / grid) * grid;
          });
          emit("onDragging", {
            id: options.target.id,
            top: options.target.top,
            left: options.target.left,
            angle: options.target.angle,
            points: options.target.points,
            scaleX: options.target.scaleX,
            scaleY: options.target.scaleY,
          });
        }
      });
    });

    return {
      can,
      polygonPositionHandler,
      actionHandler,
      anchorWrapper,
      Edit,
      closePolyon,
      mountWorkpoint,
    };
  },
});
</script>
<style>
.canvas-container {
  margin: auto;
}
</style>
