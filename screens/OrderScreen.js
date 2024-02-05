import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import React ,{useEffect} from "react";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
    const navigation = useNavigation()
     useEffect(() => {
        setTimeout(() => {
          navigation.replace("Main");
        }, 1300);
     }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
     
      <Text>Hello</Text>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
