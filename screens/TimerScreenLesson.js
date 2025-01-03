import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

// !! this code file is for the Lesson and Power Point presentation
// on the 10th of October
// has less functionality to just show the Timer and the Animation

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function TimerScreen({ route, navigation }) {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  const radius = 100;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius; // C=2πR
  const progress = useSharedValue(1); // progress value, starts at 100%

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

    // details
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

  const formatTime = (seconds) => {
    // rounding a number down to the nearest integer
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // shows 0 when less than 10, example: 7 is 07
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // shrinking circle
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - progress.value),
    };
  });

  // skipping the timer to 3 seconds for faster testing
  // so no need to wait for 30 minutes all the time
  const skipToThreeSeconds = () => {
    setTimeLeft(3);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBackgroundContainer}>
        <Text style={styles.backgroundContainer}>Timer</Text>
      </View>
      <View style={styles.timerWrapper}>
        <Svg // circumference created in SVG format for better quality
          height={radius * 2 + strokeWidth * 2}
          width={radius * 2 + strokeWidth * 2}
          // defining the circumference
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

          {/* animated  circle */}
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
      {/* skip to 00:03 button for testing */}
      <Button title="Skip to 00:03" onPress={skipToThreeSeconds} />

      <TouchableHighlight
          style={styles.button}
          onPress={skipToThreeSeconds}
          underlayColor="#558ce6">
          <Text style={styles.buttonText}>Read Menu</Text>
        </TouchableHighlight>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backgroundBackgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE8D8',
    borderRadius: 20,
    width: 300,
    height: 100,
  },
  backgroundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#CD6524',
  },
  textMessage: {
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CD6524',
    backgroundColor: 'FFE8D8',
    margin: 40,
  },
  timerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // allows absolute position for the timer numbers
  },
  timerText: {
    position: 'absolute',  // timer numbers are top of the circle
    fontSize: 48,
    fontWeight: 'bold',
    color: '#CD6524',
  },
});  