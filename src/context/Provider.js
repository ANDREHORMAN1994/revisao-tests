import React, { useMemo, useState } from 'react';
import proptypes from 'prop-types';
import Context from './contex';

function Provider({ children }) {
  const [animalImg, setAnimalImg] = useState('');

  const valueGlobal = useMemo(() => ({
    animalImg,
    setAnimalImg,
  }), [animalImg]);

  return (
    <Context.Provider value={ valueGlobal }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: proptypes.node.isRequired,
};

export default Provider;
