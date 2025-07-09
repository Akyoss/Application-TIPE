import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({ size = 80, strokeWidth = 8, progress = 80, color = '#4caf50', bgColor = 'rgba(255,255,255,0.13)' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          stroke={bgColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference},${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2},${size / 2}`}
          style={{ shadowColor: color, shadowOpacity: 0.5, shadowRadius: 6 }}
        />
      </Svg>
      {/* Ajout d'un effet d'ombre et d'un fond blanc au centre pour un look "carte" */}
      <View style={{
        position: 'absolute',
        top: size * 0.18,
        left: size * 0.18,
        width: size * 0.64,
        height: size * 0.64,
        borderRadius: (size * 0.64) / 2,
        backgroundColor: 'rgba(255,255,255,0.10)',
        zIndex: -1,
      }} />
    </View>
  );
};

export default CircularProgress;
