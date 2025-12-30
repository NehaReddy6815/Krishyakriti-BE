import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { router } from 'expo-router';
import { BACKEND_URL } from "../src/config";

export default function Learn() {
  
  // ------------------ STATE ------------------
  const [userLocation, setUserLocation] = useState("");
  const [nearbyKVKs, setNearbyKVKs] = useState([]);
  const [searching, setSearching] = useState(false);
  const [learningResources, setLearningResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch learning resources from backend
  useEffect(() => {
    const fetchLearningResources = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/learn`);
        if (response.ok) {
          const data = await response.json();
          setLearningResources(data);
        } else {
          // Fallback to hardcoded resources if API fails
          setLearningResources([
            {
              slug: "multicropping",
              title: "Multicropping",
              summary: "Growing two or more crops in the same field.",
            },
            {
              slug: "agroforestry",
              title: "Agroforestry",
              summary: "Integrating trees, plants and crops for sustainability.",
            },
            {
              slug: "market",
              title: "Market Information",
              summary: "Daily crop prices and agricultural market insights.",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching learning resources:", error);
        // Fallback to hardcoded resources if API fails
        setLearningResources([
          {
            slug: "multicropping",
            title: "Multicropping",
            summary: "Growing two or more crops in the same field.",
          },
          {
            slug: "agroforestry",
            title: "Agroforestry",
            summary: "Integrating trees, plants and crops for sustainability.",
          },
          {
            slug: "market",
            title: "Market Information",
            summary: "Daily crop prices and agricultural market insights.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningResources();
  }, []);

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

  // Navigate to different screens
  const navigateToScreen = (screenName: string) => {
    router.push(`/${screenName}`);
  };

  // ------------------ UI ------------------
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Learn</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#009179" />
          <Text style={styles.loadingText}>Loading resources...</Text>
        </View>
      ) : (
        <>
          {/* Top Cards - Dynamic from API */}
          <View style={styles.cardRow}>
            {learningResources.map((resource, index) => (
              <TouchableOpacity
                key={resource._id || index}
                style={styles.learnCard}
                onPress={() => navigateToScreen(getScreenName(resource.slug))}
              >
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>{getResourceIcon(resource.slug)}</Text>
                </View>
                <Text style={styles.cardLabel}>{resource.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

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
        onPress={() => navigateToScreen('Feedback')}
      >
        <Text style={styles.feedbackBtnText}>Send Feedback</Text>
      </TouchableOpacity>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

// Helper function to get icon based on resource slug
const getResourceIcon = (slug: string) => {
  switch (slug) {
    case 'multicropping':
      return '🌱';
    case 'agroforestry':
      return '🌳';
    case 'market':
      return '🏪';
    default:
      return '📚';
  }
};

// Helper function to get screen name based on resource slug
const getScreenName = (slug: string) => {
  switch (slug) {
    case 'multicropping':
      return 'MultiCropping';
    case 'agroforestry':
      return 'Agroforestry';
    case 'market':
      return 'Market';
    default:
      return 'Learn';
  }
};

// ------------------ STYLES ------------------
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#009179',
  },
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
  learnCard: {
    backgroundColor: "#E7E1C6",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 2,
  },
  iconContainer: {
    backgroundColor: "#009179",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconText: {
    fontSize: 30,
    color: "white",
  },
  cardLabel: {
    fontWeight: "bold",
    fontSize: 16,
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