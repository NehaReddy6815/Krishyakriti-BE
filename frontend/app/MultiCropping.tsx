import { ScrollView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { router } from 'expo-router';
import { BACKEND_URL } from "../src/config";

export default function MultiCropping() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/learn/multicropping`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          setError("Failed to load content");
        }
      } catch (err) {
        setError("Error loading content");
        console.error("Error fetching multicropping content:", err);
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
        <Text style={styles.header}>🌱 Multicropping</Text>
        <Text style={styles.errorText}>Error loading content. Showing default information.</Text>
        <DefaultContent />
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>🌱 Multicropping</Text>
        <DefaultContent />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🌱 {content.title || 'Multicropping'}</Text>

      {content.content && (
        <>
          <Text style={styles.title}>What is Multicropping?</Text>
          <Text style={styles.text}>{content.content}</Text>
        </>
      )}

      {content.sections && content.sections.map((section, index) => (
        <View key={index}>
          <Text style={styles.title}>{section.heading}</Text>
          <Text style={styles.text}>{section.text}</Text>
        </View>
      ))}

      <Text style={styles.title}>Benefits</Text>
      <Text style={styles.point}>• Better use of land and water</Text>
      <Text style={styles.point}>• Higher total yield from the same field</Text>
      <Text style={styles.point}>• Less pest/disease attack</Text>
      <Text style={styles.point}>• Extra income even if one crop fails</Text>
      <Text style={styles.point}>• Improves soil fertility naturally</Text>

      <Text style={styles.title}>Good Crop Combinations</Text>
      <Text style={styles.point}>• Maize + Beans</Text>
      <Text style={styles.point}>• Ragi + Red Gram</Text>
      <Text style={styles.point}>• Groundnut + Red Gram</Text>
      <Text style={styles.point}>• Sugarcane + Vegetables</Text>
      <Text style={styles.point}>• Coconut + Banana + Pepper</Text>

      <Text style={styles.title}>Best Practices</Text>
      <Text style={styles.point}>• Choose crops that don't compete much</Text>
      <Text style={styles.point}>• Maintain proper row spacing</Text>
      <Text style={styles.point}>• Use organic manure to improve soil</Text>
      <Text style={styles.point}>• Rotate crops every season</Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Default content in case API fails
function DefaultContent() {
  return (
    <>
      <Text style={styles.title}>What is Multicropping?</Text>
      <Text style={styles.text}>
        Multicropping means growing two or more crops on the same land during a
        single season. This increases income, improves soil health and reduces
        risk for farmers.
      </Text>

      <Text style={styles.title}>Benefits</Text>
      <Text style={styles.point}>• Better use of land and water</Text>
      <Text style={styles.point}>• Higher total yield from the same field</Text>
      <Text style={styles.point}>• Less pest/disease attack</Text>
      <Text style={styles.point}>• Extra income even if one crop fails</Text>
      <Text style={styles.point}>• Improves soil fertility naturally</Text>

      <Text style={styles.title}>Good Crop Combinations</Text>
      <Text style={styles.point}>• Maize + Beans</Text>
      <Text style={styles.point}>• Ragi + Red Gram</Text>
      <Text style={styles.point}>• Groundnut + Red Gram</Text>
      <Text style={styles.point}>• Sugarcane + Vegetables</Text>
      <Text style={styles.point}>• Coconut + Banana + Pepper</Text>

      <Text style={styles.title}>Best Practices</Text>
      <Text style={styles.point}>• Choose crops that don't compete much</Text>
      <Text style={styles.point}>• Maintain proper row spacing</Text>
      <Text style={styles.point}>• Use organic manure to improve soil</Text>
      <Text style={styles.point}>• Rotate crops every season</Text>
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