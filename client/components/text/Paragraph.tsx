import React from 'react';

type Props = {
  text: string;
};

const Paragraph = (props: Props) => {
  return <p>{props.text}</p>;
};

export default Paragraph;
