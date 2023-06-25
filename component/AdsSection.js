import { View, Text,Platform } from 'react-native'
import React from 'react'
import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
const AdsSection = () => {

    const unitID = Platform.select({
        ios: "ca-app-pub-5752785510180424/4650068163",
        android: "ca-app-pub-5752785510180424/9106503710",
       
     });
  return (
    <View style={{}}>
    <BannerAd
      unitId={TestIds.BANNER}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true, // Set to true for GDPR/CCPA compliance
      }}
      onAdLoaded={() => {
        console.log('Ad loaded');
      }}
      onAdFailedToLoad={(error) => {
        console.error('Ad failed to load:', error);
      }}
    />
  </View>
  )
}

export default AdsSection