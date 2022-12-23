import { useState } from 'react';

export default async function useSlct() {
  const [slct, setSlct] = useState();
  
  const saveToken = userToken => {
    console.log(userToken);
    console.log("weshwesh");

        setSlct(userToken);
      };
  
    return {
        setselect: saveToken,
        slct
      }
  }
  