// // // exported type used in your component
// // export type UploadFileInfo = {
// //   uploadInfo?: {
// //     asset_id?: string | { [key: string]: unknown }; // sometimes an object
// //     public_id?: string;
// //     publicId?: string; // sometimes camelCase
// //     secure_url?: string;
// //     path?: string;
// //     thumbnail_url?: string;
// //   };
// // };

// // export type WidgetInfo = {
// //   files?: UploadFileInfo[];
// //   [k: string]: unknown;
// // };

// // // **IMPORTANT**: event is optional here (matches library types)
// // export type UploadWidgetResult = {
// //   event?: string;      // <- make optional
// //   info?: WidgetInfo;
// //   files?: UploadFileInfo[]; // sometimes top-level
// //   [k: string]: unknown;
// // };

// export type UploadWidgetResult = {
//   event?: string;
//   info?: {
//     files?: {
//       uploadInfo?: {
//         asset_id?: string;
//         public_id?: string;
//         secure_url?: string;
//         path?: string;
//         thumbnail_url?: string;
//       };
//     }[];
//   };
//   data?: {
//     info?: {
//       files?: {
//         uploadInfo?: {
//           asset_id?: string;
//           public_id?: string;
//           secure_url?: string;
//           path?: string;
//           thumbnail_url?: string;
//         };
//       }[];
//     };
//   };
// };
