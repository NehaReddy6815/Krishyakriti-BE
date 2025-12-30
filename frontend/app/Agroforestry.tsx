import { ScrollView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../src/config";

export default function Agroforestry() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/learn/agroforestry`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          setError("Failed to load content");
        }
      } catch (err) {
        setError("Error loading content");
        console.error("Error fetching agroforestry content:", err);
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
        <Text style={styles.header}>🌳 Agroforestry</Text>
        <Text style={styles.errorText}>Error loading content. Showing default information.</Text>
        <DefaultContent />
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>🌳 Agroforestry</Text>
        <DefaultContent />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🌳 {content.title || 'Agroforestry'}</Text>

      {content.content && (
        <>
          <Text style={styles.title}>What is Agroforestry?</Text>
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
      <Text style={styles.point}>• Soil becomes richer and fertile</Text>
      <Text style={styles.point}>• Extra income from timber & fruits</Text>
      <Text style={styles.point}>• Trees reduce wind & water erosion</Text>
      <Text style={styles.point}>• Better micro-climate for crops</Text>
      <Text style={styles.point}>• Increases groundwater recharge</Text>

      <Text style={styles.title}>Suitable Trees for Karnataka</Text>
      <Text style={styles.point}>• Neem — pest repellent</Text>
      <Text style={styles.point}>• Mango — fruit value</Text>
      <Text style={styles.point}>• Silver Oak — shade & timber</Text>
      <Text style={styles.point}>• Sandalwood — high value crop</Text>
      <Text style={styles.point}>• Tamarind — long-term income</Text>
      <Text style={styles.point}>• Bamboo — multipurpose</Text>

      <Text style={styles.title}>Types of Agroforestry</Text>
      <Text style={styles.point}>• Alley cropping — crops grown between trees</Text>
      <Text style={styles.point}>• Silvopasture — trees + livestock</Text>
      <Text style={styles.point}>• Windbreaks — tree rows protecting crops</Text>
      <Text style={styles.point}>• Boundary planting</Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// Default content in case API fails
function DefaultContent() {
  return (
    <>
      <Text style={styles.title}>What is Agroforestry?</Text>
      <Text style={styles.text}>
        Agroforestry means growing trees along with crops or livestock. It helps
        farmers get steady income and protects the environment.
      </Text>

      <Text style={styles.title}>Benefits</Text>
      <Text style={styles.point}>• Soil becomes richer and fertile</Text>
      <Text style={styles.point}>• Extra income from timber & fruits</Text>
      <Text style={styles.point}>• Trees reduce wind & water erosion</Text>
      <Text style={styles.point}>• Better micro-climate for crops</Text>
      <Text style={styles.point}>• Increases groundwater recharge</Text>

      <Text style={styles.title}>Suitable Trees for Karnataka</Text>
      <Text style={styles.point}>• Neem — pest repellent</Text>
      <Text style={styles.point}>• Mango — fruit value</Text>
      <Text style={styles.point}>• Silver Oak — shade & timber</Text>
      <Text style={styles.point}>• Sandalwood — high value crop</Text>
      <Text style={styles.point}>• Tamarind — long-term income</Text>
      <Text style={styles.point}>• Bamboo — multipurpose</Text>

      <Text style={styles.title}>Types of Agroforestry</Text>
      <Text style={styles.point}>• Alley cropping — crops grown between trees</Text>
      <Text style={styles.point}>• Silvopasture — trees + livestock</Text>
      <Text style={styles.point}>• Windbreaks — tree rows protecting crops</Text>
      <Text style={styles.point}>• Boundary planting</Text>
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