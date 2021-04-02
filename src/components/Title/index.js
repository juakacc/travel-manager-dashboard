import React from 'react';

import makeStyles from './styles';

export default function Title({ title }) {

  const classes = makeStyles();

  return (
    <div className={classes.container}>
      <h1>{title}</h1>
    </div>
  )
}