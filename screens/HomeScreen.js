import { StyleSheet, Text, View, SafeAreaView, Platform, ScrollView, Pressable, Image, TextInput } from "react-native";
import { list, images, deals, offers } from "./common/product";
import { useCallback, useEffect, useState, useContext } from "react";
import { SliderBox } from "react-native-image-slider-box";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { btoa, atob } from 'react-native-quick-base64';

const HomeScreen = () => {
  const [lists, setlist] = useState([]);
  const [images1, setimages] = useState([]);
  const [deals1, setdeals1] = useState([]);
  const [offers1, setoffers1] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const [open, setOpen] = useState(false);
  const { userId, setUserId } = useContext(UserType);
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  const navigation = useNavigation();
  useEffect(() => {

    setlist(list);
    setimages(images);
    setdeals1(deals);
    setoffers1(offers);
    const fetchData = async () => {
      try {
        fetch('https://fakestoreapi.com/products')
          .then(res => res.json())
          .then(json => {
            setProducts(json);
            // console.log("data is ", json);
          })

      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, [])
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState("");
  // console.log("selectted address =>",selectedAddress);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  const fetchAddresses = async () => {
    try {
        console.log("userid  is ", userId);
        fetch(`http://10.0.2.2:8000/addresses/${userId}`)
          .then(res => res.json())
          .then(response => {
           const addre =(response.addresses);
            setAddresses(addre);
            // console.log("address is ==> ", addresses);
          })

     
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {

    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        // console.log("====>>" + token);

        const decoded = JSON.parse(atob(token.split(".")[1]));
        const user_id = decoded.userId;
        setUserId(user_id)
        //console.log(">>>>>>" + user_id);


      } catch (err) {
        console.log("error message 11", err);
      }
    }
    fetchUser();

  }, []);
  return (
    <>
      <SafeAreaView style={{
        paddinTop: Platform.OS == "android" ? 40 : 0,
        flex: 1,
        backgroundColor: 'white'
      }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: "#00CED1",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: "white",
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}
            >
              <Image
                style={{ width: 25, height: 25, marginLeft: 10 }}
                source={require('../icon/search.png')}
              />
              <TextInput placeholder="Search Amazon.in" />
            </Pressable>
            <Image
              style={{ width: 30, height: 30, marginLeft: 20, marginRight: 10 }}
              source={require('../icon/mic.png')}
            />
          </View>

          <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
            }}
          >
            <Image
              style={{ width: 30, height: 30, marginLeft: 10, marginRight: 5 }}
              source={require('../icon/location.png')}
            />

            <Pressable>
              {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Add a Address
                </Text>
              )}
            </Pressable>
            <Image
              style={{ width: 30, height: 30, marginLeft: 10, marginRight: 5 }}
              source={require('../icon/down-arrow.png')}
            />
          </Pressable>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {lists.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 50, height: 50, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 5,
                  }}
                >
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <SliderBox
            images={images1}
            autoPlay
            circleLoop
            dotColor={"#13274F"}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%" }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Trending Deals of the week
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals1.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </Pressable>
            ))}
          </View>

          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers1.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />

                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Upto {item?.offer}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <Text
            style={{
              height: 1,
              borderColor: "#D0D0D0",
              borderWidth: 2,
              marginTop: 15,
            }}
          />
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              ?.filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {addresses?.map((item, index) => (
              <Pressable
                onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor: selectedAddress === item ? "#FBCEB1" : "white"
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Image
                  style={{ width: 25, height: 25, marginLeft: 10 }}
                  source={require('../icon/location1.png')}
                />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  India, Jaunpur
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image
                style={{ width: 25, height: 25, marginLeft: 10 }}
                source={require('../icon/location1.png')}
              />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >

              <Image
                style={{ width: 25, height: 25, marginLeft: 10 }}
                source={require('../icon/locate-sharp.jpg')}
              />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Currect location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image
                style={{ width: 25, height: 25, marginLeft: 10 }}
                source={require('../icon/earth.jpg')}
              />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>

    </>



  )
};

export default HomeScreen;

const styles = StyleSheet.create({});
