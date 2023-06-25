

import React, { useEffect, useState } from 'react';
import { Alert, Button, View } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds ,InterstitialAd, AdEventType, } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});
function App() {
  const [loaded, setLoaded] = useState(false);



  useEffect(() => {
    interstitial.removeAllListeners();
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();
    rewarded.load()

    // Unsubscribe from events on unmount
    return unsubscribe;
  },[]);




  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        rewarded.load()
        interstitial.load();
       
     
       
        console.log('User earned reward of ', reward);
      
      },
    );

 
    rewarded.load();

 
    return () => {
     
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  },[] );

  // No advert ready to show yet
  if (!loaded) {
    rewarded.load();
    interstitial.load();
    console.log('====================================');
    console.log(loaded);
    console.log('====================================');
    return null;
  }

  return (
  <View style={{flex:1,justifyContent:'center',alignSelf:'center'}}>
    <Button
      title="Show Rewarded Ad"
      onPress={() => {
        rewarded.show();
      }}
    />
    <View style={{marginTop:20}}>
        <Button 
      title="Show Interstitial"
      onPress={() => {
        interstitial.show();
      }}
    />
    </View>
    <View style={{marginTop:20}}>
        <Button 
      title="Ad reload"
      onPress={() => {
        rewarded.load(),
        interstitial.load()
      }}
    />
    </View>
   </View> 
  );
}
export default App;