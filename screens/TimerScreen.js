import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function TimerScreen({ route, navigation }) {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  const radius = 100;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius; // C=2πR

  const progress = useSharedValue(1); // progress falue, starts at 100%

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // updates every second
    // when timer runs out, the timer stops
    } else if (timeLeft <= 0) {
      clearInterval(timer);
    }

    // https://medium.com/@garethdavisrogers/using-setinterval-and-clearinterval-with-react-hooks-7fcf26dc8fdb
    return () => clearInterval(timer); // cleanup the interval on unmount
  }, [timeLeft]);

  // update the animation progress based on timeLeft
  useEffect(() => {
    progress.value = withTiming(timeLeft / (30 * 60), {
      duration: 1000,
      easing: Easing.linear,
    });
  }, [timeLeft]);

  // time format "MM:SS" minutes:seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // shrinking circle
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - progress.value),
    };
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.backgroundContainer}>Thank you for your order!</Text>
      </View>
      <View>
        <Text style={styles.textMessage}>Your pizza will arrive soon!</Text>
      </View>
      <View style={styles.timerWrapper}>
        <Svg
          height={radius * 2 + strokeWidth * 2}
          width={radius * 2 + strokeWidth * 2}
          viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}
          fill="#FFE8D8"
        >
          {/* background circle */}
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius - strokeWidth / 2} // slightly smaller to avoid overlapping with stroke
          />

          {/* background circle that is behind the animated circle */}
          <Circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#FFE8D8"
            strokeWidth={strokeWidth}
          />

          {/* animated circle */}
          <AnimatedCircle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="#E58C4B"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </Svg>
        {/* timer text */}
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backgroundContainer: {
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CD6524',
    backgroundColor: 'FFE8D8',
  },
  textMessage: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CD6524',
    backgroundColor: 'FFE8D8',
  },
  timerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensures absolute positioning works inside this view
  },
  timerText: {
    position: 'absolute', // Overlay the text on top of the circle
    fontSize: 48,
    fontWeight: 'bold',
    color: '#CD6524',
  },
});
