import classNames from "classnames";

export const btn = classNames(
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
);

export const btnOutline = classNames(
  "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
);

export const input = classNames(
  "bg-slate-200 appearance-none border-2 border-transparent rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 p-2"
);

export const inputReply = classNames(
  "bg-transparent border-b border-blue-700 flex-1 mr-3 py-1 px-2 leading-tight focus:outline-none"
);

export const select = classNames(
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2"
);

export const option = classNames(
  "w-full p-2 hover:bg-blue-500 hover:text-white"
);

export const userImage = classNames("inline-block h-10 w-10 text-slate-500");

export const postIcon = classNames("inline-block pt-1 h-5 w-5 text-slate-500");
