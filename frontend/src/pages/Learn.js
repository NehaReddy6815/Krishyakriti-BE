import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";
import LearnCard from "../components/LearnCard";

export default function Learn({ navigation }) {
  // ------------------ STATE ------------------
  const [userLocation, setUserLocation] = useState("");
  const [nearbyKVKs, setNearbyKVKs] = useState([]);
  const [searching, setSearching] = useState(false);

  // ------------------ KVK SEARCH ------------------
  const searchKVK = () => {
    if (!userLocation.trim()) {
      alert("Please enter a location.");
      return;
    }

    setSearching(true);

    setTimeout(() => {
      setNearbyKVKs([
        {
          id: 1,
          name: "KVK Bangalore Rural",
          distance: "5.2 km",
          phone: "080-12345678",
        },
        {
          id: 2,
          name: "KVK Hassan",
          distance: "12.8 km",
          phone: "08172-234567",
        },
      ]);
      setSearching(false);
    }, 1200);
  };

  // ------------------ VIDEO SECTION ------------------
  const videos = [
    { id: "8AHXf9ocWXM", title: "Kavitha Mishra – Farming Journey" },
    {
      id: "vAtV81yYLe8",
      title: "Engineer With 14 Years Experience Turned Farmer",
    },
    { id: "P-yU6tTUYts", title: "Hoskote Farmer Grows Apple" },
    { id: "c5pekMjAapo", title: "Ravesh – Multilayer Farming" },
    { id: "qBIuhgoFiKk", title: "Rajesh – Sandalwood Farming" },
  ];

  const [currentVideo, setCurrentVideo] = useState(0);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev < videos.length - 1 ? prev + 1 : 0));
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev > 0 ? prev - 1 : videos.length - 1));
  };

  // ------------------ UI ------------------
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Learn</Text>

      {/* Top Cards */}
      <View style={styles.cardRow}>
        <LearnCard
          label="Multicropping"
          icon="🌱"
          onPress={() => navigation.navigate("Multicropping")}
        />
        <LearnCard
          label="Agroforestry"
          icon="🌳"
          onPress={() => navigation.navigate("Agroforestry")}
        />
        <LearnCard
          label="Market Info"
          icon="🏪"
          onPress={() => navigation.navigate("Market")}
        />
      </View>

      {/* ------------------ VIDEO CAROUSEL ------------------ */}
      <Text style={styles.sectionTitle}>Farmer Success Stories</Text>

      <View style={styles.videoBox}>
        <WebView
          source={{
            uri: `https://www.youtube.com/embed/${videos[currentVideo].id}`,
          }}
          allowsFullscreenVideo
        />
      </View>

      <Text style={styles.videoTitle}>{videos[currentVideo].title}</Text>

      <Text style={styles.videoCount}>
        Video {currentVideo + 1} / {videos.length}
      </Text>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.navBtn} onPress={prevVideo}>
          <Text style={styles.navBtnText}>⬅ Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navBtn} onPress={nextVideo}>
          <Text style={styles.navBtnText}>Next ➡</Text>
        </TouchableOpacity>
      </View>

      {/* ------------------ KVK SEARCH ------------------ */}
      <Text style={styles.sectionTitle}>Find Nearest KVK</Text>

      <TextInput
        placeholder="Enter your location"
        value={userLocation}
        onChangeText={setUserLocation}
        style={styles.input}
      />

      <TouchableOpacity style={styles.searchBtn} onPress={searchKVK}>
        <Text style={styles.searchBtnText}>
          {searching ? "Searching..." : "Search"}
        </Text>
      </TouchableOpacity>

      {nearbyKVKs.length > 0 && (
        <View style={styles.resultsContainer}>
          {nearbyKVKs.map((kvk) => (
            <View key={kvk.id} style={styles.kvkCard}>
              <Text style={styles.kvkTitle}>{kvk.name}</Text>
              <Text style={styles.kvkText}>Distance: {kvk.distance}</Text>
              <Text style={styles.kvkText}>Phone: {kvk.phone}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Feedback Button */}
      <TouchableOpacity
        style={styles.feedbackBtn}
        onPress={() => navigation.navigate("Feedback")}
      >
        <Text style={styles.feedbackBtnText}>Send Feedback</Text>
      </TouchableOpacity>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

// ------------------ STYLES ------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Videos
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  videoBox: {
    height: 230,
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  videoCount: {
    color: "#009179",
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  navBtn: {
    backgroundColor: "#009179",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  navBtnText: {
    color: "white",
    fontWeight: "bold",
  },

  // KVK
  input: {
    borderWidth: 1,
    borderColor: "#009179",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  searchBtn: {
    marginTop: 10,
    backgroundColor: "#009179",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  searchBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  resultsContainer: {
    marginTop: 20,
  },
  kvkCard: {
    backgroundColor: "#E7E1C6",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  kvkTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  kvkText: {
    marginTop: 4,
  },

  // Feedback
  feedbackBtn: {
    marginTop: 30,
    backgroundColor: "#006A58",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  feedbackBtnText: {
    color: "white",
    fontWeight: "bold",
  },
});
