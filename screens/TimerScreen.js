import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, addListener, TouchableHighlight } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function TimerScreen({ route, navigation, onTimerEnd, onTabPress }) {
  const { initialTime } = route.params;
  const [timeLeft, setTimeLeft] = useState(initialTime || 30 * 60); // 30 minutes in seconds, default of 30 minutes

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
      onTimerEnd();
      navigation.navigate("Feedback"); // navigate to FeedbackScreen when timer runs out
    }

    // more details
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

  // reset the timer and go back to 30 minutes when a new order is sent
  useEffect(() => {
    setTimeLeft(initialTime || 30 * 60); // reset timer for every new order
  }, [initialTime]);

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
  // so no need to wait for 30 minutes
  const skipToThreeSeconds = () => {
    setTimeLeft(3);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBackgroundContainer}>
        <Text style={styles.backgroundContainer}>Thank you for your order!</Text>
      </View>
      <View>
        <Text style={styles.textMessage}>Your pizza will arrive soon</Text>
      </View>
      <View style={styles.timerWrapper}>
        <Svg // circumference is created in SVG format for better quality
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

      {/* skip to 00:03 button for testing and debugging */}
      <TouchableHighlight
        style={styles.button}
        onPress={skipToThreeSeconds}
        underlayColor="#558ce6">
        <Text style={styles.buttonText}>Skip to 00:03</Text>
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
  button: {
    flex: 0.3, // height also depends on flex
    backgroundColor: '#5a97fa',
    margin: 10,
    width: 170,
    height: 10,
    borderRadius: 40,
    alignSelf: "center",
    position: 'relative',
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 11,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
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
    position: 'relative',
  },
  timerText: {
    position: 'absolute',  // timer numbers are top of the circle
    fontSize: 48,
    fontWeight: 'bold',
    color: '#CD6524',
  },
});
