// import DataUriParser from  "datauri/parser.js"

// import path from "path";

// const getDataUri = (file) => {
//     const parser = new DataUriParser();
//     const extname = path.extreme(file.originalname).toString();
//     return parser.format(extname, file.buffer);
// }

// export default getDataUri;


import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString(); // ✅ fixed
  return parser.format(extName, file.buffer);
};

export default getDataUri;
