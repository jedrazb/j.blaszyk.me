import React, { useState } from 'react';

import { BlockPicker, SliderPicker } from 'react-color';

export const StatefulSliderPicker = (props) => {
  const [color, setColor] = useState('#FFA500');

  return <SliderPicker color={color} onChange={(e) => setColor(e.hex)} />;
};

export const StatefulBlockPicker = (props) => {
  const [color, setColor] = useState('#FFA500');

  return <BlockPicker color={color} onChange={(e) => setColor(e.hex)} />;
};
