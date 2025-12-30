import { ScrollView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../src/config";

export default function Market() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/learn/market`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          setError("Failed to load content");
        }
      } catch (err) {
        setError("Error loading content");
        console.error("Error fetching market content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#009179" />
        <Text style={styles.loadingText}>Loading content...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>🏪 Market Information</Text>
        <Text style={styles.errorText}>Error loading content. Showing default information.</Text>
        <DefaultContent />
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>🏪 Market Information</Text>
        <DefaultContent />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🏪 {content.title || 'Market Information'}</Text>

      {content.content && (
        <>
          <Text style={styles.title}>Market Information</Text>
          <Text style={styles.text}>{content.content}</Text>
        </>
      )}

      {content.sections && content.sections.map((section, index) => (
        <View key={index}>
          <Text style={styles.title}>{section.heading}</Text>
          <Text style={styles.text}>{section.text}</Text>
        </View>
      ))}

      <Text style={styles.title}>Where Can Farmers Sell?</Text>
      <Text style={styles.point}>• APMC Mandis</Text>
      <Text style={styles.point}>• Farmer Produce Organizations (FPOs)</Text>
      <Text style={styles.point}>• Direct to Consumers</Text>
      <Text style={styles.point}>• Contract Farming</Text>
      <Text style={styles.point}>• Food Processing Units</Text>
      <Text style={styles.point}>• Online Platforms (eNAM, Krishi Mandi apps)</Text>

      <Text style={styles.title}>How to Get Better Prices</Text>
      <Text style={styles.point}>• Grade & sort produce properly</Text>
      <Text style={styles.point}>• Sell when demand is high</Text>
      <Text style={styles.point}>• Store produce safely to avoid spoilage</Text>
      <Text style={styles.point}>• Join a cooperative or FPO</Text>
      <Text style={styles.point}>• Explore organic certification</Text>

      <Text style={styles.title}>Daily Market Price Sources</Text>
      <Text style={styles.point}>• Agmarknet.gov.in</Text>
      <Text style={styles.point}>• Karnataka agricultural market website</Text>
      <Text style={styles.point}>• Local mandi price board</Text>
      <Text style={styles.point}>• KVK centers</Text>

      <Text style={styles.title}>Tips for Farmers</Text>
      <Text style={styles.point}>• Avoid selling immediately after harvest</Text>
      <Text style={styles.point}>• Use proper packaging (gunny bags, crates)</Text>
      <Text style={styles.point}>• Maintain moisture levels</Text>
      <Text style={styles.point}>• Record fertilizer/pesticide usage</Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Default content in case API fails
function DefaultContent() {
  return (
    <>
      <Text style={styles.title}>Where Can Farmers Sell?</Text>
      <Text style={styles.point}>• APMC Mandis</Text>
      <Text style={styles.point}>• Farmer Produce Organizations (FPOs)</Text>
      <Text style={styles.point}>• Direct to Consumers</Text>
      <Text style={styles.point}>• Contract Farming</Text>
      <Text style={styles.point}>• Food Processing Units</Text>
      <Text style={styles.point}>• Online Platforms (eNAM, Krishi Mandi apps)</Text>

      <Text style={styles.title}>How to Get Better Prices</Text>
      <Text style={styles.point}>• Grade & sort produce properly</Text>
      <Text style={styles.point}>• Sell when demand is high</Text>
      <Text style={styles.point}>• Store produce safely to avoid spoilage</Text>
      <Text style={styles.point}>• Join a cooperative or FPO</Text>
      <Text style={styles.point}>• Explore organic certification</Text>

      <Text style={styles.title}>Daily Market Price Sources</Text>
      <Text style={styles.point}>• Agmarknet.gov.in</Text>
      <Text style={styles.point}>• Karnataka agricultural market website</Text>
      <Text style={styles.point}>• Local mandi price board</Text>
      <Text style={styles.point}>• KVK centers</Text>

      <Text style={styles.title}>Tips for Farmers</Text>
      <Text style={styles.point}>• Avoid selling immediately after harvest</Text>
      <Text style={styles.point}>• Use proper packaging (gunny bags, crates)</Text>
      <Text style={styles.point}>• Maintain moisture levels</Text>
      <Text style={styles.point}>• Record fertilizer/pesticide usage</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "white" },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#009179',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
  header: { fontSize: 30, fontWeight: "bold", marginBottom: 20 },
  title: { fontSize: 20, marginTop: 20, fontWeight: "bold" },
  text: { fontSize: 16, marginTop: 8, lineHeight: 22 },
  point: { fontSize: 16, marginTop: 6 },
});