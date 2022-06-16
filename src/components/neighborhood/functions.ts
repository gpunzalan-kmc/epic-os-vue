import { unknownProp } from "vant/lib/utils";

export function workStationRate(rate: number, type = "text") {
  let colorRate = "700";
  if (type == "icon") {
    colorRate = "500";
  }
  if (type == "text") {
    colorRate = "700";
  }
  if (rate == 0) {
    return "text-green-" + colorRate;
  }
  if (rate < 40) {
    return "text-green-" + colorRate;
  }
  if (rate >= 40 && rate < 70) {
    return "text-yellow-" + colorRate;
  }
  if (rate >= 70) {
    return "text-red-" + colorRate;
  }
}
export function temperatureRate(temp: number, type = "text") {
  let colorRate = "700";
  if (type == "icon") {
    colorRate = "500";
  }
  if (type == "text") {
    colorRate = "700";
  }
  if (temp < 28) {
    return "text-green-" + colorRate;
  }
  if (temp >= 28) {
    return "text-yellow-" + colorRate;
  }
}
export function humidityRate(rate: number, type = "text") {
  let colorRate = "700";
  if (type == "icon") {
    colorRate = "500";
  }
  if (type == "text") {
    colorRate = "700";
  }
  if (rate < 25) {
    return "text-red-" + colorRate;
  }
  if (rate >= 25 && rate < 30) {
    return "text-yellow-" + colorRate;
  }
  if (rate >= 30 && rate < 60) {
    return "text-green-" + colorRate;
  }
  if (rate >= 60 && rate < 70) {
    return "text-yellow-" + colorRate;
  }
  if (rate >= 70) {
    return "text-red-" + colorRate;
  }
}

export function airQualityRate(rate: number, type = "text") {
  let colorRate = "700";
  if (type == "icon") {
    colorRate = "500";
  }
  if (type == "text") {
    colorRate = "700";
  }
  if (rate <= 50) {
    return "text-green-" + colorRate;
  }
  if (rate >= 51 && rate <= 100) {
    return "text-yellow-" + colorRate;
  }
  if (rate >= 101 && rate <= 150) {
    return "text-red-" + colorRate;
  }
  if (rate >= 151 && rate <= 200) {
    return "text-red-" + colorRate;
  }
  if (rate >= 201 && rate <= 300) {
    return "text-gray-" + colorRate;
  }
  if (rate >= 301 && rate <= 500) {
    return "text-gray-" + colorRate;
  }
}

export function airQuality(rate: number) {
  if (rate <= 50) {
    return "Good";
  }
  if (rate >= 51 && rate <= 100) {
    return "Average";
  }
  if (rate >= 101 && rate <= 150) {
    return "Little Bad";
  }
  if (rate >= 151 && rate <= 200) {
    return "Bad";
  }
  if (rate >= 201 && rate <= 300) {
    return "Worse";
  }
  if (rate >= 301 && rate <= 500) {
    return "Very Bad";
  }
}

export function resizeImage(size: number, url: string) {
  if (url.includes("https://cdn.filestackcontent.com")) {
    return url.replace(
      "https://cdn.filestackcontent.com",
      `https://cdn.filestackcontent.com/resize=width:${size}`
    );
  }

  return url;
}
