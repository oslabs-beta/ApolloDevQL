import React from 'react';

// interface IApolloEventLog {
//   [key: string]: any;
// }

// import React, {createContext, FC, useContext, useEffect, useState} from 'react';

// interface IViewport {
//   width: number;
// }

// const ViewportContext = createContext<IViewport>({
//   width: window.innerWidth,
// });

// // export const ViewportProvider: FC = ({ children }) => {
// type Props = {
//   children: React.ReactNode;
// };
// export const ViewportProvider = ({children}: Props) => {
//   const [width, setWidth] = useState(window.innerWidth);

//   const handleResize = () => setWidth(window.innerWidth);

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <ViewportContext.Provider value={{width}}>
//       {children}
//     </ViewportContext.Provider>
//   );
// };

// export function useViewport() {
//   return useContext<IViewport>(ViewportContext);
// }

// const defaultTheme = 'white';
// const ThemeContext = React.createContext(defaultTheme);
// type Props = {
//   children: React.ReactNode;
// };
// export const ThemeProvider = ({children}: Props) => {
//   const [theme, setTheme] = React.useState(defaultTheme);

//   React.useEffect(() => {
//     // We'd get the theme from a web API / local storage in a real app
//     // We've hardcoded the theme in our example
//     const currentTheme = 'lightblue';
//     setTheme(currentTheme);
//   }, []);

//   return (
//     <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
//   );
// };

const useClientEventlogs = () => {
  const [eventLogs, updateEventLogs] = React.useState((): any => ({}));
  const updateLogs = (evts: any) => {
    // console.log('updating hook wt ', evts);
    updateEventLogs(() => {
      // console.log('Previous Events :: ', prevEvents);
      return evts;
    });
  };
  return {eventLogs, updateLogs};
};

export default useClientEventlogs;
