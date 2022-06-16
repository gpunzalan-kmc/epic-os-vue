export const deviceRules = {
  name: [
    { required: true, message: "Please input device name", trigger: "blur" },
  ],
  iPaddress: [
    { required: true, message: "Please input ip address", trigger: "blur" },
  ],
  mac: [
    { required: true, message: "Please input mac address", trigger: "blur" },
  ],
  floorID: [{ required: true, message: "Please input floor", trigger: "blur" }],
};
export const userRules = {
  firstName: [
    { required: true, message: "Please input first name", trigger: "blur" },
  ],
  lastName: [
    { required: true, message: "Please input last name", trigger: "blur" },
  ],
  userName: [
    { required: true, message: "Please input username", trigger: "blur" },
  ],
  emailAddress: [
    {
      type: "email",
      message: "Please input valid email address",
      trigger: "blur",
    },
    { required: true, message: "Please input email address", trigger: "blur" },
  ],
};
