import React from 'react';
import { SafeAreaView } from 'react-native';
import { Colors } from './src/styles/Colors';
import Splash from './src/screens/Splash';

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.white,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle} testID="safe-area-view">
      <Splash />
    </SafeAreaView>
  );
}

export default App;
