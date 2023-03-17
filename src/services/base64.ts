
export class Base64Service {
  static async fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (event) {
        resolve(reader.result)
      };
      reader.onerror = function (error) {
        reject(error)
      };
    })
  }
}


// export class Base64Service {
//   static async fileToBase64(file: File) {
//     return new Promise((resolve: (result: string) => void, reject) => {
//       var reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = function () {
//         const result = (reader.result as string).toString().split("base64,");
//         resolve(result[1]);
//       };
//       reader.onerror = function (error) {
//         console.log("Error: ", error);
//         reject(error);
//       };
//     });
//   }
//   static async getBinary(file: File) {
//     return new Promise((resolve: (result: ArrayBuffer) => void, reject) => {
//       var reader = new FileReader();
//       reader.readAsBinaryString(file);
//       reader.onload = function () {
//         const result = reader.result;
//         resolve(result as ArrayBuffer);
//       };
//       reader.onerror = function (error) {
//         console.log("Error: ", error);
//         reject(error);
//       };
//     });
//   }
// }


